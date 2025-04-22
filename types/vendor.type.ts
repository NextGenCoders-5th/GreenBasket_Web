import { ApiResponse, ITimeStamp } from "./base.type";

interface CreateVendorRequest {
    business_name: string,
    business_email: string,
    phone_number: string,
    logo_url: string
  }

interface CreateVendorResponse extends ApiResponse<IVendor> {}

interface IVendor extends CreateVendorRequest, ITimeStamp {
    id: string;
  }

export type { IVendor, CreateVendorRequest, CreateVendorResponse };
