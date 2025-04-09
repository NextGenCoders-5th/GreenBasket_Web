
 interface IUser {
    id: string;
    updatedAt: string;
    createdAt: string;
    first_name: string | null;
    last_name: string | null;
    email: string;
    phone_number: string;
    password: string;
    profile_picture: string | null;
    role: "CUSTOMER" | "ADMIN" | string; // You can expand this if needed
    status: "ACTIVE" | "INACTIVE" | string;
    authProvider: "EMAIL" | "GOOGLE" | string;
    is_onboarding: boolean;
    need_reset_password: boolean;
  }

  export {IUser}
  