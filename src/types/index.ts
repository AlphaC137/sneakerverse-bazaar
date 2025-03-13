
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  colors: string[];
  tags: string[];
  sizes: string[];
  featured: boolean;
}
