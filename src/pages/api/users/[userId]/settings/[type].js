import { GetSetting, UpdateSetting } from "@/database";

async function get(req, res) {
  const {userId, type} = req.query;

  return GetSetting(userId, type)
    .then(s =>res.status(200).json(s.data));
}

async function post(req, res) {
  const {userId, type} = req.query;
  const data = req.body;

  return UpdateSetting(userId, type, data)
    .then(()=>res.status(200).end());
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await get(req, res);
  }
  else if(req.method == 'POST') {
    await post(req, res);
  }
  else {
    req.status(405).end();
  }
}