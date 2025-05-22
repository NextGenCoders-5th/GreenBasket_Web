'use client"'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UpdatePasswordSchemaType } from "@/schema/auth.schema";
import { useChangePasswordMutation } from "@/redux/api/auth.api";
import { useToast } from "@/providers/toast.provider";
import { ErrorEnum } from "@/enums/error.enum";
import PasswordInput from "@/app/_components/PasswordInput";
import { getPasswordStrength } from "@/util/password-strength";

interface UpdatePasswordProps {
  setActiveTab: (tab: string) => void;
}
export default function UpdatePassword({ setActiveTab }: UpdatePasswordProps) {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UpdatePasswordSchemaType>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [changePassword] = useChangePasswordMutation();

  const newPassword = watch("newPassword");

  const strengthBarStyles = getPasswordStrength(newPassword || "");

  const onSubmit = async (data: UpdatePasswordSchemaType) => {
    setLoading(true);
    try {
      await changePassword(data)
        .unwrap()
        .then(() => {
          toast.success("Password changed successfully!");
          setActiveTab("about");
        });
    } catch (error: any) {
      console.log("Change password Error", error)
      if (error.status === ErrorEnum.NETWORK_ERROR || error.status === ErrorEnum.BAD_REQUEST)
        return;
      toast.error("Failed to change password. Please try againn.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full justify-center items-center dark:bg-slate-800 bg-gray-100 ">
      <div className="w-full shadow-sm bg-white dark:bg-gray-800 p-6 rounded-lg ">
        <h2 className="text-2xl font-semibold text-center mb-4">Change Your  Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">
              Old Password
            </label>
            <PasswordInput
              register={register}
              name="oldPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-xs">{errors.oldPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">
              New Password
            </label>
            <PasswordInput
              register={register}
              name="newPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Password Strength Bar */}
          {newPassword && <div className="mt-2">
            <div className="w-full h-2 dark:bg-gray-700 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${strengthBarStyles.className} transition-all duration-300`}
                style={{ width: strengthBarStyles.width }}
              ></div>
            </div>
          </div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">
              Confirm Password
            </label>
            <PasswordInput
              register={register}
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent-500/95 text-white py-2 px-4 rounded-md shadow-sm hover:bg-accent-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-85"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
