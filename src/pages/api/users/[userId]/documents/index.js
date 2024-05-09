
import { GetDocuments, DeleteDocuments } from "@/database"
import {QdrantClient} from '@qdrant/js-client-rest';

const QDRANT_API_KEY = process.env.QDRANT_API_KEY;
const QDRANT_URL = process.env.QDRANT_URL;

async function get(req, res){
  let {userId} = req.query;

  return GetDocuments(userId)
    .then((docs) => res.status(200).json(docs))
    .catch((...args) => {
      res.status(500).end(); 
      console.log(args);
    });
}

async function del(req, res) {
  const {userId} = req.query;
  const {namespace, docIds} = req.body;

  const client = new QdrantClient({
    url: QDRANT_URL,
    apiKey: QDRANT_API_KEY,
  });

  const promises = []
  for(const docId of docIds){
    promises.push(
      client.delete(namespace, {
        filter: {
          must: [
            {
              key: "ref_doc_id",
              match: {
                value: docId,
              },
            },
          ],
        },
      })
    );
  }

  return Promise.all(promises) 
  .then(()=> DeleteDocuments(docIds))
  .then(()=> res.status(200).end())
  .catch((...args) => {
    res.status(500).end(); 
    console.log(args);
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await get(req, res);
  }
  else if(req.method == 'DELETE') {
    await del(req, res);
  }
  // else if (req.method === 'POST') {
  //   await post(req, res);
  // }
  else {
    req.status(405).end();
  }
}