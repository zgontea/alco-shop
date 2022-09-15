import { Product } from "./product";

export class OrderDetails {
    id!: number
    totalPrice!: number;
    quantity!: number;
    product!: Product;
}