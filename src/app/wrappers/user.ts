import {Product} from "./product";
export class User {
  name!: string;
  surname!: string;
  phone!: string;
  email!: string;
  password!: string;
  id!: number;
  cart!:Array<Product>;
}
