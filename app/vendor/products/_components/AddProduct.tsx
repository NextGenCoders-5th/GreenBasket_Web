import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormData, productSchema } from '@/schema/product.schema';
import { useCreateProductMutation } from '@/redux/api/product.api';
import { useToast } from '@/providers/toast.provider';
import { ErrorEnum } from '@/enums/error.enum';
import { Checkbox } from '@/components/ui/checkbox';
import { useGetCategoriesQuery } from '@/redux/api/category.api';

export default function AddProductDialog() {
    const [open, setOpen] = useState(false);

    // Getting categories
    const { data} = useGetCategoriesQuery("")
    const categories = data?.data.data || [];

    console.log(categories)

    // Getting redux api instance to create product
    const [createProduct, { isLoading }] = useCreateProductMutation();

    // Integrating Zod with React Hook Form
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    const selectedCategories = watch('categories', "") as string; // Watch the selected categories

    const handleCheckboxChange = (category: string) => {
        const currentSelection = [...(selectedCategories || "").split(",")]; // Get the current selection
        if (currentSelection.includes(category)) {
            // If category is already selected, remove it
            setValue(
                'categories',
                currentSelection.filter((item: string) => item !== category).join(",")
            );
        } else {
            setValue('categories', [...currentSelection, category].join(","));
        }
    };

    const onSubmit = (data: ProductFormData) => {
        const toastId = toast.loading('Creating product...');
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price.toString());
        formData.append('discount_price', data.discount_price?.toString() || '');
        formData.append('unit', data.unit);
        formData.append('stock', data.stock.toString());
        formData.append('image', data.image[0]);
        const categories = data.categories?.split(",")|| [];
        formData.append('categories', JSON.stringify(categories));

        try {
            createProduct(formData)
                .unwrap()
                .then(() => {
                    toast.success('Product added successfully!', { id: toastId });
                    reset();
                    setOpen(false);
                })
                .catch((error) => {
                    console.error('Error adding product:', error);
                    if (error.status === ErrorEnum.UNKOWN_ERROR) {
                        toast.error('Product adding failed. Please try again.', { id: toastId });
                    }
                    else {
                        toast.dismiss(toastId);
                    }
                });
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Product adding failed. Please try again.', { id: toastId });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors duration-300">
                    Add Product
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-lg text-slate-700">
                <DialogHeader>
                    <DialogTitle className='text-green-700'>Add New Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className='space-y-1'>
                            <Label htmlFor="name">Name *</Label>
                            <Input id="name" {...register("name")} />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor="price">Price *</Label>
                            <Input type='number'  step="0.01" id="price" {...register("price", {valueAsNumber: true})} />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor="description">Description *</Label>
                            <Textarea id="description" {...register("description")} />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor="unit">Unit *</Label>
                            <Input  id="unit" {...register("unit")} />
                            {errors.unit && <p className="text-red-500 text-sm">{errors.unit.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor="discount_price">Discount Price</Label>
                            <Input type='number'  step="0.01" id="discount_price" {...register("discount_price", {valueAsNumber: true})} />
                            {errors.discount_price && <p className="text-red-500 text-sm">{errors.discount_price.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor="stock">Stock *</Label>
                            <Input  type='number' id="stock" {...register("stock" , {valueAsNumber: true})} />
                            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor="image">Image *</Label>
                            <Input type="file" id="image" accept="image/*" {...register("image")} />
                            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                        </div>


                        <div className="space-y-2 mt-1.5">
                            <Label htmlFor="image">Select Categories</Label>
                            <div className='flex items-center gap-1.5'>
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={category.id}
                                            value={category.id}
                                            checked={selectedCategories.includes(category.id)}
                                            onCheckedChange={() => handleCheckboxChange(category.id)}
                                            {...register('categories')}
                                        />
                                        <label htmlFor={category.name} className="text-sm">{category.name}</label>
                                    </div>
                                ))}
                                {
                                    !categories.length && (
                                        <p className="text-red-500 text-sm">No categories available</p>
                                    )

                                }
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            variant="outline"
                            className="w-full sm:w-auto"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-accent-600 text-white hover:bg-accent-700"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Add Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
//   