'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useToast } from '@/providers/toast.provider';
import { CategoryFormData, categorySchema } from '@/schema/category.schema';
import { useCreateCategoryMutation } from '@/redux/api/category.api';
import { ErrorEnum } from '@/enums/error.enum';
import { TooltipWrapper } from '@/components/tooltip.wrapper';


export default function AddCategory() {

  // TOAST: toast to toast message
  const toast = useToast();

  // State to mange dialog open and close
  const [open, setOpen] = useState(false)

  // Getting  redux api method to create category
  const [addCategory, {isLoading, error}] = useCreateCategoryMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const imageFile = watch('image')?.[0];

  const onSubmit = async (data: CategoryFormData) => {

    const toastId = toast.loading('Creating category...');
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image[0]);

    try {
      addCategory(formData).unwrap().then(()=>{
        toast.success('Category created successfully', {id: toastId})
        setOpen(false);
        reset();
      }).catch((error) => {
        if(error.status === ErrorEnum.UNKOWN_ERROR){
          toast.error('Failed to create category', {id: toastId})
        } else {
          toast.error(error.message || 'Failed to create category', {id: toastId})
        }
      })
    } catch (error) {
      toast.error( 'Failed to create category', {id: toastId})
    } 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipWrapper 
        title={`Add Category`}
        className="bg-green-600"
        arroClassName='bg-green-600 fill-green-600'
        >
          
      <DialogTrigger asChild>
        <Button> <Plus/> Add </Button>
      </DialogTrigger>
        </TooltipWrapper>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name *</label>
            <Input {...register('name')} placeholder="Enter category name" />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category Image *</label>
            <Input type="file" accept="image/*" {...register('image')} />
            {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>}
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded"
              />
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
