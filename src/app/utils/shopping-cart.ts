import { Product } from '../wrappers/product';

export class ShoppingCart {
  public static products: Product[] = [];

  constructor() {}

  public static addItem(item: Product) {
    ShoppingCart.products.push(item);
  }

  public static removeItem(id: number) {
    delete ShoppingCart.products[id];
  }
}
