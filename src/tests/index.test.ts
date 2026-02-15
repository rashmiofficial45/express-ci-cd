import { describe, expect, it, vi, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../index";

// Mocks must be hoisted - vi.mock is auto-hoisted
vi.mock("../db");
vi.mock("../utils");

import { prismaClient } from "../db";

describe("POST /sum", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("When inputs are valid", () => {
    it("should return 200 and correct sum", async () => {
      const createSpy = vi.spyOn(prismaClient.sum, "create");

      const res = await request(app)
        .post("/sum")
        .send({ a: 1, b: 2 });

      expect(res.statusCode).toBe(200);
      expect(res.body.answer).toBe(3);

      // Spy: verify prismaClient.sum.create was called exactly once with correct data
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith({
        data: { a: 1, b: 2, result: 3 },
      });
    });
  });

  describe("When inputs are invalid", () => {
    it("should return 411 for wrong input types and NOT call prisma", async () => {
      const createSpy = vi.spyOn(prismaClient.sum, "create");

      const res = await request(app)
        .post("/sum")
        .send({ a: ["invalid"], b: 2 });

      expect(res.statusCode).toBe(411);
      expect(res.body.message).toBe("Incorrect inputs");

      expect(createSpy).not.toHaveBeenCalled();
    });

    it("should return 411 for empty body and NOT call prisma", async () => {
      const createSpy = vi.spyOn(prismaClient.sum, "create");

      const res = await request(app).post("/sum").send({});

      expect(res.statusCode).toBe(411);

      expect(createSpy).not.toHaveBeenCalled();
    });
  });
});
