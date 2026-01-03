import { PrismaClient } from "@prisma/client"

/**
 * Inisialisasi Prisma Client secara Singleton.
 * Ini mencegah terjadinya error 'too many connections' pada database saat mode development
 * karena Next.js melakukan hot-reloading.
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
