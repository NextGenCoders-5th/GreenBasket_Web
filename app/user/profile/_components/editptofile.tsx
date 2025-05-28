'use client';
import { Role } from "@/enums/role.enum"
import { useToast } from "@/providers/toast.provider"
import { useUpdateProfilePrictureMutation } from "@/redux/api/user.api"
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
  
  const [profileImage, setProfileImage] = useState<File | null >(null)


  const fileInputRef = useRef<HTMLInputElement>(null)
  const {formState:{isDirty}, reset} = useForm<UserFormData>({
    defaultValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
      phoneNumber: user?.phone_number || "",
    },
  });

  

  const [updateProfile, {isLoading}] = useUpdateProfilePrictureMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
    }
  }



  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
  }

  const handleUpdateProfilePicture = async () => {
    if (!profileImage) {
      toast.error("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", profileImage);

    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile picture updated successfully");
      setProfileImage(null);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture");
    }
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
              src={profileImage ? URL.createObjectURL(profileImage) : user?.profile_picture || "/placeholder.png"}
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
                    disabled={isLoading}
                    onClick={triggerFileInput}
                    className="bg-green-600/90 text-white px-2 py-1 rounded text-xs flex items-center gap-1 disabled:cursor-not-allowed"
                  >
                    <FilePlus size={16} /> {/* Add the file plus icon */}
                    Change Image
                  </button>
                  {profileImage && <button
                    disabled={isLoading }
                    onClick={handleRemoveImage}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs disabled:cursor-not-allowed"
                  >
                    Remove
                  </button>}
                  {
                    profileImage &&
                    <button
                    disabled={isLoading}
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
    </div>
  )
}
