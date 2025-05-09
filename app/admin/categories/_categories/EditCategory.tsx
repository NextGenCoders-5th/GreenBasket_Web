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
import { toast } from 'sonner';
import { useUpdateCategoryMutation } from '@/redux/api/category.api';
import { ErrorEnum } from '@/enums/error.enum';
import { ICategory } from '@/types/category.type';
import { ClassName } from '@/enums/classnames.enum';

interface Props {
  categoryId: string;
  category: ICategory
}

export default function EditCategory({ categoryId, category }: Props) {


  // State to mange dialog open and close
  const [open, setOpen] = useState(false)

  // Getting  redux api method to create category
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string }>({
    defaultValues:{
      name: category.name,
    }
  });


  // useeffect to set default values
  useEffect(() => {
    reset({
      name: category.name,
    })
  }, [category])
  // }, [category])


  
  const onSubmit = async (data: { name: string }) => {

    const toastId = toast.loading('Saving category...');

    try {
      updateCategory({ categoryId, categoryData: data }).unwrap().then(() => {
        toast.success('Category edited successfully', { id: toastId })
        setOpen(false);
        reset();
      }).catch((error) => {
        if (error.status === ErrorEnum.UNKOWN_ERROR) {
          toast.error('Failed to edit category', { id: toastId })
        } else {
          toast.dismiss(toastId)
        }
      })
    } catch (error) {
      toast.dismiss(toastId)
      toast.error('Failed to edit category');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={` ${ClassName.BUTTON} px-2  py-0 bg-blue-500/90 hover:bg-blue-500`} title="Edit User">
          <Pencil className="w-3 h-3" />
          <span className="hidden sm:inline">Edit </span>
        </button>
      </DialogTrigger>

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
