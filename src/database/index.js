import { EmbedStatus } from '@prisma/client'
import { prisma } from './client';

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
    data: objs,
    skipDuplicates: true
  });
}

export function updateDataSourcesToEmbedding(objs) {
  const ids = objs.map((o) => o.id);
  return prisma.dataSource.updateMany({
    where: {
      id: {
        in: ids
      }
    },
    data: {
      status: EmbedStatus.Embedding
    }
  });
}

export function GetDocuments(userId) {
  return prisma.document.findMany({
    where: {
      userId: userId
    }
  });
}

export function DeleteDocuments(docIds) {
  return prisma.document.deleteMany({
    where: {
      id: {
        in: docIds
      }
    }
  })
}

export function GetSetting(userId, type) {
  return prisma.setting.findUnique({
    where: {
      userId_type: {
        userId: userId,
        type: type
      }
    }
  })
}

export function UpdateSetting(userId, type, data) {
  return prisma.setting.upsert({
    where: {
      userId_type: {
        userId: userId,
        type: type
      }
    },
    update: {
      data: data
    },
    create: {
      userId: userId,
      type: type,
      data: data
    }
  })
}