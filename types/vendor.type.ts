import { ApiResponse, ITimeStamp } from './base.type';

interface Vendor {
  business_name: string;
  business_email: string;
  phone_number: string;
  logo: File | null;
  userId: string;
}

interface CreateVendorRequest extends Vendor {}

interface CreateVendorResponse extends ApiResponse<IVendor> {}

interface IVendor extends CreateVendorRequest, ITimeStamp {
  id: string;
  logo_url: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED'; // Assuming these are the possible vendor statuses
  have_bank_details?: boolean;
}

interface AddBankAccountRequest {
  account_name: string,
  account_number: string,
  bank_name: string
}

export type { IVendor, CreateVendorRequest,AddBankAccountRequest, CreateVendorResponse };
