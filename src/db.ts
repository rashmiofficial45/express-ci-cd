import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// 1. Create a PostgreSQL connection pool
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Create the Prisma adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to PrismaClient
export const prismaClient = new PrismaClient({ adapter });

// console.log(Object.keys(prismaClient.sum)) // the keys of the prisma client object
// What if we could mock out all these keys in a single function call?
// we want to achieve that by using one library @vitest-mock-extended