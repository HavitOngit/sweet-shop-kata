import { SweetModel } from "../models/sweet.model";
import type { ISweetRepository } from "../repositories/sweet.repository";
import { throwError } from "../util";

export interface ISweetService {
  addSweet(sweetData: SweetCreateData): SweetModel;
  getSweetById(id: string): SweetModel;
  getAllSweets(): SweetModel[];
  updateSweet(id: string, sweetData: SweetUpdateData): SweetModel;
  deleteSweet(id: string): boolean;
  searchByName(name: string): SweetModel | undefined;
  searchByCategory(category: string): SweetModel[];
  searchByPriceRange(minPrice: number, maxPrice: number): SweetModel[];
  purchaseSweet(id: string, quantity: number): PurchaseResult;
  restockSweet(id: string, quantity: number): SweetModel;
}

export interface SweetCreateData {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface SweetUpdateData {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface PurchaseResult {
  success: boolean;
  sweet: SweetModel;
  message: string;
}

export class SweetService implements ISweetService {
  constructor(private repository: ISweetRepository) {}

  addSweet(sweetData: SweetCreateData): SweetModel {
    const sweet = new SweetModel(
      sweetData.id,
      sweetData.name,
      sweetData.category,
      sweetData.price,
      sweetData.quantity,
    );

    return this.repository.add(sweet);
  }

  getSweetById(id: string): SweetModel {
    return this.repository.getById(id);
  }

  getAllSweets(): SweetModel[] {
    return this.repository.getAll();
  }

  updateSweet(id: string, sweetData: SweetUpdateData): SweetModel {
    const updatedSweet = new SweetModel(
      sweetData.id,
      sweetData.name,
      sweetData.category,
      sweetData.price,
      sweetData.quantity,
    );

    return this.repository.update(id, updatedSweet);
  }

  deleteSweet(id: string): boolean {
    return this.repository.delete(id);
  }

  searchByName(name: string): SweetModel | undefined {
    return this.repository.getByName(name);
  }

  searchByCategory(category: string): SweetModel[] {
    return this.repository.getByCategory(category);
  }

  searchByPriceRange(minPrice: number, maxPrice: number): SweetModel[] {
    return this.repository.getByPriceRange(minPrice, maxPrice);
  }

  purchaseSweet(id: string, quantity: number): PurchaseResult {
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      throwError("Purchase quantity must be a positive integer");
    }

    const sweet = this.repository.getById(id);

    if (!sweet) {
      throwError(`Sweet with ID ${id} not found`);
    }

    if (sweet.quantity < quantity) {
      throwError("Insufficient stock");
    }

    const newQuantity = sweet.quantity - quantity;
    sweet.updateQuantity(newQuantity);

    const updatedSweet = this.repository.update(id, sweet);

    return {
      success: true,
      sweet: updatedSweet,
      message: "Purchase successful",
    };
  }

  restockSweet(id: string, quantity: number): SweetModel {
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      throwError("Restock quantity must be a positive integer");
    }

    const sweet = this.repository.getById(id);
    if (!sweet) {
      throwError(`Sweet with ID ${id} not found`);
    }
    const newQuantity = sweet.quantity + quantity;
    sweet.updateQuantity(newQuantity);

    return this.repository.update(id, sweet);
  }
}
