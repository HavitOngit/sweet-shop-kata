import { describe, expect, it } from "vitest";
import { SweetModel } from "../../src/models/sweet.model";
import { SweetRepository } from "../../src/repositories/sweet.repository";

describe("sweet repository", () => {
  describe("add", () => {
    it("should add a sweet", () => {
      const sweet = new SweetModel("1", "Chocolate", "Candy", 20, 10);
      const repository = new SweetRepository();
      const addedSweet = repository.add(sweet);
      expect(addedSweet).toEqual(sweet);
    });

    it("should not add a sweet with an existing ID", () => {
      const sweet = new SweetModel("1", "Chocolate", "Candy", 20, 10);
      const repository = new SweetRepository();
      repository.add(sweet);
      expect(() => repository.add(sweet)).toThrow();
    });
  });
});
