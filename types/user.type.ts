import { VerificationEnum } from '@/enums/verification.enum';
import { Role } from '../enums/role.enum';
import { IAddress } from './address.type';
import { ApiResponse, ITimeStamp } from './base.type';
import { CartItem } from './cart.type';
import { IOrder } from './order.type';
import { IVendor } from './vendor.type';

enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
enum AuthProvider {
  EMAIL = 'EMAIL',
  GOOGLE = 'GOOGLE',
}
interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: Role;
}

interface CreateUserResponse extends ApiResponse<IUser> {}

interface IUser extends CreateUserRequest, ITimeStamp {
  id: string;
  profile_picture: string | null;
  status: UserStatus;
  auth_provider: AuthProvider;
  is_verified: boolean;
  gender: string;
  is_onboarding: boolean;
  need_reset_password: boolean;
  first_name?: string;
  last_name?: string;
  phone_number: string;
  address?: IAddress;
  verify_status: VerificationEnum;
  date_of_birth: string;
  authProvider: string;
  reset_password_token?: string;
  reset_password_token_expires_at?: string;
  idPhoto_front?: string;
  idPhoto_back?: string;
  vendor?: IVendor;
}

interface UpdateProfileRquest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  date_of_birth: string;
  gender: string;
}

interface UpdatePasswordRequest {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

interface VerifyUserRequest {
  userId: string;
  verify_status: string;
}
interface VerificationRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  profile_picture: string;
  role: 'CUSTOMER' | 'VENDOR';
  status: 'ACTIVE' | 'INACTIVE';
  verify_status: 'REQUESTED' | 'VERIFIED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

interface IVendorBalance {
  id: string;
  updatedAt: string;
  createdAt: string;
  total_earnings: number;
  available_balance: number;
  withdrawn_amount: number;
  pending_withdrawals: number;
  vendorId: string;
}

interface IVendorBankAccount  {
  id: string;
  createdAt: string;
  updatedAt: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  currency: string;
  vendorId: string;
};
interface ICurrentUser extends IUser {
  Review: IReview[]; 
  cart: CartItem[]; 
  orders: IOrder[]; 
  vendor: IVendor & {
    address: IAddress[]; 
    VendorBalance: IVendorBalance
    VendorBankAccount:IVendorBankAccount
  };
}


interface IReview {
  id: string;
  rating: number;
  comment: string;
}


export type { IUser, CreateUserRequest, ICurrentUser, IReview,UpdateProfileRquest, UpdatePasswordRequest, VerifyUserRequest, CreateUserResponse };
export { UserStatus, AuthProvider };
