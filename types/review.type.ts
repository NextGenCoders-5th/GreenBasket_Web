import { ApiResponse, ITimeStamp } from './base.type';
import { IProduct } from './product.type';

interface Review {
  orderItemId: string;
  rating: string;
  comment: string;
}

interface CreateReviewRequest extends Review {}

interface CreateReviewResponse extends ApiResponse<IReview> {}



interface IReview extends Review, ITimeStamp {
  id: string;
}
  
export type { IReview, CreateReviewRequest, CreateReviewResponse };
