import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  image: z.instanceof(FileList).refine((file) => file.length > 0, 'Image is required'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export { categorySchema };
export type { CategoryFormData };
