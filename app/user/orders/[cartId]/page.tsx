'use client'
import LoadingPage from '@/components/loading.page'
import NetworkErrorSection from '@/components/network-error'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ClassName } from '@/enums/classnames.enum'
import { useGetCartItemQuery } from '@/redux/api/cart.api'
import { useAppSelector } from '@/redux/store'
import { ResponseError } from '@/types/general.types'
import { IUser } from '@/types/user.type'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import UserAddress from '../../profile/_components/user-address'
import { EditAddress } from '../../profile/_components/EditAddress'

const CartItemPage = () => {

  const { cartId } = useParams()
  const user = useAppSelector(state => state.auth.user) as IUser | null;
  const { data, isLoading, error } = useGetCartItemQuery(cartId as string, { skip: !cartId })
  if (isLoading) return <LoadingPage />
  if (error) return <NetworkErrorSection error={error as ResponseError} />

  const cart = data?.data.data

  if (!cart) return (
    <div className='text-center flex items-center flex-col  border border-red-500 justify-center h-[55vh] gap-1.5    w-full text-2xl font-semibold'>
      <p>Order not found</p>
      <Link href={"/marketplace"} className={`${ClassName.BUTTON_LINK} text-white hover:text-white hover:underline text-sm bg-accent-600/90 hover:bg-accent-600`}>
        Order Now <ArrowRight size={16} />
      </Link>
    </div>
  )

  const product = data.data.data.Product

  const cartItem = data.data.data

  return (
    <div className="max-w-6xl w-full  box-border mx-auto gap-x-2 gap-y-2 p-6">
      <div className="flex my-3  items-center md:col-span-2 ">
        <Button className='text-muted-foreground hover:text-muted-foreground' variant="outline" >
          <ArrowLeft size={16} className="mr-2" /> Back
        </Button>
        <h1 className='flex-grow text-center font-bold text-xl text-slate-600' >Order Details</h1>
      </div>

      <div className="flex items-stretch gap-2">

        <div className="div">
          <Card className="shadow-md border  gap-0 p-0 border-muted bg-background rounded-2xl">
            <CardHeader className="bg-gradient-to-r py-3 from-accent-500 to-accent-600 rounded-t-xl">
              <CardTitle className="text-xl text-slate-50">Order summary</CardTitle>
            </CardHeader>

            <CardContent className="p-6 grid grid-cols-1 gap-6 items-center">
              {/* Product Info */}
              <div className="flex items-center gap-6">
                <Avatar className="w-28 h-28 border">
                  <AvatarImage src={product.image_url} alt={product.name} />
                </Avatar>
                <div className="space-y-1 text-sm">
                  <h1 className='font-bold text-lg  underline text-accent'>Product information</h1>
                  <h2 className=" text-slate-600  font-semibold">Name: {product.name}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-2"> Description: {product.description}</p>
                  <p className="text-green-600 font-bold text-sm">Price: ${product.price} / {product.unit}</p>
                  <p className='p-2 py-1 bg-accent-100  rounded-xl'>Stock: {product.stock}</p>
                </div>
              </div>

              {/* Cart Info */}
              <div className="grid gap-2 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium text-foreground">Quantity:</span> {cartItem.quantity}
                </div>
                <div>
                  <span className="font-medium text-foreground">Item Price:</span> ${cartItem.price}
                </div>
                <div>
                  <span className="font-medium text-foreground">Subtotal:</span> ${cartItem.sub_total}
                </div>
                <div>
                  <span className="font-medium text-foreground">Cart Total:</span> ${cartItem.cart_total}
                </div>
                <div>
                  <span className="font-medium text-foreground">Status:</span>{" "}
                  <Badge variant="secondary" className="uppercase">{cartItem.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
        <div>
          <Card className="w-full max-w-md mx-auto p-0 bg-white shadow-lg rounded-xl border border-gray-200">
            <CardHeader className="bg-gradient-to-r py-3 from-accent-500 to-accent-600 rounded-t-xl">
              <CardTitle className="text-xl font-semibold text-white">
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {user ? <div className="space-y-2">
                <p className="flex items-center text-gray-700">
                  <span className="font-medium w-24 text-accent-600">Name:</span>
                  <span className="flex-1">{user.first_name} {user.last_name}</span>
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="font-medium w-24 text-accent-600">Email:</span>
                  <span className="flex-1">{user.email}</span>
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="font-medium w-24 text-accent-600">Phone:</span>
                  <span className="flex-1">{user.phone_number}</span>
                </p>
                <UserAddress />
                <EditAddress
                  address={user.address}
                />
              </div>
                : <span className='text-slate-500' >No User data</span>
              }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

}

export default CartItemPage
