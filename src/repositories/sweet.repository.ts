import { SweetModel } from "../models/sweet.model";

export class SweetRepository {
  private sweets: Map<string, SweetModel> = new Map();

  add(sweet: SweetModel): SweetModel {
    this.sweets.set(sweet.id, sweet);
    return sweet;
  }
}
