import { Product } from "../product/Product";

export interface OrderItem{
    id: number;
    product: Product;
    quantity: number;
    totalPrice: number;
    productOptions: String;
    discount: number; 
}