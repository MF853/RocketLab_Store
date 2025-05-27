export type ProductCategory = 'perifericos' | 'componentes' | 'eletronicos';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  stock: number;
  category: ProductCategory;
  specs: Record<string, string>;
}

export interface ProductsData {
  products: Product[];
} 