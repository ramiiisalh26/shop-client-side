export interface Product {
    id: String;
    img: string;
    img_hover: string;
    name: string;
    price: number;
    old_price?: number; // Optional property
    category?: String
  }