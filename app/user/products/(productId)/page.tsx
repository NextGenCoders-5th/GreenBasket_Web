'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IProduct } from '@/types/product.type';

const schema = z.object({
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  productId: z.string(),
});

type FormData = z.infer<typeof schema>;

interface AddToCartDialogProps {
  product: IProduct;
}

export default function AddToCartDialog({ product }: AddToCartDialogProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
      productId: product.id,
    },
  });

  const quantity = watch('quantity');
  const unitPrice = product.discount_price && product.discount_price > 0 ? product.discount_price : product.price;
  const total = quantity * unitPrice;

  const onSubmit = (data: FormData) => {
    console.log('Add to cart payload:', data);
    setOpen(false);
  };

  const increase = () => {
    if (quantity < product.stock) {
      setValue('quantity', quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setValue('quantity', quantity - 1);
    }
  };

  return (
 

        <div className="flex flex-col gap-4">
          {/* Product Info */}
          <div className="flex items-center gap-4">
            <Image
              src={product.image_url || '/images/fruits.png'}
              alt={product.name}
              width={120}
              height={120}
              className="rounded-lg border object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-1">{product.description}</p>
              <p className="text-green-700 font-bold">
                ${unitPrice.toFixed(2)} / {product.unit}
              </p>
              <p className="text-xs text-gray-400">Stock: {product.stock}</p>
              <p className="text-xs text-gray-500 mt-1">Vendor: {product.Vendor.business_name}</p>
              <p className="text-xs text-gray-400">{product.Vendor.business_email}</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" onClick={decrease}>-</Button>
              <Input
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                className="w-16 text-center"
              />
              <Button type="button" variant="outline" onClick={increase}>+</Button>
            </div>
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity.message}</p>
            )}

            {/* Total */}
            <div className="text-right font-medium text-green-700">
              Total: ${total.toFixed(2)}
            </div>

            <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
              Confirm Add to Cart
            </Button>
          </form>
        </div>
  );
}
