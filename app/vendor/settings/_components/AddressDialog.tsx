"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { MapPin } from "lucide-react"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { AddressForm } from "@/app/user/profile/_components/add-address";

const addressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  sub_city: z.string().min(1, "Sub city is required"),
  street: z.string().min(1, "Street address is required"),
  zip_code: z.string().min(1, "Zip code is required"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
})

type AddressFormValues = z.infer<typeof addressSchema>

interface AddressDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  address?: any
  onSave?: () => void
}

export default function AddressDrawer({ open, onOpenChange, address , onSave}: AddressDrawerProps) {

  const editMode = !!address;
  return (
    <Drawer  open={open} onOpenChange={onOpenChange}>
    <DrawerContent className="max-w-8xl h-[90vh] pb-3 mx-auto">
        <DrawerHeader className="flex flex-col items-center gap-2">
          <DrawerTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            {editMode ? "Edit Address" : "Add New Address"}
          </DrawerTitle>
          <DrawerDescription>
            {editMode ? "Update the address information below." : "Enter the address details for this vendor."}
          </DrawerDescription>
        </DrawerHeader>

        <AddressForm  onSave={onSave} withHeader={false}/>
      </DrawerContent>
    </Drawer>
  )
}
