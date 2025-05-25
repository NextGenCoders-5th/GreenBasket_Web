import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormData, productSchema } from '@/schema/product.schema';
import { useCreateProductMutation, useUpdateProductMutation } from '@/redux/api/product.api';
import { useToast } from '@/providers/toast.provider';
import { ErrorEnum } from '@/enums/error.enum';
import { Checkbox } from '@/components/ui/checkbox';
import { useGetCategoriesQuery } from '@/redux/api/category.api';
import DropDownInput from '@/app/_components/DropdownInput';
import { product_units } from './data';
import { IProduct } from '@/types/product.type';
import { Pencil, Plus } from 'lucide-react';
import FileUploadInput from '@/app/_components/FileInput';
import { TooltipWrapper } from '@/components/tooltip.wrapper';

interface Props {
    product?: IProduct
}

export default function AddProductDialog({ product }: Props) {
    const [open, setOpen] = useState(false);

    const editMode = Boolean(product);
    // Getting categories
    const { data } = useGetCategoriesQuery('', { skip: !open });
    const categories = data?.data.data || [];

    const [image, setImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState("");
    const toast = useToast();
    // Getting redux api instance to create product
    const [createProduct, { isLoading: creating }] = useCreateProductMutation();
    const [saveProduct, { isLoading: saving }] = useUpdateProductMutation();

    // Integrating Zod with React Hook Form
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: 'No description',
            price: 0,
            discount_price: 0,
            unit: '',
            stock: 0,
            categories: '',
            image: "",
        }
    });

    useEffect(() => {
        reset({
            name: product?.name,
            description: product?.description,
            price: product?.price,
            discount_price: product?.discount_price,
            unit: product?.unit,
            stock: product?.stock,
            image: product?.image,
            categories: product?.categories?.map((category) => typeof category === 'string' ? category : category.id).join(',') || '',
        });
    }, [product]);

    const selectedCategories = watch('categories', '') as string; // Watch the selected categories

    const handleCheckboxChange = (category: string) => {
        const currentSelection = [...(selectedCategories || '').split(',')]; // Get the current selection
        if (currentSelection.includes(category)) {
            // If category is already selected, remove it
            setValue(
                'categories',
                currentSelection.filter((item: string) => item !== category).join(',')
            );
        } else {
            setValue('categories', [...currentSelection, category].join(','));
        }
    };

    const onSubmit = (data: ProductFormData) => {
        if (!editMode && (!data.image || data.image.length === 0)) {
            setImageError('Product image is required');
            return;
        }
        else {
            setImageError('');
        }
        const toastId = toast.loading(`${editMode ? 'Saving' : 'Creating'} product...`);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price.toString());
        formData.append('discount_price', data.discount_price?.toString() || '');
        formData.append('unit', data.unit);
        formData.append('stock', data.stock.toString());
        data.image && formData.append('image', data.image[0]);
        const categories = data.categories?.split(',') || [];
        data.categories && formData.append('categories', JSON.stringify(categories.filter(Boolean)));

        try {
            const action = editMode ? saveProduct : createProduct;
            const payload = editMode
                ? { productId: product?.id!, productData: formData }
                : formData;
            action(payload)
                .unwrap()
                .then(() => {
                    toast.success(`Product ${editMode ? 'saved' : 'added'} successfully!`, { id: toastId });
                    reset();
                    setOpen(false);
                })
                .catch((error) => {
                    console.error(`Error ${editMode ? 'saving' : 'adding'} product:`, error);
                    if (error.status === ErrorEnum.UNKOWN_ERROR) {
                        toast.error(`Product ${editMode ? 'saving' : 'adding'} failed. Please try again.`, { id: toastId });
                    }
                    else {
                        toast.error(error.message || 'An error occurred please try again', {
                            id: toastId,
                        });
                    }
                });
        } catch (error) {
            console.error(`Error ${editMode ? 'saving' : 'adding'} product:`, error);
            toast.error(`Product ${editMode ? 'saving' : 'adding'} failed. Please try again.`, { id: toastId });
        }
    };

    const prepareSubmitBtnText = () => {
        if (creating || saving) {
            return saving ? 'Saving...' : 'Adding...';
        }
        return editMode ? 'Save Product' : 'Add Product';
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <TooltipWrapper
                title={editMode ? 'Edit Product' : 'Add Product'}
                className={editMode ? 'bg-blue-600' : 'bg-green-500'}
                arroClassName={editMode ? 'bg-blue-600 fill-blue-600' : 'bg-green-500 fill-green-500'}
            >

                <DialogTrigger asChild>
                    {
                        editMode ? (
                            <span className='text-blue-600 text-sm sm:text-base border border-blue-600 bg-blue-500/10  flex items-center gap-1 cursor-pointer hover:text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors duration-300'>
                                <Pencil size={14}  /> 
                            </span>
                        ) : (
                            <span className='bg-green-600 text-sm sm:text-base flex items-center gap-1 cursor-pointer text-white py-2 px-3 rounded-md hover:bg-green-700 transition-colors duration-300'>
                                <Plus size={18} />  Product
                            </span>
                        )
                    }
                </DialogTrigger>
            </TooltipWrapper>
            <DialogContent className='max-w-lg text-slate-700'>
                <DialogHeader>
                    <DialogTitle className='text-green-700'>{editMode ? 'Edit' : 'Add New'} Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-1'>
                            <Label htmlFor='name'>Name *</Label>
                            <Input id='name' {...register('name')} />
                            {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor='price'>Price *</Label>
                            <Input type='number' step='0.01' id='price' {...register('price', { valueAsNumber: true })} />
                            {errors.price && <p className='text-red-500 text-sm'>{errors.price.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor='description'>Description *</Label>
                            <Textarea id='description' {...register('description')} />
                            {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor='unit'>Unit *</Label>
                            <DropDownInput
                                options={product_units}
                                setValue={(value) => setValue('unit', value)}
                                placeholder='Select unit'
                                className='w-full'
                                defaultValue={product?.unit}
                            />
                            {errors.unit && <p className='text-red-500 text-sm'>{errors.unit.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor='discount_price'>Discount Price</Label>
                            <Input type='number' step='0.01' id='discount_price' {...register('discount_price', { valueAsNumber: true })} />
                            {errors.discount_price && <p className='text-red-500 text-sm'>{errors.discount_price.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor='stock'>Stock *</Label>
                            <Input type='number' id='stock' {...register('stock', { valueAsNumber: true })} />
                            {errors.stock && <p className='text-red-500 text-sm'>{errors.stock.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor='image'>Image *</Label>
                            <FileUploadInput
                                onFileSelect={(file) => {
                                    setImage(file);
                                    setValue('image', file ? [file] : []);
                                }}
                                label='Upload Image'
                                accept='image/*'
                            />
                            {
                                (image || product?.image_url) && (
                                    <div className='mt-2'>
                                        <img
                                            src={image ? URL.createObjectURL(image) : product?.image_url}
                                            alt='Product'
                                            className='w-24 h-24 object-cover rounded-md shadow-sm'
                                        />
                                    </div>
                                )
                            }
                            {!imageError && <p className='text-red-500 text-sm'>{imageError}</p>}
                        </div>


                        <div className='space-y-2 mt-1.5'>
                            <Label htmlFor='image'>Select Categories</Label>
                            <div className='flex items-center gap-1.5'>
                                {categories?.map((category) => (
                                    <div key={category.id} className='flex items-center space-x-2'>
                                        <Checkbox
                                            id={category.id}
                                            value={category.id}
                                            checked={selectedCategories.includes(category.id) || product?.categories?.some((cat) => (typeof cat === 'string' ? cat : cat.id) === category.id)}
                                            onCheckedChange={() => handleCheckboxChange(category.id)}
                                            {...register('categories')}
                                        />
                                        <label htmlFor={category.name} className='text-sm'>{category.name}</label>
                                    </div>
                                ))}
                                {
                                    !categories.length && (
                                        <p className='text-red-500 text-sm'>No categories available</p>
                                    )

                                }
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type='reset'
                            onClick={() => setOpen(false)}
                            variant='outline'
                            className='w-full sm:w-auto'
                            disabled={creating || saving}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            className='w-full text-sm sm:w-auto bg-accent-600 text-white hover:bg-accent-700'
                            disabled={creating || saving}
                        >
                            {prepareSubmitBtnText()}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
//   