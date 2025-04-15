import { Product } from "../product/Product";

export interface Category{
    id: String;
    name: String;
    description: String;
    products: Product[];
    category_creation_date: Date;
}