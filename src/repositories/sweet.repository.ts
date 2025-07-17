import { SweetModel } from "../models/sweet.model";
import { throwError } from "../util";

export class SweetRepository {
  private sweets: Map<string, SweetModel> = new Map();

  add(sweet: SweetModel): SweetModel {
    if (this.sweets.has(sweet.id)) {
      throwError(`Sweet with ID ${sweet.id} already exists`);
    }
    this.sweets.set(sweet.id, sweet);
    return sweet;
  }

  getById(id: string): SweetModel {
    const sweet = this.sweets.get(id);
    if (!sweet) {
      throwError(`Sweet with ID ${id} not found`);
    }
    return sweet;
  }

  getAll(): SweetModel[] {
    return Array.from(this.sweets.values());
  }

  update(id: string, updatedSweet: SweetModel): SweetModel {
    if (!this.sweets.has(id)) {
      throwError(`Sweet with ID ${id} not found`);
    }
    this.sweets.set(id, updatedSweet);
    return updatedSweet;
  }

  getByName(name: string): SweetModel | undefined {
    return Array.from(this.sweets.values()).find(
      (sweet) => sweet.name === name,
    );
  }

  getByCategory(category: string): SweetModel[] {
    return Array.from(this.sweets.values()).filter(
      (sweet) => sweet.category === category,
    );
  }

  getByPriceRange(minPrice: number, maxPrice: number): SweetModel[] {
    return Array.from(this.sweets.values()).filter(
      (sweet) => sweet.price >= minPrice && sweet.price <= maxPrice,
    );
  }
  delete(id: string): boolean {
    if (!this.sweets.has(id)) {
      return false;
    }
    this.sweets.delete(id);
    return true;
  }
}
