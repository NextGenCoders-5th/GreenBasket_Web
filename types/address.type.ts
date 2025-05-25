import { ApiResponse, ITimeStamp } from './base.type';

interface Address {
  country: string;
  city: string;
  sub_city: string;
  street: string;
  zip_code: string;
  latitude: number;
  longitude: number;
}


interface CreateAddressRequest extends Address {}

interface CreateAddressResponse extends ApiResponse<IAddress> {}

interface IAddress extends CreateAddressRequest, ITimeStamp {
  id: string;
}

export type { IAddress, CreateAddressRequest, CreateAddressResponse };
