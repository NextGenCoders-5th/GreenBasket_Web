import { ApiResponse, ITimeStamp } from './base.type';

interface Payment {
  orderId: string;
}

interface CreatePaymentRequest extends Payment {}

interface CreatePaymentResponse extends ApiResponse<IPayment> {}



interface IPayment extends Payment, ITimeStamp {
  id: string;
}
  
export type { IPayment, CreatePaymentRequest, CreatePaymentResponse };
