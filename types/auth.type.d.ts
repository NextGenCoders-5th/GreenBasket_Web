import { IUser } from './user.type';

interface ISignUpRequest {
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
}
interface SignUpResponse {
  data: {
    status: string;
    message: string;
    timestamp: string; // ISO date string
    data: {
      user: IUser;
      accessToken: string;
      refreshToken: string;
    };
  };
}

interface ILoginRequest {
  identifier: string; // Email or phone number
  password: string;
}
interface LoginResponse {
  data: {
    status: string;
    message: string;
    timestamp: string; // ISO date string
    data: IUser;
  };
}

interface ForgotPasswordRequest{
  email?: string;
  phonumber?: string;
}

interface ResetPasswordRequest{
  resetToken: string,
  body: {
    password: string,
    passwordConfirm: string
  }
}

export { ISignUpRequest, SignUpResponse, ILoginRequest, LoginResponse, ForgotPasswordRequest , ResetPasswordRequest};
