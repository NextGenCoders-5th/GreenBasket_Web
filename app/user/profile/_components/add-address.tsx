"use client"

import type React from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { MapPin, Globe, Building2, Navigation, Hash, Save, Loader2, Map, Target } from "lucide-react"
import { addressSchema, type AddressSchemaType } from "@/schema/address.schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import MapComponent from "@/components/map"
import { useAddAddressMutation } from "@/redux/api/address.api"
import { useToast } from "@/providers/toast.provider"
import { TabsValueEnum } from "./profile-tabs"
import { ErrorEnum } from "@/enums/error.enum"
import type { IAddress } from "@/types/address.type"
import type { IUser } from "@/types/user.type"
import { useAppSelector } from "@/redux/store"
import { Role } from "@/enums/role.enum"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Props {
  setActiveTab?: (tab: any) => void
  address?: IAddress
  withHeader?: boolean
  onSave?: () => void
}

export const AddressForm = ({ setActiveTab, address, withHeader = true, onSave }: Props) => {
  const toast = useToast()
  const user = useAppSelector((state) => state.auth.user) as IUser | null

  const form = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: "",
      city: "",
      sub_city: "",
      street: "",
      zip_code: "",
      latitude: 0,
      longitude: 0,
    },
  })

  const { setValue, reset, watch } = form
  const watchedLatitude = watch("latitude")
  const watchedLongitude = watch("longitude")

  useEffect(() => {
    if (address) {
      reset({
        ...address,
      })
    }
  }, [address, reset])

  const [addMyAddress, { isLoading }] = useAddAddressMutation()

  const onSubmit = (data: AddressSchemaType) => {
    const toastId = toast.loading("Adding your address...")
    if (!user) {
      toast.error("You must be logged in to add an address", { id: toastId })
      return
    }
    const type = user.role === Role.VENDOR ? "vendor" : "user"
    try {
      addMyAddress({ data, type })
        .unwrap()
        .then(() => {
          toast.success("Address added successfully!", { id: toastId })
          reset()
          setActiveTab?.(TabsValueEnum.ABOUT)
          onSave?.()
        })
        .catch((error) => {
          console.error("Error adding address:", error)
          if (error.status === ErrorEnum.UNKOWN_ERROR) {
            toast.error("Address adding failed. Please try again.", { id: toastId })
          } else {
            toast.error(error.message || "An error occurred please try again", {
              id: toastId,
            })
          }
        })
    } catch (error) {
      console.error("Error adding address:", error)
      toast.error("Address adding failed. Please try again.", { id: toastId })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        {withHeader && <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            {address ? "Update Address" : "Add Your Address"}
          </h1>
          <p className="text-slate-600 text-lg">
            {address ? "Update your location information" : "Complete your profile by adding your address information"}
          </p>
        </div>}

        <Form {...form}>
          <ScrollArea className="h-[calc(55vh)]">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Address Information Card */}
                <div className="xl:col-span-2">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader className="pb-6">
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        Address Information
                      </CardTitle>
                      <p className="text-slate-600">Enter your complete address details below</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {fields.map((field, index) => (
                          <motion.div
                            key={field.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <FormField
                              control={form.control}
                              name={field.name}
                              render={({ field: formField }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    {field.icon}
                                    {field.label}
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={field.placeholder}
                                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                                      {...formField}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        ))}
                      </div>

                      <Separator className="my-6" />

                      {/* Coordinates Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Navigation className="w-5 h-5 text-blue-500" />
                          <h3 className="text-lg font-semibold text-slate-800">Geographic Coordinates</h3>
                          <Badge variant="secondary" className="ml-2">
                            Auto-filled from map
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="latitude"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                  <Target className="w-4 h-4 text-green-500" />
                                  Latitude
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="any"
                                    disabled
                                    className="h-12 bg-slate-50 border-slate-200 font-mono text-sm"
                                    placeholder="Select location on map"
                                    {...field}
                                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="longitude"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                  <Target className="w-4 h-4 text-green-500" />
                                  Longitude
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="any"
                                    disabled
                                    className="h-12 bg-slate-50 border-slate-200 font-mono text-sm"
                                    placeholder="Select location on map"
                                    {...field}
                                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />
                        </div>

                        {(watchedLatitude !== 0 || watchedLongitude !== 0) && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 bg-green-50 border border-green-200 rounded-lg"
                          >
                            <div className="flex items-center gap-2 text-green-700">
                              <Target className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Location selected: {watchedLatitude.toFixed(6)}, {watchedLongitude.toFixed(6)}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Map Card */}
                <div className="xl:col-span-1">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl h-fit">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Map className="w-5 h-5 text-green-600" />
                        </div>
                        Select Location
                      </CardTitle>
                      <p className="text-slate-600 text-sm">Click on the map to set your exact location</p>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="rounded-xl overflow-hidden border-2 border-slate-200 shadow-lg">
                          <MapComponent
                            markers={[]}
                            center={[11.5665, 37.3392]}
                            zoom={13}
                            onSelectLocation={(lat, lng) => {
                              setValue("latitude", lat)
                              setValue("longitude", lng)
                            }}
                          />
                        </div>

                        {/* Map Instructions */}
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-blue-700">
                              <p className="font-medium mb-1">How to use:</p>
                              <p>
                                Click anywhere on the map to automatically set your latitude and longitude coordinates.
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mt-2">
                    <CardContent className="mt-4">
                      <p className="text-sm text-slate-500">
                        Note: Ensure your address is accurate for better service delivery.
                      </p>
                    </CardContent>
                    <CardContent className="pt-0">
                      <p className="text-xs text-slate-400">
                        By adding your address, you agree to our{" "}
                        <a href="/terms" className="text-blue-500 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-blue-500 hover:underline">
                          Privacy Policy
                        </a>
                      </p>
                    </CardContent>
                    <CardContent className="pt-0">
                      <p className="text-xs text-slate-400">
                        If you have any questions, please contact our support team.
                      </p>
                    </CardContent>
                    <CardContent className="pt-0">
                      {/* Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex justify-center pt-2"
                      >
                        <Button
                          type="submit"
                          disabled={isLoading}
                          size="lg"
                          className="bg-gradient-to-r from-accent-500/90 to-accent-500 hover:from-accent-600/90 hover:to-accent-600 cursor-pointer text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              {address ? "Updating..." : "Saving..."}
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5 mr-2" />
                              {address ? "Update Address" : "Save Address"}
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </div>
              </div>


            </form>
          </ScrollArea>
        </Form>
      </motion.div>
    </div>
  )
}

const fields: { label: string; name: keyof AddressSchemaType; icon: React.ReactNode; placeholder: string }[] = [
  {
    label: "Country",
    name: "country",
    icon: <Globe className="w-4 h-4 text-blue-500" />,
    placeholder: "e.g., Ethiopia",
  },
  {
    label: "City",
    name: "city",
    icon: <Building2 className="w-4 h-4 text-green-500" />,
    placeholder: "e.g., Addis Ababa",
  },
  {
    label: "Sub-city",
    name: "sub_city",
    icon: <MapPin className="w-4 h-4 text-purple-500" />,
    placeholder: "e.g., Bole",
  },
  {
    label: "Street Address",
    name: "street",
    icon: <MapPin className="w-4 h-4 text-red-500" />,
    placeholder: "e.g., Bole Road, Near Edna Mall",
  },
  {
    label: "Zip Code",
    name: "zip_code",
    icon: <Hash className="w-4 h-4 text-orange-500" />,
    placeholder: "e.g., 1000",
  },
]
