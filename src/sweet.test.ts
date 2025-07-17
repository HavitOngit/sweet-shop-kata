import { describe, expect, it } from "vitest";
import { SweetShop } from "./sweet";

describe("Sweet", () => {
  describe("add New Sweet", () => {
    it("should add a new sweet", () => {
      const sweetshop = new SweetShop();
      const newSweet = {
        id: "1",
        name: "Chocolate",
        catogary: "Candy",
        price: 10,
        quantity: 100,
      };
      sweetshop.addSweet(newSweet);
      expect(sweetshop.sweets).toHaveLength(1);
    });
  });
});
