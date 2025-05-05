import { Role } from '../enums/role.enum';
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
}

export type { IUser, CreateUserRequest, CreateUserResponse };
export { UserStatus, AuthProvider };
