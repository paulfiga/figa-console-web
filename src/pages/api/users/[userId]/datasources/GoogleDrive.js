import { googleDrive } from '@/utils/google';
const { ServiceBusClient } = require("@azure/service-bus");
import { Provider, EmbedStatus } from '@prisma/client'
import { getUser, getDataSources, createDataSources, updateDataSourcesToEmbedding } from "@/database"

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
  const folders = folderIds.map((f)=>({id: f, userId: userId, provider: Provider.GoogleDrive, status: EmbedStatus.Embedding }));
  const sbClient = new ServiceBusClient(connectionString);
  const sender = sbClient.createSender(queueName);

  return Promise.all([
    getUser(userId), 
    sender.createMessageBatch(),
    createDataSources(folders).then(() => updateDataSourcesToEmbedding(folders))
  ])
    .then(([user, batch]) => {
      batch.tryAddMessage({
        contentType: "application/json",
        body: {
          email: user.email,
          folders: folders,
        },
      });
      return sender.sendMessages(batch);
    })
    .then((r) => sender.close())
    .then(() => res.status(200).end())
    .catch((...args) => {
      res.status(500).end(); 
      console.log(args);
    })
    .finally((r) => {
      return sbClient.close();
    });
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