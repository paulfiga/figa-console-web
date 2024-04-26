
import {GetDocuments} from "@/database"

async function get(req, res){
  let {userId} = req.query;

  return GetDocuments(userId).then((docs) => {
    const data = docs.map((d)=>({
      id: d.value.__data__.id_,
      name: d.value.__data__.metadata.filename,
      status: 'Done'
    }));
    res.status(200).json(data);
  })
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