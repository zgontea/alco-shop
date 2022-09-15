import { User } from "./user";

export class OrderWrapper {
    id!: number
    createdDate!: string;
    shipAddress!: string;
    shipCity!: string;
    shipEmail!: string;
    shipPhoneNo!: string;
    shipPostalCode!: string;
    status!: string;
    totalPrice!: number;
    user!: User;
}