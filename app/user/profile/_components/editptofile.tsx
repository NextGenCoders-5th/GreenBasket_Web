'use client';
import { Role } from "@/enums/role.enum"
import { useToast } from "@/providers/toast.provider"
import { useUpdateUserMutation } from "@/redux/api/user.api"
import { useAppSelector } from "@/redux/store"
import { UserFormData } from "@/schema/user.schema"
import { IUser } from "@/types/user.type"
import { FilePlus } from "lucide-react"
import type React from "react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"

interface Props{
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}
export default function EdiProfile({setActiveTab}:Props) {
  const toast = useToast();
  const user = useAppSelector ((state) => state.auth.user) as unknown as IUser | null
  const [profileImage, setProfileImage] = useState<string>(
    "https://laravelui.spruko.com/zynix/build/assets/images/faces/2.jpg"
  )


  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {register, handleSubmit, formState:{errors, isDirty}, reset} = useForm<UserFormData>({
    defaultValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
      phoneNumber: user?.phone_number || "",
    },
  });

  
  const [profileChanged, setProfileChanged] = useState(false)

  const [updateProfile] = useUpdateUserMutation();

  const onSubmit =  async(data: UserFormData) => {
    setIsSubmitting(true)
    try {
      await updateProfile({userId:user?.id || "" , userData: {
        ...data,
        role : user?.role as Role,
      }}).unwrap();
      toast.success("Profile updated successfully")
      setIsSubmitting(false)
      setActiveTab("about")
    } catch (error) {
      console.log("@@Error updating profile", error)
      toast.error("Error occurred while updating profile")
      setIsSubmitting(false)
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string)
          setProfileChanged(true)
        }
      }
      reader.readAsDataURL(file)
    }
  }



  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setProfileImage("/placeholder.svg?height=300&width=300")
  }

  const handleUpdateProfilePicture = async () => {
    toast.success("Profile picture updated successfully")
  }

  return (
    <div  className="p-6 bg-white dark:bg-gray-800">
      <div className="flex w-full justify-between items-center mb-6 ">
        <h1 className="sm:text-xl text-base font-semibold">Account Settings :</h1>
        {isDirty && <div>
          <button onClick={()=>reset()} className="bg-red-600/90 text-white px-3 py-1.5 rounded text-sm">Restore <span className="hidden sm:inline">Changes</span> </button>
        </div>}
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <img
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <p>Profile picture</p>
              <div className="flex gap-2">
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg,image/png,image/gif"
                    className="hidden"
                  />
                  <div className="flex sm:items-center gap-1 flex-col sm:flex-row items-stretch">

                  <button
                    disabled={isSubmitting}
                    onClick={triggerFileInput}
                    className="bg-green-600/90 text-white px-2 py-1 rounded text-xs flex items-center gap-1 disabled:cursor-not-allowed"
                  >
                    <FilePlus size={16} /> {/* Add the file plus icon */}
                    Change Image
                  </button>
                  <button
                    disabled={isSubmitting || !profileChanged}
                    onClick={handleRemoveImage}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs disabled:cursor-not-allowed"
                  >
                    Remove
                  </button>
                  {
                    profileChanged &&
                    <button
                    disabled={isSubmitting}
                    onClick={handleUpdateProfilePicture}
                    className={`bg-accent-500/95 hover:bg-accent-500 text-white px-2 py-1 rounded text-xs disabled:cursor-not-allowed`}
                  >
                    Save
                  </button>
                  }
                  </div>
                </div>

              </div>

              <div className="text-xs text-gray-400 dark:text-gray-500">
                Use JPG, PNG, or GIF. Best size 300x300 pixels. Keep it under 5MB
              </div>
            </div>
          </div>
        </div>
      </div>

    <form  onSubmit={handleSubmit(onSubmit)} >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        <div className="space-y-1">
          <label className="text-sm">First Name :</label>
          <input
            type="text"
            {...register("firstName", {required: "First Name is required"})}
            placeholder="First Name"
            className="w-full p-2 text-xs rounded border bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm">Middle Name :</label>
          <input
            type="text"
            {...register("lastName", {required: "Middle Name is required"})}
            placeholder="Last Name"
            className="w-full p-2 rounded border text-xs bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
        </div>


        <div className="space-y-1">
        <label className="text-sm"> Phone Number:</label>
          <input
            type="text"
            {...register("phoneNumber", {required: "Phone Number is required"})}
            placeholder="Enter Phone  Number "
            className="w-full p-2 text-xs rounded border bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
        </div>


        <div className="space-y-1">
          <label className="text-sm">Linkedin profile URL :</label>
          <input
            type="url"
            placeholder="https://www.linkedin.com/in/username"
            className="w-full p-2 text-xs rounded border bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-sm">Github Profile URL :</label>
          <input
            type="url"
            placeholder="https://www.github.com/username"
            className="w-full p-2 text-xs rounded border bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
        

        <div className="w-full md:w-auto">
          <button disabled={isSubmitting || !isDirty} className="bg-accent-500/95 hover:bg-accent-500 text-white px-4 text-sm py-2 rounded w-full md:w-auto disabled:opacity-80 disabled:cursor-not-allowed">
             {isDirty ? "Save Changes" : "No Changes Made"}
          </button>
        </div>
      </div>
      </form>
    </div>
  )
}
