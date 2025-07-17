export interface sweet {
  id: string;
  name: string;
  catogary: string;
  price: number;
  quantity: number;
}

export class SweetShop {
  public sweets: sweet[] = [];

  addSweet(newSweet: sweet): void {
    this.sweets.push(newSweet);
  }
}
