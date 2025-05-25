import { z } from 'zod';
export const CreateCartItemSchema = z.object({
  productId: z.string().nonempty('Product ID is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});
export type SignupSchemaType = z.infer<typeof CreateCartItemSchema>;

