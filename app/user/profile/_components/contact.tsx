'use client'
import type { ReactNode } from "react"
import { InboxIcon as EnvelopeIcon, PhoneIcon, GlobeIcon as GlobeAltIcon, MapPinIcon } from "lucide-react"
import { useAppSelector } from "@/redux/store"
import { IUser } from "@/types/user.type"

export default function ContactInfo() {
  const user = useAppSelector((state) => state.auth.user) as  IUser | null
  return (
    <div>
      <h2 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Contact Information :</h2>
      <div className="grid gap-4">
        <ContactItem
          icon={<EnvelopeIcon className="w-5 h-5 text-gray-500" />}
          label="Email :"
          value={user?.email ||  "Not email found"}
        />

        <ContactItem icon={<PhoneIcon className="w-5 h-5 text-gray-500" />} label="Phone :" value={user?.phone_number || "No phone number yet"} />
        <ContactItem icon={<MapPinIcon className="w-5 h-5 text-gray-500" />} label="Location :" value={`${user?.address?.city || 'No City'}, ${user?.address?.country}`} />
      </div>
    </div>
  )
}

interface ContactItemProps {
  icon: ReactNode
  label: string
  value: string
}

function ContactItem({ icon, label, value }: ContactItemProps) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="dark:text-white text-gray-900 text-sm">{value}</p>
      </div>
    </div>
  )
}

