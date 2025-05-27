"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { IProduct } from "@/types/product.type"
import { ClassName } from "@/enums/classnames.enum"
import { DialogEnum, useDialog } from "@/contexts/dialog.context"
import { useCreateCartItemMutation } from "@/redux/api/cart-item.api"
import { ErrorEnum } from "@/enums/error.enum"
import { useToast } from "@/providers/toast.provider"
import { ShoppingCart, Plus, Minus, Package, Store, Mail, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect } from "react"

const schema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1"),
  productId: z.string(),
})

type FormData = z.infer<typeof schema>

interface AddToCartDialogProps {
  product: IProduct
}

export default function AddToCartDialog({ product }: AddToCartDialogProps) {
  const toast = useToast()
  const { open, isOpen, close } = useDialog(`${DialogEnum.ORDER_PRODUCT}-${product.id}`)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
      productId: product.id,
    },
  })

  const [orderProduct, { isLoading }] = useCreateCartItemMutation()
  const quantity = watch("quantity")
  const unitPrice = product.discount_price && product.discount_price > 0 ? product.discount_price : product.price
  const total = quantity * unitPrice
  const hasDiscount = product.discount_price && product.discount_price > 0


  useEffect(() => {
    reset({
      quantity: 1,
      productId: product.id,
    })

  }, [isOpen, product.id, reset]);
  const onSubmit = (data: FormData) => {
    const errorMessage = `Can't order product, please try again later`
    const toastId = toast.loading("Adding product to cart...")
    try {
      orderProduct(data)
        .unwrap()
        .then(() => {
          toast.success("Product added to cart successfully", { id: toastId })
          close()
        })
        .catch((error) => {
          if (error.status === ErrorEnum.UNKOWN_ERROR) {
            toast.error(errorMessage, { id: toastId })
          } else {
            toast.error(error.data.message || errorMessage, { id: toastId })
          }
        })
    } catch (error) {
      console.error("Error adding product to cart:", error)
      toast.error(errorMessage, { id: toastId })
    }
  }

  const increase = () => {
    if (quantity < product.stock) {
      setValue("quantity", quantity + 1)
    }
  }

  const decrease = () => {
    if (quantity > 1) {
      setValue("quantity", quantity - 1)
    }
  }



  return (
    <Dialog open={isOpen}  onOpenChange={(value) => (value ? open() : close())}>
      <DialogTrigger asChild>
        <Button
          className={`${ClassName.BUTTON} bg-accent-500/90 hover:bg-accent-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg px-6 py-2.5 font-medium`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg space-y-2.5  mx-auto p-0 overflow-hidden">
        <div className="bg-gradient-to-br my-0 from-accent-50 to-green-50 p-6 border-b">
          <DialogHeader className="my-0">
            <DialogTitle className="text-2xl font-bold text-accent-600 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Add to Cart
            </DialogTitle>
          </DialogHeader>
        </div>

        <ScrollArea className=" h-[70vh] p-8 scollbar-custom space-y-6">
          {/* Product Info */}
          <div className="flex gap-4">
            <div className="relative">
              <Image
                src={product.image_url || "/images/fruits.png"}
                alt={product.name}
                width={100}
                height={100}
                className="rounded-xl border-2 border-gray-100 object-cover shadow-sm"
              />
              {hasDiscount && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1">Sale</Badge>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{product.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

              <div className="flex items-center gap-2">
                {hasDiscount ? (
                  <>
                    <span className="text-lg font-bold text-accent-600">{product.discount_price?.toFixed(2)} ETB</span>
                    <span className="text-sm text-gray-400 line-through">{product.price.toFixed(2)} ETB</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-accent-600">{product.price.toFixed(2)}ETB</span>
                )}
                <span className="text-sm text-gray-500">/ {product.unit}</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  <span>Stock: {product.stock}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Vendor Info */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Store className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-700">{product.Vendor?.business_name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Mail className="w-3 h-3" />
              <span>{product.Vendor?.business_email}</span>
            </div>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={decrease}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-full p-0 border-2"
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <div className="flex-1">
                  <Input
                    type="number"
                    {...register("quantity", { valueAsNumber: true })}
                    className="text-center text-lg font-semibold h-10 border-2 focus:border-accent-500"
                    min={1}
                    max={product.stock}
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={increase}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10 rounded-full p-0 border-2"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {errors.quantity && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <Separator />

            {/* Total */}
            <div className="bg-accent-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Unit Price:</span>
                <span>{unitPrice.toFixed(2)} ETB</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Quantity:</span>
                <span>{quantity}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold text-accent-700">
                <span>Total:</span>
                <span>{total.toFixed(2)} ETB</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              disabled={isLoading || product.stock === 0}
              type="submit"
              className="w-full bg-accent-500/90 hover:bg-accent-5500 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving.
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
