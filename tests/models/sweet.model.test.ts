import { describe, expect, it } from "vitest";
import { SweetModel } from "../../src/models/sweet.model";

describe("Sweet Model", () => {
  describe("create", () => {
    it("should create a valid sweet", () => {
      const sweet = new SweetModel(1, "Chocobar", "Ice-Candy", 2.5, 10);
      expect(sweet.id).toBe("1");
      expect(sweet.name).toBe("Chocobar");
      expect(sweet.catogary).toBe("Ice-Candy");
      expect(sweet.price).toBe(2.5);
      expect(sweet.quantity).toBe(10);
    });
  });
});
