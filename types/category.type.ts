import { ApiResponse, ITimeStamp } from './base.type';

interface Category {
  name: string;
  image: File | null
}

interface CreateCategoryRequest extends Category {}

interface CreateCategoryResponse extends ApiResponse<ICategory> {}

interface ICategory extends CreateCategoryRequest, ITimeStamp {
  id: string;
  logo_url: string;
  status: string;
}

export type { ICategory, CreateCategoryRequest, CreateCategoryResponse };
