import { describe, it } from "vitest";

describe("Sweet", () => {
  describe("add New Sweet", () => {
    it("should add a new sweet", () => {
      const sweetshot = new SweetShop();
      const newSweet = {
        id: "1",
        name: "Chocolate",
        catogary: "Candy",
        price: 10,
        quantity: 100,
      };
      sweetshot.addSweet(newSweet);
    });
  });
});
