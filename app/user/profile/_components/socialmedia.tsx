'use client'
import { useAppSelector } from "@/redux/store"
import { IUser } from "@/types/user.type"
import { UserIcon } from "lucide-react"
import { useEffect, useState } from "react"
interface SocialLink {
  name: string
  url: string
  iconColor: string
  bgColor: string
}

export default function SocialMedia() {

  const user = useAppSelector((state) => state.auth.user) as unknown as IUser | null
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  useEffect(() => {
    if (user) {
      const links = [
        {
          name: "Github",
          url:  " github profile ",
          iconColor: "text-purple-500",
          bgColor: "bg-purple-500/20",
        },
        {
          name: "Twitter",
          url: "Not twitter yet",
          iconColor: "text-red-500",
          bgColor: "bg-red-500/20",
        },
        {
          name: "LinkedIn",
          url:  " linkedIn profile",
          iconColor: "text-blue-500",
          bgColor: "bg-blue-500/20",
        },
        {
          name: "My Portfolio",
          url:  " portfolio yet",
          iconColor: "text-[#3FBBA3]",
          bgColor: "bg-[#3FBBA3]/20",
        },
      ]
      setSocialLinks(links)
    }
  }, [user])
 

  return (
    <div>
      <h2 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Social Media :</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialLinks.map((social) => (
          <div key={social.name} className="flex items-center gap-3">
            <div className={`${social.bgColor} p-2 rounded-md`}>
              <UserIcon className={`w-5 h-5 ${social.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 ">{social.name}</p>
              <p className="dark:text-white text-gray-900 text-sm">{social.url}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

