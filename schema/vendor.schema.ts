import { log } from 'console';
import { z } from 'zod';

export const vendorSchema = z.object({
  business_name: z.string().min(1, 'Business name is required'),
  business_email: z.string().email('Invalid email'),
  phone_number: z.string().min(10, 'Phone number is required'),
  logo: z.any().refine((file) => file, 'Logo is required'),
  userId: z.string().uuid('Invalid user ID'),
});


export const editVendorSchema = z.object({
  business_name: z.string().min(1, 'Business name is required'),
  business_email: z.string().email('Invalid email'),
  phone_number: z.string().min(10, 'Phone number is required'),
  userId: z.string().uuid('Invalid user ID'),
  logo: z.any().optional(),
  logo_url: z.string().optional(),
});

export type VendorFormData = z.infer<typeof vendorSchema>;
