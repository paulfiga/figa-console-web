
import {GetDocuments} from "@/database"

async function get(req, res){
  let {userId} = req.query;

  return GetDocuments(userId)
    .then((docs) => res.status(200).json(docs))
    .catch((...args) => {
      res.status(500).end(); 
      console.log(args);
    });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await get(req, res);
  }
  // else if (req.method === 'POST') {
  //   await post(req, res);
  // }
  else {
    req.status(405).end();
  }
}