import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1),
  discount_price: z.number().optional().refine((val) => val && val >= 0, "Discount price must be greater than or equal to 0"),
  unit: z.string().min(1, "Unit is required"),
  stock: z.number().min(1),
  image: z.instanceof(FileList).refine((file) => file.length > 0, "Image is required"),
  categories: z.string().optional(),
});


export {productSchema}
export type ProductFormData = z.infer<typeof productSchema>;