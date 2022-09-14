import { OrderStatus } from "./OrderStatus";
import { Product } from "./product";

export class Order {
    id!: number
    date!: Date;
    shipAddress!: string;
    shipCity!: string;
    shipCountry!: string;
    shipEmail!: string;
    shipPhoneNumber!: string;
    shipPostalCode!: string;
    status!: OrderStatus;
    userId!: number;
    products!: Product[];
}