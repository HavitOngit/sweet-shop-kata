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
}
