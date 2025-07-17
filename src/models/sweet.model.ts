import { throwError } from "../util";

export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export class SweetModel implements Sweet {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public price: number,
    public quantity: number,
  ) {
    if (typeof id !== "string" || id.trim() === "") {
      throwError("ID must be a non-empty string");
    }
    if (typeof name !== "string" || name.trim() === "") {
      throwError("Invalid Name Name must be a non-empty string");
    }
    if (typeof category !== "string" || category.trim() === "") {
      throwError("Invalid Category Category must be a non-empty string");
    }
    if (typeof price !== "number" || price < 0) {
      throwError("Invalid Price Price must be a non-negative number");
    }
    if (
      typeof quantity !== "number" ||
      quantity < 0 ||
      !Number.isInteger(quantity)
    ) {
      throwError(
        "Invalid Quantity Quantity must be a non-negative number and an integer",
      );
    }
  }

  public updateQuantity(newQuantity: number): void {
    if (
      typeof newQuantity !== "number" ||
      newQuantity < 0 ||
      !Number.isInteger(newQuantity)
    ) {
      throwError(
        "Invalid Quantity Quantity must be a non-negative number and an integer",
      );
    }
    this.quantity = newQuantity;
  }

  public updatePrice(newPrice: number): void {
    if (typeof newPrice !== "number" || newPrice < 0) {
      throwError("Invalid Price Price must be a non-negative number");
    }
    this.price = newPrice;
  }
}
