import { PrismaClient } from "@prisma/client";
import { mockDeep } from "vitest-mock-extended";


//deep mocking all the available functions like [create, findMany, createMany, etc....]
export const prismaClient = mockDeep<PrismaClient>();
//we can verift that the functions are mocked by logging those functions
// console.log(prismaClient.sum.create)