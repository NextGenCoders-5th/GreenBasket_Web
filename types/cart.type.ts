import { ApiResponse, ITimeStamp } from './base.type';
import { IProduct } from './product.type';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CreateCartItemRequest extends CartItem {}

interface CreateCartItemResponse extends ApiResponse<ICartItem> {}
export interface Product {
  id: string;
  updatedAt: string;
  createdAt: string;
  name: string;
  description: string;
  price: number;
  discount_price: number;
  unit: string;
  stock: number;
  image_url: string;
  status: "ACTIVE" | "INACTIVE"; // You can expand this if there are more status types
  is_featured: boolean;
  vendorId: string;
}



interface ICartItem extends ITimeStamp {
  id: string
  price: number
  quantity: number
  sub_total: number
  productId: string
  cartId: string
  Product: Product
}

interface Cart {
  id: string
  total_price: number
  status: string
  userId: string
  CartItems: ICartItem[]
  createdAt: string;
  updatedAt: string;
}

  
export type { Cart, ICartItem, CartItem, CreateCartItemRequest, CreateCartItemResponse };
