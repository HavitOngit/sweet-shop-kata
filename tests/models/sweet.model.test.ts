import { describe, expect, it } from "vitest";
import { SweetModel } from "../../src/models/sweet.model";

describe("Sweet Model", () => {
  describe("create", () => {
    it("should create a valid sweet", () => {
      const sweet = new SweetModel("1", "Chocobar", "Ice-Candy", 2.5, 10);
      expect(sweet.id).toBe("1");
      expect(sweet.name).toBe("Chocobar");
      expect(sweet.category).toBe("Ice-Candy");
      expect(sweet.price).toBe(2.5);
      expect(sweet.quantity).toBe(10);
    });

    it("should throw an error for invalid ID", () => {
      expect(
        () => new SweetModel("", "Chocobar", "Ice-Candy", 2.5, 10),
      ).toThrow();
    });
    it("should throw an error for invalid Name", () => {
      expect(() => new SweetModel("1", "", "Ice-Candy", 2.5, 10)).toThrow();
    });
    it("should throw an error for invalid category", () => {
      expect(() => new SweetModel("1", "Chocobar", "", 2.5, 10)).toThrow();
    });
    it("should throw an error for invalid Price", () => {
      expect(
        () => new SweetModel("1", "Chocobar", "Ice-Candy", -2.5, 10),
      ).toThrow();
    });
    it("should throw an error for invalid Quantity", () => {
      expect(
        () => new SweetModel("1", "Chocobar", "Ice-Candy", 2.5, -10),
      ).toThrow();
      expect(
        () => new SweetModel("1", "Chocobar", "Ice-Candy", 2.5, 10.5),
      ).toThrow();
    });
  });
  describe("update", () => {
    it("should update the sweet Quantity", () => {
      const sweet = new SweetModel("1", "Chocobar", "Ice-Candy", 2.5, 10);
      sweet.updateQuantity(20);
      expect(sweet.quantity).toBe(20);
    });
  });
});
