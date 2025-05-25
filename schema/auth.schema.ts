// Validation schema using yup

// utils/validationSchemas.ts (optional location)
import { z } from 'zod';

const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(10, 'Phone number is too short'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;

const loginSchema = z.object({
  identifier: z
    .string()
    .nonempty('Email or phone number is required')
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+\d{10,15}$/; // E.164 format
        return emailRegex.test(value) || phoneRegex.test(value);
      },
      {
        message: 'Invalid email or phone number',
      },
    ),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});


const updatePasswordSchema = z.object({
  oldPassword: z.string().min(6, 'Old password must be at least 6 characters'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string(),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type UpdatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;

export { loginSchema, signupSchema , updatePasswordSchema };
