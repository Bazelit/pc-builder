import { prisma } from "./db";

export async function getMyBuilds(userId: string) {
  return prisma.build.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true } },
      components: {
        include: {
          component: { select: { name: true, type: true, price: true } },
        },
      },
    },
  });
}

export async function getPublickBuilds(userId: string) {
  return prisma.build.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, name: true } },
      components: {
        include: {
          component: { select: { name: true } },
        },
      },
      _count: { select: { likes: true } },
      likes: { where: { userId }, select: { id: true } },
    },
  });
}

export async function getBuildToEdit(buildId: string) {
  return prisma.build.findFirst({
    where: {
      id: buildId,
    },
    include: {
      components: {
        include: {
          component: true,
        },
      },
    },
  });
}

export async function getPopularBuilds(limit = 3) {
  return prisma.build.findMany({
    where: { isPublic: true, likes: { some: {} } },
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
    take: limit,
    include: {
      _count: { select: { likes: true } },
    },
  });
}
