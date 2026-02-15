import { describe, expect, it, vi } from "vitest";
import { userfn } from "../utils";
/**
 * ─────────────────────────────────────────────
 *  OPTIONAL: Mock Prisma (recommended for unit tests)
 * ─────────────────────────────────────────────
 * Now it is working perfectly.
 */
// vi.mock("../db", () => ({
//   prismaClient: {
//     sum: {
//       create: vi.fn()
//     }
//   }
// }));

//mocking the db module deeply (mockDeep)
vi.mock("../db")
vi.mock("../utils") //IMP: this line activates the mock. commenting this line will deactivate the mock even if the the mock file exists...

import request from "supertest";
import { app } from "../index";

describe("POST /sum", () => {
  describe("When inputs are valid", () => {
    it("should return 200 and correct sum", async () => {
      const res = await request(app)
        .post("/sum")
        .send({ a: 1, b: 2 }); // Using 1 and 2 to be explicit
      console.log(userfn())
      expect(res.statusCode).toBe(200);
      expect(res.body.answer).toBe(3);
    });
  });

  describe("When inputs are invalid", () => {
    it("should return 411 for wrong input types", async () => {
      const res = await request(app)
        .post("/sum")
        .send({
          a: ["asdasdasd"], // invalid type
          b: 2,
        });

      expect(res.statusCode).toBe(411);
      expect(res.body.message).toBe("Incorrect inputs");
    });

    it("should return 411 for empty body", async () => {
      const res = await request(app).post("/sum").send({});

      expect(res.statusCode).toBe(411);
    });
  });
});
