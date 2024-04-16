import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'info'] })

export function getUser(userId) {
  return prisma.user.findUnique({
    where: {
      id: userId
    },
  })
}

export function getDataSources(userId, provider) {
  return prisma.dataSource.findMany({
    where: {
      userId: userId,
      provider: provider,
    }
  })
}

export function createDataSources(objs) {
  return prisma.dataSource.createMany({
    data: objs
  });
}