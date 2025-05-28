"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Upload, User, Camera, CreditCard } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/providers/toast.provider"
import { useCompleteOnBoadrdingMutation } from "@/redux/api/user.api"
import { ErrorEnum } from "@/enums/error.enum"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const formSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  date_of_birth: z.date({
    required_error: "Date of birth is required",
  }),
  gender: z.string().min(1, "Please select your gender"),
  profile_picture: z
    .any()
    .refine((file) => file?.length == 1, "Profile picture is required")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported",
    ),
  idPhoto_front: z
    .any()
    .refine((file) => file?.length == 1, "Front ID photo is required")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported",
    ),
  idPhoto_back: z
    .any()
    .refine((file) => file?.length == 1, "Back ID photo is required")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported",
    ),
})

type FormData = z.infer<typeof formSchema>

interface FileUploadFieldProps {
  label: string
  description: string
  icon: React.ReactNode
  value: FileList | undefined
  onChange: (files: FileList | undefined) => void
  error?: string
}

function FileUploadField({ label, description, icon, value, onChange, error }: FileUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    onChange(files || undefined)

    if (files && files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(files[0])
    } else {
      setPreview(null)
    }
  }

  return (
    <div className="space-y-2 relative">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-muted-foreground/50 transition-colors">
        <div className="flex flex-col items-center justify-center space-y-2">
          {preview ? (
            <div className="relative">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={() => {
                  setPreview(null)
                  onChange(undefined)
                }}
              >
                ×
              </Button>
            </div>
          ) : (
            <>
              <div className="p-3 bg-muted rounded-full">{icon}</div>
              <div className="text-center">
                <p className="text-sm font-medium">{description}</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG, WEBP up to 5MB</p>
              </div>
            </>
          )}
          <input
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <Button type="button" variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

export default function CompleteOnBoarding() {
  const [open, setOpen] = useState(false)
  const toast = useToast()

  const [completeOnBoarding, { isLoading }] = useCompleteOnBoadrdingMutation() // Assuming you have a mutation hook for adding categories
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
    },
  })

  const onSubmit = (data: FormData) => {

    const toastId = toast.loading('Completing onboarding process...');
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('date_of_birth', data.date_of_birth.toISOString());
    formData.append('gender', data.gender);
    formData.append('profile_picture', data.profile_picture[0]);
    formData.append('idPhoto_front', data.idPhoto_front[0]);
    formData.append('idPhoto_back', data.idPhoto_back[0]);

    try {
      completeOnBoarding(formData).unwrap().then(() => {
        toast.success('Onboarding completed successfully', { id: toastId })
        setOpen(false);
        form.reset();
      }).catch((error) => {
        if (error.status === ErrorEnum.UNKOWN_ERROR) {
          toast.error('Failed to complete onboarding', { id: toastId })
        } else {
          toast.error(error.message || 'Failed to complete onboarding', { id: toastId })
        }
      })
    } catch (error) {
      toast.error('Failed to complete onboarding', { id: toastId })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 px-4 w-fit hover:bg-blue-700">
          <User className="w-4 h-4 mr-2" />
          Complete Onboarding
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-3xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">User Verification</DialogTitle>
          <DialogDescription>
            Complete your profile verification by providing the required information and uploading your identification
            documents.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full scrollbar-custom max-h-[76vh] p-4 overflow-y-auto">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Select your date of birth"
                          {...field}
                          value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Document Uploads */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Document Verification</h3>

              <FormField
                control={form.control}
                name="profile_picture"
                render={({ field }) => (
                  <FormItem>
                    <FileUploadField
                      label="Profile Picture *"
                      description="Upload your profile picture"
                      icon={<Camera className="w-6 h-6" />}
                      value={field.value}
                      onChange={field.onChange}
                      error={form.formState.errors.profile_picture?.message as string}
                    />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="idPhoto_front"
                  render={({ field }) => (
                    <FormItem>
                      <FileUploadField
                        label="ID Front Side *"
                        description="Upload front side of your ID"
                        icon={<CreditCard className="w-6 h-6" />}
                        value={field.value}
                        onChange={field.onChange}
                        error={form.formState.errors.idPhoto_front?.message as string}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="idPhoto_back"
                  render={({ field }) => (
                    <FormItem>
                      <FileUploadField
                        label="ID Back Side *"
                        description="Upload back side of your ID"
                        icon={<CreditCard className="w-6 h-6" />}
                        value={field.value}
                        onChange={field.onChange}
                        error={form.formState.errors.idPhoto_back?.message as string}
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Submitting..." : "Submit Verification"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
