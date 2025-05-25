import { z } from 'zod';
const addressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  sub_city: z.string().min(1, "Sub-city is required"),
  street: z.string().min(1, "Street is required"),
  zip_code: z.string().min(1, "Zip code is required"),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});


 type AddressSchemaType = z.infer<typeof addressSchema>;
export { addressSchema, type AddressSchemaType };

