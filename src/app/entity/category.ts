import { Subcategory } from "./subcategory";

export class Category{
  id: number;
  name: string;
  subcategories: Array<Subcategory>;
}
