import { ApiResponse, ITimeStamp } from './base.type';
import { ICategory } from './category.type';
import { IVendor } from './vendor.type';

interface Product {
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

interface CreateProductRequest extends Product {}

interface CreateProductResponse extends ApiResponse<IProduct> {}

interface IProduct extends CreateProductRequest, ITimeStamp {
  id: string;
  logo_url: string;
  status: string;
  is_featured: boolean;
  Vendor: IVendor
}

enum ProductStatusEnum {
  ACTIVE = 'Active',
  INACTIVE= 'Inactive',
  OUT_OF_STOCK = 'out_of_stock'
}
interface ProductSearchParams{
  search: string,
  minPrice: number,
  maxPrice: number,
  status: ProductStatusEnum,
  vendorId: string,
  categoryId: string,
  isFeatured: string,
  sortBy: string;
  sortOrder: string;
  limit: number; 
  page: number
}

export type { IProduct, CreateProductRequest,ProductSearchParams, ProductStatusEnum, CreateProductResponse };
