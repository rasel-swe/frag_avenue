
export enum FragranceType {
  EDP = 'Eau de Parfum',
  EXTRAIT = 'Extrait de Parfum',
  COLOGNE = 'Cologne'
}

export type ProductSize = '3ml' | '5ml' | '10ml' | '30ml' | '50ml' | '100ml';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Men' | 'Women' | 'Unisex';
  type: FragranceType;
  price: number;
  description: string;
  image: string;
  isNew: boolean;
  isBestSeller: boolean;
  rating: number;
  notes: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  size: ProductSize;
  quantity: number;
  priceAtSelection: number;
}

export interface User {
  email: string;
  name: string;
  address?: string;
  paymentMethod?: string;
  wishlist: string[];
}
