import { OrderDetails } from "./order-details";
import { Product } from "./product";

export class ShoppingCartItemView {
    position!: number;
    orderDetail!: OrderDetails;
    productData!: Product;
}
