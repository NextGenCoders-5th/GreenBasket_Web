'use client'
import { useAppSelector } from "@/redux/store"
import { IUser } from "@/types/user.type"
import { CircleDollarSign, ShieldAlert, ShieldCheck, ShoppingCart, SquareCheckBig } from "lucide-react"
import { type ReactNode } from "react"

export default function ProfileHeader() {
  const user = useAppSelector((state) => state.auth.user) as unknown as IUser | null;
  const isVerified = user?.verify_status === "VERIFIED";
  return (
    <div className="p-2 w-full">
      <div className="rounded-lg  dark:bg-gray-800 bg-white shadow-md">
        {/* Banner */}
        <div className="h-32 bg-green-500/80 rounded-lg  relative">
          {/* Verification status */}
          <div className="absolute top-2 right-2">
            <SkillTag>{isVerified ? "Verified" : "Not Verified"}</SkillTag>
          </div>
          <div className="absolute -bottom-12 left-6">
            <div className="rounded-full border-4 bg-accent-500 border-white dark:border-gray-800 w-24 h-24 overflow-hidden">
              <img
                src={user?.profile_picture || "/images/profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {/* Verification status icon */}
              {isVerified ? (
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                  <ShieldCheck className="text-white" size={16} />
                </div>
              )
                : (
                <div className="absolute bottom-0 right-0 bg-red-500 rounded-full p-1">
                  <ShieldAlert className="text-white" size={16} />
                </div>
                  
                )
                  }
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-14 px-6  space-y-2 pb-6">
          <h1 className="text-xl text-slate-600 font-bold dark:text-white ">{`${user?.first_name}`} {user?.last_name}</h1>
          {/* User address  */}

          {/* User statisitcs */}
          <div className="grid gap-2 bg-pu w-[70%]  grid-rows-1 grid-cols-[1fr_1fr_1fr]  items-center">
            <ProfileStat
              icon={<SquareCheckBig className="text-purple-700 font-bold" size={24} />}
              value="234"
              label="Sales"
              iconBgColor="bg-purple-600/10"
            />
            <ProfileStat
              icon={<ShoppingCart className="text-orange-700 font-bold" size={24} />}
              value="1.2k"
              label="Orders"
              iconBgColor="bg-orange-600/10"
            />
            <ProfileStat
              icon={<CircleDollarSign size={24} className="text-accent-600" />}
              value="4.1k"
              label="Paid"
              iconBgColor="bg-accent-600/10"
            />
          </div>

        </div>
      </div>
    </div>
  )
}

// Type definitions
interface ProfileStatProps {
  icon: ReactNode
  value: string
  label: string
  iconBgColor: string
}

interface SkillTagProps {
  children: ReactNode
}

// Helper components
function ProfileStat({ icon, value, label, iconBgColor }: ProfileStatProps) {
  return (
    <div className="flex items-center border border-slate-300/50 rounded-sm justify-between px-2 py-0.5 gap-3  ">
      <div className={`${iconBgColor} p-2 rounded-full`}>{icon}</div>
      <div>
        <p className="font-semibold text-sm dark:text-white text-gray-900">{value}</p>
        <p className="text-xs dark:text-gray-400 text-gray-600">{label}</p>
      </div>
    </div>
  )
}

function SkillTag({ children }: SkillTagProps) {
  return (
    <span className="bg-gray-100 dark:bg-gray-700/30 px-3 py-1 rounded-md text-xs dark:text-gray-300 text-gray-700">
      {children}
    </span>
  )
}
