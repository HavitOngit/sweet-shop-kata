import { describe, it } from "vitest";
import { SweetModel } from "../../src/models/sweet.model";

describe("sweet repository", () => {
  describe("add", () => {
    it("should add a sweet", () => {
      const sweet = new SweetModel("1", "Chocolate", "Candy", 20, 10);
      const repository = new SweetRepository(sweet);
      repository.add(sweet);
    });
  });
});
