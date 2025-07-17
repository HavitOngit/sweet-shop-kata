export interface sweet {
  id: string;
  name: string;
  catogary: string;
  price: number;
  quantity: number;
}

function throwError(massage: string): never {
  throw new Error(massage);
}

export class SweetModel implements sweet {
  constructor(
    public id: string,
    public name: string,
    public catogary: string,
    public price: number,
    public quantity: number,
  ) {}
}
