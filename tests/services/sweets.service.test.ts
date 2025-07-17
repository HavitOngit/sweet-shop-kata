import { beforeEach, describe, expect, it } from "vitest";
import { SweetModel } from "../../src/models/sweet.model";
import { SweetRepository } from "../../src/repositories/sweet.repository";
import { SweetService } from "../../src/services/sweets.service";

describe("Sweet Service", () => {
  let service: SweetService;
  let repository: SweetRepository;

  beforeEach(() => {
    repository = new SweetRepository();
    service = new SweetService(repository);
  });

  describe("addSweet", () => {
    it("should add a new sweet", () => {
      const sweetData = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 50,
      };

      const addedSweet = service.addSweet(sweetData);

      expect(addedSweet).toBeInstanceOf(SweetModel);
      expect(addedSweet.id).toBe("1");
      expect(addedSweet.name).toBe("Chocolate Bar");
      expect(addedSweet.category).toBe("Chocolate");
      expect(addedSweet.price).toBe(25.5);
      expect(addedSweet.quantity).toBe(50);
    });

    it("should throw error when adding sweet with existing ID", () => {
      const sweetData = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 50,
      };

      service.addSweet(sweetData);
      expect(() => service.addSweet(sweetData)).toThrow();
    });
  });

  describe("getSweetById", () => {
    it("should return sweet by ID", () => {
      const sweetData = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 50,
      };

      service.addSweet(sweetData);
      const foundSweet = service.getSweetById("1");

      expect(foundSweet.id).toBe("1");
      expect(foundSweet.name).toBe("Chocolate Bar");
    });

    it("should throw error when sweet not found", () => {
      expect(() => service.getSweetById("999")).toThrow();
    });
  });

  describe("getAllSweets", () => {
    it("should return all sweets", () => {
      const sweet1Data = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 50,
      };

      const sweet2Data = {
        id: "2",
        name: "Gummy Bears",
        category: "Candy",
        price: 15.0,
        quantity: 100,
      };

      service.addSweet(sweet1Data);
      service.addSweet(sweet2Data);

      const allSweets = service.getAllSweets();

      expect(allSweets).toHaveLength(2);
      expect(allSweets[0].name).toBe("Chocolate Bar");
      expect(allSweets[1].name).toBe("Gummy Bears");
    });

    it("should return empty array when no sweets exist", () => {
      const allSweets = service.getAllSweets();
      expect(allSweets).toHaveLength(0);
    });
  });

  describe("updateSweet", () => {
    it("should update existing sweet", () => {
      const sweetData = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 50,
      };

      service.addSweet(sweetData);

      const updatedData = {
        id: "1",
        name: "Dark Chocolate Bar",
        category: "Chocolate",
        price: 30.0,
        quantity: 40,
      };

      const updatedSweet = service.updateSweet("1", updatedData);

      expect(updatedSweet.name).toBe("Dark Chocolate Bar");
      expect(updatedSweet.price).toBe(30.0);
      expect(updatedSweet.quantity).toBe(40);
    });

    it("should throw error when updating non-existent sweet", () => {
      const updateData = {
        id: "999",
        name: "Non-existent",
        category: "Chocolate",
        price: 25.5,
        quantity: 50,
      };

      expect(() => service.updateSweet("999", updateData)).toThrow();
    });
  });

  describe("deleteSweet", () => {
    it("should delete existing sweet", () => {
      const sweetData = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 50,
      };

      service.addSweet(sweetData);
      const isDeleted = service.deleteSweet("1");

      expect(isDeleted).toBe(true);
      expect(() => service.getSweetById("1")).toThrow();
    });

    it("should return false when deleting non-existent sweet", () => {
      const isDeleted = service.deleteSweet("999");
      expect(isDeleted).toBe(false);
    });
  });

  describe("searchByName", () => {
    it("should find sweet by name", () => {
      const sweetData = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 50,
      };

      service.addSweet(sweetData);
      const foundSweet = service.searchByName("Chocolate Bar");

      expect(foundSweet).toBeDefined();
      expect(foundSweet!.name).toBe("Chocolate Bar");
    });

    it("should return undefined when sweet not found by name", () => {
      const foundSweet = service.searchByName("Non-existent");
      expect(foundSweet).toBeUndefined();
    });
  });

  describe("searchByCategory", () => {
    it("should find sweets by category", () => {
      const sweet1Data = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 50,
      };

      const sweet2Data = {
        id: "2",
        name: "Dark Chocolate",
        category: "Chocolate",
        price: 30.0,
        quantity: 30,
      };

      service.addSweet(sweet1Data);
      service.addSweet(sweet2Data);

      const chocolateSweets = service.searchByCategory("Chocolate");

      expect(chocolateSweets).toHaveLength(2);
      expect(chocolateSweets[0].category).toBe("Chocolate");
      expect(chocolateSweets[1].category).toBe("Chocolate");
    });

    it("should return empty array when no sweets found by category", () => {
      const foundSweets = service.searchByCategory("NonExistent");
      expect(foundSweets).toHaveLength(0);
    });
  });

  describe("searchByPriceRange", () => {
    it("should find sweets within price range", () => {
      const sweet1Data = {
        id: "1",
        name: "Cheap Candy",
        category: "Candy",
        price: 10.0,
        quantity: 100,
      };

      const sweet2Data = {
        id: "2",
        name: "Premium Chocolate",
        category: "Chocolate",
        price: 50.0,
        quantity: 20,
      };

      service.addSweet(sweet1Data);
      service.addSweet(sweet2Data);

      const sweetsInRange = service.searchByPriceRange(5.0, 15.0);

      expect(sweetsInRange).toHaveLength(1);
      expect(sweetsInRange[0].name).toBe("Cheap Candy");
    });

    it("should return empty array when no sweets in price range", () => {
      const sweetsInRange = service.searchByPriceRange(100.0, 200.0);
      expect(sweetsInRange).toHaveLength(0);
    });
  });

  describe("purchaseSweet", () => {
    it("should purchase sweet and decrease quantity", () => {
      const sweetData = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 50,
      };

      service.addSweet(sweetData);
      const purchaseResult = service.purchaseSweet("1", 10);

      expect(purchaseResult.success).toBe(true);
      expect(purchaseResult.sweet.quantity).toBe(40);
      expect(purchaseResult.message).toBe("Purchase successful");
    });

    it("should throw error when insufficient stock", () => {
      const sweetData = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 5,
      };

      service.addSweet(sweetData);
      expect(() => service.purchaseSweet("1", 10)).toThrow(
        "Insufficient stock",
      );
    });

    it("should throw error when purchasing non-existent sweet", () => {
      expect(() => service.purchaseSweet("999", 1)).toThrow();
    });
  });

  describe("restockSweet", () => {
    it("should restock sweet and increase quantity", () => {
      const sweetData = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 10,
      };

      service.addSweet(sweetData);
      const restockedSweet = service.restockSweet("1", 20);

      expect(restockedSweet.quantity).toBe(30);
    });

    it("should throw error when restocking non-existent sweet", () => {
      expect(() => service.restockSweet("999", 10)).toThrow();
    });

    it("should throw error when restocking with invalid quantity", () => {
      const sweetData = {
        id: "1",
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 25.5,
        quantity: 10,
      };

      service.addSweet(sweetData);
      expect(() => service.restockSweet("1", -5)).toThrow();
    });
  });
});
