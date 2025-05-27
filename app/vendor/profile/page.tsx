'use client'
import AboutTab from "@/app/user/profile/_components/about"
import EdiProfile from "@/app/user/profile/_components/editptofile"
import MyAddress from "@/app/user/profile/_components/my-address"
import ProfileHeader from "@/app/user/profile/_components/profile-header"
import ProfileTabs, { TabsValueEnum } from "@/app/user/profile/_components/profile-tabs"
import UpdatePassword from "@/app/user/profile/_components/update-passwrord"
import WelcomeCard from "@/app/user/profile/_components/WelcomeCard"
import { useGetMyAddressQuery } from "@/redux/api/address.api"
import { useState } from "react"
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("about")

  return (
    <div className="flex-grow flex flex-col items-start   w-full  py-12 px-2 sm:px-6 dark:bg-[#1E1E1E] md:px-8 lg:px-10 bg-white">
      <WelcomeCard/>
      <div className="flex flex-col w-full items-start lg:flex-row">
        {/* Left Column (Profile Header) */}
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
          <ProfileHeader />
        </div>

        {/* Right Column (Tabs and Content) */}
        <div className="w-full lg:w-2/3 ">
          <div className="rounded-lg flex flex-col items-center justify-start dark:bg-[#1E1E1E] bg-white shadow-md ">
            {/* Navigation Tabs */}
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Tab Content */}
            <div className=" flex w-full justify-start p-2 pt-0 md:p-2 flex-col">
              {activeTab === TabsValueEnum.ABOUT && <AboutTab />}
              {activeTab === TabsValueEnum.EDIT && <EdiProfile setActiveTab={setActiveTab} />}
              {activeTab === TabsValueEnum.ADD_ADDRESS && <MyAddress  />}
              {activeTab === TabsValueEnum.CHANGE_PASSWORD && <UpdatePassword setActiveTab={setActiveTab} />}
            </div>
          </div>
        </div>
        {/* <Debugger>
        <img
        src="/profile.png"
        alt="Debugger"
        width={100}
        height={100}
        className="w-full h-full object-fill"
      />
        </Debugger> */}
      </div>
    </div>
  )
}
