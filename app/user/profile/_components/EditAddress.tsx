import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressSchemaType } from "@/schema/address.schema";
import MapComponent from "@/components/map";
import { useUpdateUserAddressMutation } from "@/redux/api/address.api";
import { useToast } from "@/providers/toast.provider";
import { ErrorEnum } from "@/enums/error.enum";
import {
  Input
} from "@/components/ui/input";
import {
  Button
} from "@/components/ui/button";
import {
  Label
} from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IAddress } from "@/types/address.type";

interface FormField {
  label: string;
  name: keyof AddressSchemaType;
}

const fields: FormField[] = [
  { label: "Country", name: "country" },
  { label: "City", name: "city" },
  { label: "Sub-city", name: "sub_city" },
  { label: "Street", name: "street" },
  { label: "Zip Code", name: "zip_code" },
];

interface Props {
  address: IAddress
}

export const EditAddress = ({ address }: Props) => {
  const [open, setOpen] = useState(false)
  const toast = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      ...address
    },
  });


  // Setting default values
  useEffect(() => {
    reset({
      ...address
    })
  }, [address])
  const [updateMyAddress, { isLoading }] = useUpdateUserAddressMutation();

  const onSubmit = (data: AddressSchemaType) => {
    const toastId = toast.loading("Adding your address...");
    try {
      updateMyAddress(data)
        .unwrap()
        .then(() => {
          toast.success(`Address saved successfully!`, { id: toastId });
          reset();
          setOpen(false)
        })
        .catch((error) => {
          console.error(`Error editing address:`, error);
          if (error.status === ErrorEnum.UNKOWN_ERROR) {
            toast.error(`Address editing failed. Please try again.`, { id: toastId });
          } else {
            toast.error(error.message || 'An error occurred please try again', { id: toastId });
          }
        });
    } catch (error) {
      console.error(`Error editing address:`, error);
      toast.error(`Address editing failed. Please try again.`, { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Address</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid xl:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input id={field.name} {...register(field.name)} />
              {errors[field.name] && (
                <p className="text-sm text-red-500">{errors[field.name]?.message}</p>
              )}
            </div>
          ))}

          <div onClick={e => e.preventDefault()} className="xl:col-span-2">
            <Card>
              <CardContent className="p-2">
                <MapComponent
                  markers={[{
                    id: "selected-location",
                    name: "You current Address",
                    location: [address.latitude, address.longitude],
                  }]}
                  zoom={13}
                  onSelectLocation={(lat, lng) => {
                    setValue('latitude', lat);
                    setValue('longitude', lng);
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              disabled
              {...register("latitude", { valueAsNumber: true })}
            />
            {errors.latitude && <p className="text-sm text-red-500">{errors.latitude.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              disabled
              {...register("longitude", { valueAsNumber: true })}
            />
            {errors.longitude && <p className="text-sm text-red-500">{errors.longitude.message}</p>}
          </div>


          <div className="xl:col-span-2 flex justify-end">
            <Button type="submit" disabled={isLoading}>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
