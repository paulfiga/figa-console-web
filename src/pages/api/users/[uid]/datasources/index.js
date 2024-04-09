import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ['query', 'info'] })

export default async function handler(req, res) {
  let {uid} = req.query;
  
  if (req.method === 'POST') {
    let body = req.body;

    let data = req.body.map((d) => ({
        id: d.id,
        name: d.name,
        provider: d.provider,
        userId: uid,
    }));

    // insert to database
    await prisma.dataSource.createMany({
      data: data,
    })

    res.status(200).json({});
  }

  else {
    const result = await prisma.dataSource.findMany({
      where: {
        userId: uid
      },
    })
    
    res.status(200).json(result);
  }
}