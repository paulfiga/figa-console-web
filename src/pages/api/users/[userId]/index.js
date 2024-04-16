import { getUser } from "@/database"

export default async function handler(req, res) {
  if(req.method === "GET") {
    let {userId} = req.query;
    const result = await getUser(userId);
    res.status(200).json(result);
  } else {
    res.status(405).end();
  }
}