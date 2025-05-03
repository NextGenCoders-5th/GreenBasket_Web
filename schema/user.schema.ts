import { z } from "zod";

const UserSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    phoneNumber: z.string().min(10, 'Phone number is required'),
    role: z.enum(['CUSTOMER', 'VENDOR', 'ADMIN']),
  });
export type UserFormData = z.infer<typeof UserSchema>;
export const userSchema = UserSchema;