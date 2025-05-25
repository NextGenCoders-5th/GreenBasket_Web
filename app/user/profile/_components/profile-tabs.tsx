"use client"
import { UserIcon, PencilIcon, Plus} from "lucide-react"


export enum TabsValueEnum{
  ABOUT ="about",
  EDIT  = "edit",
  CHANGE_PASSWORD = "changepassword",
  ADD_ADDRESS = "add_address"
}
interface ProfileTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function ProfileTabs({ activeTab, setActiveTab }: ProfileTabsProps) {
  const tabs = [
    { id: TabsValueEnum.ABOUT, label: "About", icon: UserIcon },
    { id: TabsValueEnum.EDIT, label: "Edit Profile", icon: PencilIcon },
    {id: TabsValueEnum.ADD_ADDRESS, label: "Add Address", icon:Plus},
    { id: TabsValueEnum.CHANGE_PASSWORD, label: "Change Password", icon: PencilIcon }
  ]

  return (
    <div className="flex gap-3 p-6 pt-2 w-full  ">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${
            activeTab === tab.id
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

