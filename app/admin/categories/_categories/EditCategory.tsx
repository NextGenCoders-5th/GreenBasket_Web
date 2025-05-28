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
import { Loader2, Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useToast } from '@/providers/toast.provider';
import { useUpdateCategoryMutation } from '@/redux/api/category.api';
import { ErrorEnum } from '@/enums/error.enum';
import { ICategory } from '@/types/category.type';
import { ClassName } from '@/enums/classnames.enum';
import { TooltipWrapper } from '@/components/tooltip.wrapper';
import FileUploadInput from '@/app/_components/FileInput';

interface Props {
  categoryId: string;
  category: ICategory
}

export default function EditCategory({ categoryId, category }: Props) {

  // TOAST: toast instance to toast message
  const toast = useToast()

  // State to mange dialog open and close
  const [open, setOpen] = useState(false);


  const [image, setImage] = useState<File | null>(null)
  // Getting  redux api method to create category
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string }>({
    defaultValues: {
      name: category.name,
    }
  });


  // useeffect to set default values
  useEffect(() => {
    reset({
      name: category.name,
    })
  }, [category])

  const onSubmit = async (data: { name: string }) => {

    const toastId = toast.loading('Saving category...');

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      if (image) {
        formData.append('image', image);
      }
      updateCategory({ categoryId, categoryData: formData }).unwrap().then(() => {
        toast.success('Category edited successfully', { id: toastId })
        setOpen(false);
        reset();
      }).catch((error) => {
        if (error.status === ErrorEnum.UNKOWN_ERROR) {
          toast.error('Failed to save category', { id: toastId })
        } else {
          toast.error(error.message || 'Failed to save category', { id: toastId })
        }
      })
    } catch (error) {
      toast.error('Failed to save category', { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipWrapper
        title={`Edit Category`}
        className="bg-blue-600"
        arroClassName='bg-blue-600 fill-blue-600'
      >

        <DialogTrigger asChild>
          <button className={` ${ClassName.BUTTON}  bg-blue-600/90 hover:bg-blue-600`} title="Edit User">
            <Pencil className="w-4 h-4" />
          </button>
        </DialogTrigger>
      </TooltipWrapper>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name *</label>
            <Input {...register('name', { required: "Category name is required" })} placeholder="Enter category name" />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Image *</label>
            <FileUploadInput
              onFileSelect={(file) => {
                setImage(file);
              }}
              label='Upload Image'
              accept='image/*'
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
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
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
