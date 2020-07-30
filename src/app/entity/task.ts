import { Subcategory } from "./subcategory";
import { City } from "./city";
import { User } from "./user";

export class Task{
    id: number;
    name: string;
    description: string;
    completion: Date;
    price: number;
    subcategory: Subcategory;
    city: City;
    customer: User;
}
