import { Role } from '../enums/role.enum';
import { IAddress } from './address.type';
import { ApiResponse, ITimeStamp } from './base.type';

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
  is_onboarding: boolean;
  need_reset_password: boolean;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: IAddress
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

export type { IUser, CreateUserRequest,UpdateProfileRquest,UpdatePasswordRequest,VerifyUserRequest, CreateUserResponse };
export { UserStatus, AuthProvider };
