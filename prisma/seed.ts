import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const passwordHash = await hash('remaja2016', 10)

    await prisma.user.upsert({
        where: { username: 'irmashid' },
        update: {},
        create: {
            username: 'irmashid',
            nama_lengkap: 'Administrator IRMASHID',
            role: 'ADMINISTRATOR',
            password_hash: passwordHash,
        },
    })

    console.log('Database seeded successfully')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
