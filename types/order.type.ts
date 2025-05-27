import { ApiResponse, ITimeStamp } from './base.type';
import { ICategory } from './category.type';
import { IVendor } from './vendor.type';

interface Order {
  name: string;
  description: string;
  price: number;
  discount_price: number;
  unit: string;
  stock: number;
  image: FileList | string | null; 
  categories?: (string | ICategory)[];
  image_url?: string;
}

interface CreateOrderRequest extends Order {}

interface CreateOrderResponse extends ApiResponse<IOrder> {}

interface IOrder extends CreateOrderRequest, ITimeStamp {
  id: string;
  logo_url: string;
  status: string;
  is_featured: boolean;
  Vendor: IVendor
}

interface CheckoutOrderRequest{
  cartId: string;
  addressId: string;
}

export type { IOrder, CreateOrderRequest,CheckoutOrderRequest, CreateOrderResponse };
