import { googleDrive } from '@/utils/google';
const { ServiceBusClient } = require("@azure/service-bus");
import { Provider, EmbedStatus } from '@prisma/client'
import { getUser, getDataSources, createDataSources } from "@/database"

async function get(req, res){
  let {userId} = req.query;
  const service = googleDrive();
  const user = await getUser(userId);

  const r = await service.files.list({
    q: `mimeType = 'application/vnd.google-apps.folder' and '${user.email}' in owners` ,
    pageSize: 100,
    fields: 'nextPageToken, files(id, name, parents)',
  });

  // now augment data with status
  const status = await getDataSources(userId, Provider.GoogleDrive);

  for(const f of r.data.files) {
    const s = status.find((e) => e.id === f.id);
    f.status = s?.status ?? EmbedStatus.New;
  }

  res.status(200).json(
    r.data.files
  );
}

// connection string to your Service Bus namespace
const connectionString = process.env.SERVICE_BUS;
// name of the queue
const queueName = process.env.SERVICE_BUS_QUEUE;

async function post(req, res) {
  const {userId} = req.query;
  const folderIds = req.body; 
  const user = await getUser(userId)

  const folders = folderIds.map((f)=>({id: f, userId: userId, provider: Provider.GoogleDrive, status: EmbedStatus.Embedding }));

  await createDataSources(folders);

  
  // create a Service Bus client using the connection string to the Service Bus namespace
  const sbClient = new ServiceBusClient(connectionString);

  try {
    // createSender() can also be used to create a sender for a topic.
    const sender = sbClient.createSender(queueName);
    // create a batch object
    let batch = await sender.createMessageBatch();
    
    // add message
    batch.tryAddMessage({
      contentType: "application/json",
      body: {
        email: user.email,
        folders: folders,
      },
    })

    // Send the last created batch of messages to the queue
    await sender.sendMessages(batch);

    // Close the sender
    await sender.close();
  } finally {
      await sbClient.close();
  }

  res.status(200).end();
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await get(req, res);
  }
  else if (req.method === 'POST') {
    await post(req, res);
  }
  else {
    req.status(405).end();
  }
}