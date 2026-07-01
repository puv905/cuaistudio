/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type WaterCategory = 'mineral' | 'alkaline' | 'energy' | 'jelly';

export interface Product {
  id: string;
  name: string;
  category: WaterCategory;
  description: string;
  price: number;
  image: string;
  packaging: string;
  size: string;
  badge?: string;
  specs: string[]; // Key advantages/specs (e.g. pH level, minerals)
  isBestSeller?: boolean;
  minOrderQuantity?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email?: string;
  deliveryAddress: string;
  items: CartItem[];
  total: number;
  deliveryOption: string; // e.g. "Cash on Delivery"
  timestamp: string;
}
