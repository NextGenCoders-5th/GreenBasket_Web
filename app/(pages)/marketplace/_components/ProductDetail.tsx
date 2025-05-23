'use client';
import React, { useState } from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { IProduct } from '@/types/product.type';
import { ClassName } from '@/enums/classnames.enum';
import { ShoppingCart } from 'lucide-react';
import { DialogEnum, useDialog } from '@/contexts/dialog.context';

interface ProductDetailDrawerProps {
    products: IProduct[];
    initialIndex: number;
}

export default function ProductDetailDrawer({ products, initialIndex, }: ProductDetailDrawerProps) {


    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    
    const prevProduct: IProduct | null = products[currentIndex - 1];
    const nextProduct: IProduct | null = products[currentIndex + 1];
    const currentProduct: IProduct = products[currentIndex];
    const { open: openOrderProduct } = useDialog(`${DialogEnum.ORDER_PRODUCT}-${currentProduct.id}`);
    const { isOpen, close, open: openProductDetail } = useDialog(`${DialogEnum.PRODUCT_DETAIL}-${currentProduct.id}`);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    const navigate = (dir: 'prev' | 'next') => {
        setDirection(dir === 'prev' ? -1 : 1);
        setCurrentIndex((i) => (dir === 'prev' ? i - 1 : i + 1));
    };

    return (
        <Drawer open={isOpen} onClose={close} >
            <DrawerTrigger asChild>
                <button onClick={openProductDetail} className={`${ClassName.BUTTON} z-20 text-sm bg-green-600 text-white rounded-full px-2.5 py-2 hover:bg-green-700 transition`}>
                    Order Now
                </button>
            </DrawerTrigger>

            <DrawerContent className="max-w-8xl pb-3 mx-auto">
                <DrawerHeader>
                    <DrawerTitle className="text-2xl font-bold text-green-700 text-center">
                        Product Detail
                    </DrawerTitle>
                </DrawerHeader>

                <div className="relative mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Prev Product */}
                    <div className="bg-blue-50 relative border rounded-lg p-4">
                        {prevProduct && (
                            <>
                                <Image
                                    src={prevProduct.image_url || '/images/fruits.png'}
                                    alt={prevProduct.name}
                                    width={400}
                                    height={300}
                                    className="rounded-lg border object-cover w-full h-48"
                                />
                                <h2 className="text-xl font-bold mt-4 text-green-700">{prevProduct.name}</h2>
                                <p className="text-gray-600 mt-2">{prevProduct.description}</p>
                                <div className="mt-4">
                                    <p className="text-lg font-semibold text-green-600">
                                        ${prevProduct.price.toFixed(2)}{' '}
                                        {prevProduct.discount_price > 0 && (
                                            <span className="text-sm text-gray-400 line-through ml-2">
                                                ${prevProduct.discount_price.toFixed(2)}
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-500">Stock: {prevProduct.stock} {prevProduct.unit}</p>
                                    <Badge variant={prevProduct.status === 'ACTIVE' ? 'default' : 'destructive'} className="mt-2">
                                        {prevProduct.status}
                                    </Badge>
                                </div>
                            </>
                        )}
                        <div className="absolute inset-0 bg-gray-500/10 flex items-center justify-center backdrop-blur-sm rounded-lg">
                            {prevProduct ? (
                                <Button
                                    onClick={() => navigate('prev')}
                                    disabled={currentIndex === 0}
                                    variant="secondary"
                                    className="bg-green-600/90 text-white hover:bg-green-600"
                                >
                                    Previous
                                </Button>
                            )
                                : (
                                    <h3 className="text-sm font-medium text-blue-800">First Product</h3>
                                )
                            }
                        </div>
                    </div>

                    {/* Current Product - Sliding */}
                    <div className="relative overflow-hidden">
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={currentProduct.id}
                                custom={direction}
                                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="absolute w-full bg-white border rounded-lg shadow-md p-3"
                            >
                                <Image
                                    src={currentProduct.image_url || '/images/fruits.png'}
                                    alt={currentProduct.name}
                                    width={460}
                                    height={350}
                                    className="rounded-lg border object-fill w-full h-52"
                                />

                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-bold mt-4 text-green-700">{currentProduct.name}</h2>
                                        <   p className="text-gray-600 ">{currentProduct.description}</p>

                                        <div className="">
                                            <p className="text-lg font-semibold text-green-600">
                                                ${currentProduct.price.toFixed(2)}{' '}
                                                {currentProduct.discount_price > 0 && (
                                                    <span className="text-sm text-gray-400 line-through ml-2">
                                                        ${currentProduct.discount_price.toFixed(2)}
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-sm text-gray-500">Stock: {currentProduct.stock} {currentProduct.unit}</p>
                                            <p className="text-sm text-gray-500">Unit: {currentProduct.unit}</p>

                                            <Badge variant={currentProduct.status === 'ACTIVE' ? 'default' : 'destructive'} className="mt-2">
                                                {currentProduct.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 flex flex-col justify-end self-end border-t pt-4">
                                        {/* Buttons */}

                                        <div className="flex flex-col-reverse items-end gap-2">
                                            <Button
                                                variant="secondary"
                                                className=" py-0 text-xs cursor-pointer bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                            >
                                                <ShoppingCart />  Add to Cart
                                            </Button>
                                            <button onClick={() => {
                                                close();
                                                openOrderProduct();

                                            }} className={`${ClassName.BUTTON} z-20 text-sm bg-green-600 text-white rounded-full px-2.5 py-2 hover:bg-green-700 transition`}>
                                                Order Now
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={currentProduct.Vendor.logo_url || '/images/vendor.png'}
                                                alt={currentProduct.Vendor.business_name}
                                                width={50}
                                                height={50}
                                                className="rounded-full border border-gray-300"
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{currentProduct.Vendor.business_name}</p>
                                                <p className="text-xs text-gray-500">{currentProduct.Vendor.business_email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </motion.div>
                        </AnimatePresence>
                    </div>


                    {/* Next Product */}
                    <div className="bg-blue-50 relative border rounded-lg p-4">
                        {nextProduct && (
                            <>
                                <Image
                                    src={nextProduct.image_url || '/images/fruits.png'}
                                    alt={nextProduct.name}
                                    width={400}
                                    height={300}
                                    className="rounded-lg border object-cover w-full h-48"
                                />
                                <h2 className="text-xl font-bold mt-4 text-green-700">{nextProduct.name}</h2>
                                <p className="text-gray-600 mt-2">{nextProduct.description}</p>
                                <div className="mt-4">
                                    <p className="text-lg font-semibold text-green-600">
                                        ${nextProduct.price.toFixed(2)}{' '}
                                        {nextProduct.discount_price > 0 && (
                                            <span className="text-sm text-gray-400 line-through ml-2">
                                                ${nextProduct.discount_price.toFixed(2)}
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-500">Stock: {nextProduct.stock} {nextProduct.unit}</p>
                                    <Badge variant={nextProduct.status === 'ACTIVE' ? 'default' : 'destructive'} className="mt-2">
                                        {nextProduct.status}
                                    </Badge>
                                </div>
                            </>
                        )}
                        <div className="absolute inset-0 bg-gray-500/10 flex items-center justify-center backdrop-blur-sm rounded-lg">
                            {nextProduct ? (
                                <Button
                                    onClick={() => navigate('next')}
                                    disabled={currentIndex === products.length - 1}
                                    variant="secondary"
                                    className="bg-green-600/90 text-white hover:bg-green-600"
                                >
                                    Next
                                </Button>
                            )
                                :
                                (
                                    <h3 className="text-sm font-medium text-blue-800">Last Product</h3>
                                )
                            }
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
