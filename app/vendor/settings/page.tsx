"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Edit,
  Plus,
  Calendar,
  Globe,
  Landmark,
  User,
  Hash,
  Navigation,
} from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import BankAccountDialog from "./_components/BankAccountDialog"
import AddressDialog from "./_components/AddressDialog"
import { useAppSelector } from "@/redux/store"
import { IUser } from "@/types/user.type"

// Mock data - replace with actual API calls
const mockVendor = {
  id: "3249e899-4e74-434d-b0a6-8b12b0ec02e2",
  updatedAt: "2025-05-26T21:10:19.606Z",
  createdAt: "2025-05-26T21:10:19.606Z",
  business_name: "Casper LLC",
  business_email: "thea73@yahoo.com",
  phone_number: "+251991523658",
  logo_url: "https://loremflickr.com/320/240/business?lock=8348576662265415",
  status: "APPROVED",
  have_bank_details: true,
  userId: "45bdb148-a166-418a-9832-b945faaf193a",
}

const mockAddress = {
  id: "addr-1",
  country: "Ethiopia",
  city: "Addis Ababa",
  sub_city: "Bole",
  street: "Bole Road, Near Edna Mall",
  zip_code: "1000",
  latitude: 9.0192,
  longitude: 38.7525,
}

const mockBankAccounts = [
  {
    id: "bank-1",
    account_name: "Casper LLC Business Account",
    account_number: "1234567890123456",
    bank_name: "Commercial Bank of Ethiopia",
  },
  {
    id: "bank-2",
    account_name: "Casper LLC Savings",
    account_number: "9876543210987654",
    bank_name: "Dashen Bank",
  },
]

export default function VendorDetailPage() {
  const [addAddress, setAddAddress] = useState(false)
  const user = useAppSelector((state => state.auth.user)) as unknown as IUser || null
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any>(null)
  const [bankDialogOpen, setBankDialogOpen] = useState(false)
  const [editingBankAccount, setEditingBankAccount] = useState<any>(null)
   const vendor = user.vendor || mockVendor;



  // Mock data - replace with actual API calls
  const address = mockAddress
  const bankAccounts = mockBankAccounts

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "REJECTED":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const handleEditAddress = () => {
    setEditingAddress(address)
    setAddressDialogOpen(true)
  }

  const handleAddAddress = () => {
    setEditingAddress(null)
    setAddressDialogOpen(true)
  }

  const handleEditBankAccount = (account: any) => {
    setEditingBankAccount(account)
    setBankDialogOpen(true)
  }

  const handleAddBankAccount = () => {
    setEditingBankAccount(null)
    setBankDialogOpen(true)
  }

  return (
    <div className="max-h-[90vh] overflow-auto scrollbar-custom bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-white/80 backdrop-blur-sm border-0 p-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-accent-500/80 to-accent-500 p-8 relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="relative">
                  <Image
                    src={vendor.logo_url || "/placeholder.svg"}
                    width={120}
                    height={120}
                    alt={`${vendor.business_name} Logo`}
                    className="w-30 h-30 object-cover rounded-2xl border-4 border-white shadow-2xl"
                  />
                  {vendor.have_bank_details && (
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-white">
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">{vendor.business_name}</h1>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <Badge className={`${getStatusColor(vendor.status)} border text-sm font-medium`}>
                      {vendor.status}
                    </Badge>
                    <span className="text-blue-100 text-sm">ID: {vendor.id}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{vendor.business_email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{vendor.phone_number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Created: {formatDate(vendor.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Updated: {formatDate(vendor.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Address Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-fit">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  Address Information
                </CardTitle>
                <div className="flex gap-2">
                  {address ? (
                    <Button size="sm" variant="outline" onClick={handleEditAddress}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  ) : (
                    <Button size="sm" onClick={handleAddAddress}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Address
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              { address ?
              (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Globe className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Country:</span>
                      </div>
                      <p className="text-slate-900 ml-6">{address.country}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Building2 className="w-4 h-4 text-green-500" />
                        <span className="font-medium">City:</span>
                      </div>
                      <p className="text-slate-900 ml-6">{address.city}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">Sub City:</span>
                      </div>
                      <p className="text-slate-900 ml-6">{address.sub_city}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Hash className="w-4 h-4 text-orange-500" />
                        <span className="font-medium">Zip Code:</span>
                      </div>
                      <p className="text-slate-900 ml-6">{address.zip_code}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span className="font-medium">Street Address:</span>
                    </div>
                    <p className="text-slate-900 ml-6">{address.street}</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Navigation className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Latitude:</span>
                      </div>
                      <p className="text-slate-900 ml-6 font-mono text-sm">{address.latitude}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Navigation className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Longitude:</span>
                      </div>
                      <p className="text-slate-900 ml-6 font-mono text-sm">{address.longitude}</p>
                    </div>
                  </div>
                </div>
              ) :
               (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-600 mb-2">No Address Added</h3>
                  <p className="text-slate-500 mb-4">Add an address to complete the vendor profile</p>
                  <Button onClick={handleAddAddress}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Address
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Bank Accounts Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-fit">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="w-5 h-5 text-green-500" />
                  Bank Accounts
                </CardTitle>
                <Button size="sm" onClick={handleAddBankAccount}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {bankAccounts.length > 0 ? (
                <div className="space-y-4">
                  {bankAccounts.map((account, index) => (
                    <div key={account.id}>
                      <Card className="bg-slate-50 border border-slate-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Landmark className="w-5 h-5 text-blue-500" />
                              <h4 className="font-semibold text-slate-900">{account.bank_name}</h4>
                            </div>
                            <Button size="sm" variant="ghost" onClick={() => handleEditBankAccount(account)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="w-4 h-4 text-green-500" />
                              <span className="font-medium text-slate-600">Account Name:</span>
                              <span className="text-slate-900">{account.account_name}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <Hash className="w-4 h-4 text-purple-500" />
                              <span className="font-medium text-slate-600">Account Number:</span>
                              <span className="text-slate-900 font-mono">
                                {account.account_number.replace(/(.{4})/g, "$1 ").trim()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      {index < bankAccounts.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-600 mb-2">No Bank Accounts</h3>
                  <p className="text-slate-500 mb-4">Add bank account information for payments</p>
                  <Button onClick={handleAddBankAccount}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Bank Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Dialog Components */}
      <AddressDialog
        open={addressDialogOpen}
        onOpenChange={setAddressDialogOpen}
        address={editingAddress}
        onSave={() => {
          setAddressDialogOpen(false)
          setEditingAddress(null)
        }}
      />

      <BankAccountDialog
        open={bankDialogOpen}
        onOpenChange={setBankDialogOpen}
        bankAccount={editingBankAccount}
        onSave={(bankData) => {
          console.log("Bank account saved:", bankData)
          setBankDialogOpen(false)
          setEditingBankAccount(null)
        }}
      />
      
    </div>
  )
}
