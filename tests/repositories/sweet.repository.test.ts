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

  describe("getByID", () => {
    it("should return a sweet by ID", () => {
      const sweet = new SweetModel("1", "Chocolate", "Candy", 20, 10);
      const repository = new SweetRepository();
      repository.add(sweet);
      const foundSweet = repository.getById("1");
      expect(foundSweet).toEqual(sweet);
    });
  });

  describe("get all sweets", () => {
    it("should return all sweets", () => {
      const sweet1 = new SweetModel("1", "Chocolate", "Candy", 20, 10);
      const sweet2 = new SweetModel("2", "Gummy Bears", "Candy", 15, 5);
      const repository = new SweetRepository();
      repository.add(sweet1);
      repository.add(sweet2);
      expect(repository.getAll()).toEqual([sweet1, sweet2]);
    });
  });

  describe("update sweet", () => {
    it("should update a sweet", () => {
      const sweet = new SweetModel("1", "Chocolate", "Candy", 20, 10);
      const repository = new SweetRepository();
      repository.add(sweet);
      sweet.name = "Dark Chocolate";
      const updatedSweet = repository.update("1", sweet);
      expect(updatedSweet.name).toBe("Dark Chocolate");
    });
  });
});
