import { ApiResponse, ITimeStamp } from './base.type';

interface Product {
  name: string;
  description: string;
  price: number;
  discount_price: number;
  unit: string;
  stock: number;
  image: File | string | null; 
  categories?: string;
  image_url?: string;
}

interface CreateProductRequest extends Product {}

interface CreateProductResponse extends ApiResponse<IProduct> {}

interface IProduct extends CreateProductRequest, ITimeStamp {
  id: string;
  logo_url: string;
  status: string;
}

export type { IProduct, CreateProductRequest, CreateProductResponse };
