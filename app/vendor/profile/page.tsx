'use client'
import AboutTab from "@/app/user/profile/_components/about"
import EdiProfile from "@/app/user/profile/_components/editptofile"
import MyAddress from "@/app/user/profile/_components/my-address"
import ProfileHeader from "@/app/user/profile/_components/profile-header"
import ProfileTabs, { TabsValueEnum } from "@/app/user/profile/_components/profile-tabs"
import UpdatePassword from "@/app/user/profile/_components/update-passwrord"
import WelcomeCard from "@/app/user/profile/_components/WelcomeCard"
import CompleteOnBoarding from "@/app/user/profile/_components/user-verification";
import { useState } from "react"
import { useAppSelector } from "@/redux/store"
import { Badge } from "@/components/ui/badge"
import { IUser } from "@/types/user.type"
import VerificationRequestDialog from "@/app/user/profile/_components/request-verification"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("about")
  const user = useAppSelector((state) => state.auth.user) as unknown as IUser | null;
  const isVerified = user?.verify_status === "VERIFIED";
  const isRejected = user?.verify_status === "REJECTED";
  const isOnboarding = user?.is_onboarding;
  return (
    <div className="flex-grow flex flex-col items-start   w-full  py-12 px-2 sm:px-6 dark:bg-[#1E1E1E] md:px-8 lg:px-10 bg-white">
      <WelcomeCard />
      <div className="flex flex-col w-full items-start lg:flex-row">
        {/* Left Column (Profile Header) */}
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
          <ProfileHeader />
          <div className="w-full flex flex-col items-start justify-start mt-4">

            {isOnboarding ? <CompleteOnBoarding />
              :
              isVerified ? (
                <Badge
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Verified
                </Badge>
              )
                : isRejected ? (
                  <Badge
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Verification Rejected
                  </Badge>
                ) :
                  (
                    <VerificationRequestDialog />

                  )}
          </div>

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
              {activeTab === TabsValueEnum.ADD_ADDRESS && <MyAddress />}
              {activeTab === TabsValueEnum.CHANGE_PASSWORD && <UpdatePassword setActiveTab={setActiveTab} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
