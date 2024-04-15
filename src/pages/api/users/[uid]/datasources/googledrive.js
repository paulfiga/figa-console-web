import { PrismaClient } from '@prisma/client'
import { googleDrive } from '@/utils/google';

const prisma = new PrismaClient({ log: ['query', 'info'] })

export default async function handler(req, res) {
  let {uid} = req.query;
  const service = googleDrive();
  
  const result = await prisma.user.findUnique({
    where: {
      id: uid
    },
  })

  const r = await service.files.list({
    q: `mimeType = 'application/vnd.google-apps.folder' and '${result.email}' in owners` ,
    pageSize: 100,
    fields: 'nextPageToken, files(id, name, parents)',
  });

  res.status(200).json(
    r.data.files
  );
}