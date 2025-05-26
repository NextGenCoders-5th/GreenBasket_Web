import { Role } from '../enums/role.enum';
import { IAddress } from './address.type';
import { ApiResponse, ITimeStamp } from './base.type';
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
  address: IAddress,
  verify_status: "REQUESTED" | "VERIFIED" | "REJECTED",
  date_of_birth: string;
  authProvider: string,
  reset_password_token?: string;
  reset_password_token_expires_at?: string;
  idPhoto_front?: string;
  idPhoto_back?: string;
  vendor?: IVendor
}

interface UpdateProfileRquest {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  date_of_birth: string,
  gender: string
}

interface UpdatePasswordRequest{
  oldPassword: string,
  password: string,
  passwordConfirm: string
} 

interface VerifyUserRequest{
  userId: string,
  verifyStatus: string
}
interface VerificationRequest {
  id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  date_of_birth: string
  gender: string
  profile_picture: string
  role: "CUSTOMER" | "VENDOR"
  status: "ACTIVE" | "INACTIVE"
  verify_status: "REQUESTED" | "VERIFIED" | "REJECTED"
  createdAt: string
  updatedAt: string
}

export type { IUser, CreateUserRequest,UpdateProfileRquest,UpdatePasswordRequest,VerifyUserRequest, CreateUserResponse };
export { UserStatus, AuthProvider };
