import { IUser } from "./user.type";

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
    data: IUser;
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

export { ISignUpRequest, SignUpResponse, ILoginRequest, LoginResponse };
