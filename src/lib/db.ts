
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
}

// required code for dev environment because of hot reload
// new prisma client will be generated on the every reload
// and will cause the dev to be slower

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if(process.env.NODE_ENV !== "production"){
    globalForPrisma.prisma = prisma;   
}

export default prisma;