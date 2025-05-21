'use client';
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const data = [
  { month: "Jan", orders: 60, sales: 20 },
  { month: "Feb", orders: 20, sales: 60 },
  { month: "Mar", orders: 40, sales: 80 },
  { month: "Apr", orders: 50, sales: 40 },
  { month: "May", orders: 70, sales: 60 },
  { month: "Jun", orders: 90, sales: 30 },
  { month: "Jul", orders: 50, sales: 30 },
  { month: "Aug", orders: 120, sales: 160 },
  { month: "Sep", orders: 100, sales: 80 },
  { month: "Oct", orders: 160, sales: 60 },
  { month: "Nov", orders: 110, sales: 70 },
  { month: "Dec", orders: 115, sales: 75 },
];

const topProducts = [
  { name: "Leaves", price: "$49", category: "Home Decor", sales: "15,064 Sales", image: "/images/leafy.png" },
  { name: "Seaconal", price: "$799", category: "Fashion", sales: "14,862 Sales", image: "/images/seasonal.png" },
  { name: "Vegitables", price: "$99", category: "Essentials", sales: "20,124 Sales", image: "/images/vegitables.png" },
  { name: "Fruits", price: "$320", category: "Fashion", sales: "18,673 Sales", image: "/images/fruits.png" },
  { name: "Frruits1", price: "$1,299", category: "Electronics", sales: "15,233 Sales", image: "/images/fruits1.png" },
];

export default function RevenueDashboard() {
  return (
    <div className="p-4 md:p-6 h-fit max-h-[85vh] overflow-auto bg-gradient-to-r from-green-300/10 to-green-400/20  grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-4 bg-white p-3" >
        <div className="flex items-center justify-between">
          <h2 className="text-xl  text-slate-700 font-semibold">Revenue Overview</h2>
          <Tabs defaultValue="yearly">
            <TabsList className="bg-accent-100 rounded-xl">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Separator className="mb-3" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="pt-4 bg-accent-200/20 border border-accent-600  text-accent-600">
            <CardContent className="flex items-center relative justify-between">

              <Image
                src="/images/order.png"
                alt="Order Icon"
                width={300}
                height={50}
                objectFit="cover"
                className="w-16 h-16 absolute right-2 top-0"
              />
              <div className="flex flex-col items-start z-10">
                <p className="text-sm text-slate-800">Total Orders</p>
                <p className="text-2xl font-extrabold">684</p>
              </div>
            </CardContent>
          </Card>
          <Card className="pt-4  bg-accent-200/20  border border-accent-600  text-accent-600">
            <CardContent className="flex items-center  justify-between relative">

              <Image
                src="/images/revenue.png"
                alt="Revenue Icon"
                width={300}
                height={50}
                objectFit="cover"
                className="w-16 h-16 absolute right-2 top-0"
              />
              <div className="flex flex-col items-start z-10">
                <p className="text-sm text-slate-800">Total Revenue</p>
                <p className="text-2xl font-extrabold">$12,345</p>
              </div>
            </CardContent>
          </Card>
          <Card className="pt-4  bg-accent-200/20  border border-accent-600  text-accent-600">
            <CardContent className="flex items-center justify-between relative">

              <Image
                src="/images/profit.png"
                alt="Profit Icon"
                width={300}
                height={50}
                objectFit="cover"
                className="w-16 h-16 absolute right-2 top-0"
              />
              <div className="flex flex-col items-start z-10">
                <p className="text-sm text-slate-800">Total Profit</p>
                <p className="text-2xl font-extrabold">$3,456</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-transparent">
          <CardHeader>
            <CardTitle className="font-semibold text-slate-700">Orders vs Sales</CardTitle>
          </CardHeader>
          <CardContent className="relative h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" barSize={20} fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="sales" stroke="#08c20b" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      <Card className="border  flex flex-col border-accent-600">
        <CardHeader className=" flex-1 self-stretch ">
          <CardTitle className="font-semibold">Top Selling Products</CardTitle>
        </CardHeader>
        <Separator className="text-accent-600" />
        <CardContent className="mt-0 border-accent-600">
          <ScrollArea className="h-[400px] pr-2">
            <div className="space-y-2">
              {topProducts.map((product, index) => (
                <>
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={product.image} alt={product.name} />
                    </Avatar>
                    <div>
                      <p className="font-medium leading-none">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{product.price}</p>
                    <p className="text-sm text-muted-foreground">{product.sales}</p>
                  </div>
                </div>
                <Separator className="text-accent-600" />
                </>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}