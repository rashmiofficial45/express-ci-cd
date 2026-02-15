import { vi } from "vitest";

// Plain object mock so vi.spyOn(prismaClient.sum, "create") works
export const prismaClient = {
  sum: {
    create: vi.fn(),
  },
} as any;
//we can verift that the functions are mocked by logging those functions
// console.log(prismaClient.sum.create)