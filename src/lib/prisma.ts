import { PrismaClient, Prisma } from "@prisma/client"

let prisma: PrismaClient

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient()
}
prisma = globalForPrisma.prisma

export { prisma, Prisma }
