import { Role } from '@/enums/role.enum';
import { z } from 'zod';

const UserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  role: z.enum(Object.values(Role) as [string, ...string[]]),
});
export type UserFormData = z.infer<typeof UserSchema>;
export const userSchema = UserSchema;

interface CompleteOnboadrding{
  first_name:string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  profile_picture: string;
  idPhoto_front: string;
  idPhoto_back:string;
}

interface VerifyUser{
  userId: string,
  verify_status: string
}