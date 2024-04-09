import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ['query', 'info'] })

export default async function handler(req, res) {
  let {uid} = req.query;

  
  const result = await prisma.user.findUnique({
    where: {
      id: uid
    },
  })
  
  res.status(200).json(result);
}