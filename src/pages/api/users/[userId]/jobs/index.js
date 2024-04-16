const { ServiceBusClient } = require("@azure/service-bus");
import { PrismaClient, EmbedStatus, Provider } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'info'] })
// connection string to your Service Bus namespace
const connectionString = process.env.SERVICE_BUS;
// name of the queue
const queueName = process.env.SERVICE_BUS_QUEUE;

export default async function handler(req, res) {
  const {uid} = req.query;
  const folderIds = req.body; 
  
  const result = await prisma.user.findUnique({
    where: {
      id: uid
    },
  })

  await prisma.dataSource.createMany({
    data: folderIds.map((f)=>({id: f, userId: uid, provider: Provider.GoogleDrive, status: EmbedStatus.Embedding }))
  })

  // await prisma.dataSource.updateMany({
  //   where: {
  //     id: {
  //       in: folderIds
  //     }
  //   },
  //   data: {
  //     status: EmbedStatus.Embedding
  //   }
  // })

  // console.log(result.email);

  // create a Service Bus client using the connection string to the Service Bus namespace
  // const sbClient = new ServiceBusClient(connectionString);

  // // createSender() can also be used to create a sender for a topic.
  // const sender = sbClient.createSender(queueName);

  // try {
  //   // Tries to send all messages in a single batch.
  //   // Will fail if the messages cannot fit in a batch.
  //   // await sender.sendMessages(messages);

  //   // create a batch object
  //   let batch = await sender.createMessageBatch();
    
  //   // add message
  //   batch.tryAddMessage({
  //     contentType: "application/json",
  //     body: {
  //       email: result.email,
  //     }
  //   })

  //   // Send the last created batch of messages to the queue
  //   await sender.sendMessages(batch);

  //   // Close the sender
  //   await sender.close();
  // } finally {
  //     await sbClient.close();
  // }

  res.status(200).end();
}