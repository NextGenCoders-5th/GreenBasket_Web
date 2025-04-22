import { Role } from '../enums/role.enum';
import { ApiResponse } from './base.type';

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
}

export { IUser, CreateUserRequest, CreateUserResponse, UserStatus, AuthProvider };

