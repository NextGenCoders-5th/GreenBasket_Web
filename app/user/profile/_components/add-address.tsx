import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressSchemaType } from "@/schema/address.schema";
import { Input } from "@/components/ui/input";
import MapComponent from "@/components/map";
import { useAddMyAddressMutation } from "@/redux/api/address.api";
import { useToast } from "@/providers/toast.provider";
import { TabsValueEnum } from "./profile-tabs";
import { ErrorEnum } from "@/enums/error.enum";


interface FormField {
  label: string;
  name: keyof AddressSchemaType
}

const fields: FormField[] = [
  { label: "Country", name: "country" },
  { label: "City", name: "city" },
  { label: "Sub-city", name: "sub_city" },
  { label: "Street", name: "street" },
  { label: "Zip Code", name: "zip_code" },
]


interface Props {
  setActiveTab: (tab: any) => void;
}
export const AddressForm = ({ setActiveTab }: Props) => {
  const toast = useToast()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddressSchemaType>({
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
  });

  const [addMyAddress, { isLoading, error }] = useAddMyAddressMutation()
  const onSubmit = (data: AddressSchemaType) => {
    const toastId = toast.loading("Adding your address...")
    try {
      addMyAddress(data)
        .unwrap()
        .then(() => {
          toast.success(`Product added successfully!`, { id: toastId });
          reset();
          setActiveTab(TabsValueEnum.ABOUT)
        })
        .catch((error) => {
          console.error(`Error adding product:`, error);
          if (error.status === ErrorEnum.UNKOWN_ERROR) {
            toast.error(`Product adding failed. Please try again.`, { id: toastId });
          }
          else {
            toast.error(error.message || 'An error occurred please try again', {
              id: toastId,
            });
          }
        });
    } catch (error) {
      console.error(`Error adding product:`, error);
      toast.error(`Product adding failed. Please try again.`, { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg  space-x-1  grid xl:grid-cols-2 mx-auto p-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium">{field.label}</label>
          <Input
            {...register(field.name)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
          />
          {errors[field.name] && (
            <p className="text-sm text-red-500">
              {errors[field.name]?.message}
            </p>
          )}
        </div>
      ))}

      <div onClick={e=>e.preventDefault()} className="flex h-full w-full flex-col pb-3 items-center justify-center">
        <MapComponent
          markers={[]}
          center={[11.5665, 37.3392]}
          zoom={13}
          onSelectLocation={(lat, lng) => {
            setValue('latitude', lat)
            setValue('longitude', lng)
          }}
        />

      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="Latitude">Latitude</label>
        <input
          step="any"
          disabled
          type="number"
          {...register("latitude", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
        />
        {errors.latitude && <p className="text-sm text-red-500">{errors.latitude.message}</p>}

      </div>
      <div>
      <label htmlFor="Logitude">Longitude</label>
        <input
          step="any"
          disabled
          type="number"
          {...register("longitude", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
        />
        {errors.longitude && <p className="text-sm text-red-500">{errors.longitude.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Save
      </button>
    </form>
  );
};
