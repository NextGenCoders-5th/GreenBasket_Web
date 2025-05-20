'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AddCategory from './_categories/AddCategory';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '@/redux/api/category.api';
import EditCategory from './_categories/EditCategory';
import DeleteFeature, { FeatureDeleteActionType } from '@/components/modals/DeleteFetureDialog';
import Image from 'next/image';

export default function CategoriesPage() {

  const { data, isLoading, error } = useGetCategoriesQuery("")
  const categories = data?.data.data || []

  return (
    <div className="p-4 w-full max-w-7xl mx-auto">
      <div className="flex w-full items-center shadow-lg p-2 shadow-green-300/25 justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <AddCategory />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No categories found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='min-w-[300px]'
            >
              <Card className="hover:shadow-lg space-y-0 pt-0 transition duration-300">
                <CardContent className='min-w-[300px] p-0 m-0'>
                <CardHeader className='bg-green-500 py-3 m-0 rounded-t-xl text-white'>
                  <CardTitle className="text-center">{category.name}</CardTitle>
                </CardHeader>
                  <Image
                    width={300}
                    height={200}
                    src={category.image_url}
                    alt={category.name}
                    className="min-w-[300px] h-40 object-cover"
                  />
                </CardContent>
                <CardFooter className='flex justify-end gap-2.5 items-center rounded-b-xl '>
                  <EditCategory category={category} categoryId={category.id} />
                  <DeleteFeature
                    feature='category'
                    featureId={category.id}
                    useDelete={useDeleteCategoryMutation as FeatureDeleteActionType}
                    redirectUrl='/admin/categories'
                    iconOnly />


                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
