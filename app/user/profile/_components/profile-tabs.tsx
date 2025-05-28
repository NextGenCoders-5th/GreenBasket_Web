"use client"
import { Role } from "@/enums/role.enum"
import { useAppSelector } from "@/redux/store"
import { IUser } from "@/types/user.type"
import { UserIcon, PencilIcon, Plus, MapPinHouse } from "lucide-react"


export enum TabsValueEnum {
  ABOUT = "about",
  EDIT = "edit",
  CHANGE_PASSWORD = "changepassword",
  ADD_ADDRESS = "add_address"
}
interface ProfileTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function ProfileTabs({ activeTab, setActiveTab }: ProfileTabsProps) {
  const user = useAppSelector((state => state.auth.user)) as IUser | null;
  const tabs = [
    { id: TabsValueEnum.ABOUT, label: "About", icon: UserIcon },
    { id: TabsValueEnum.EDIT, label: "Change Profile Picture", icon: PencilIcon },
    { id: TabsValueEnum.ADD_ADDRESS, label: "My Address", icon: MapPinHouse },
    { id: TabsValueEnum.CHANGE_PASSWORD, label: "Change Password", icon: PencilIcon }
  ]
    .filter((tab) => tab.id !== TabsValueEnum.ADD_ADDRESS || user?.role === Role.CUSTOMER);

  return (
    <div className="flex gap-3 p-6 pt-2 w-full  ">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${activeTab === tab.id
              ? "bg-green-600/90 text-white"
              : "dark:bg-gray-700 bg-gray-200 dark:text-gray-300 text-gray-700"
            }`}
        >
          <tab.icon className="w-4 h-4" />
          <span className="hidden md:inline">  {tab.label.split(" ")[0]}</span> {tab.label.split(" ")[1]}
        </button>
      ))}
    </div>
  )
}

