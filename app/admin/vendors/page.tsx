"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Mail, Phone, Building2, CheckCircle, XCircle, CreditCard, Calendar } from "lucide-react"
import SortDropdown from "@/app/_components/Dropdown"
import Link from "next/link"
import { useDeleteVendorMutation, useGetVendorsQuery } from "@/redux/api/vendor.api"
import LoadingPage from "@/components/loading.page"
import DeleteFeature, { type FeatureDeleteActionType } from "@/components/modals/DeleteFetureDialog"
import UpdateVendorStatusModal from "./_compnents/UpdateVendorStatus"
import type { VendorStatus } from "@/enums/status.enum"
import EditVendorModal from "./_compnents/EditVendor"
import VendorRegisterDialog from "./_compnents/AddVendor"
import Image from "next/image"
import { TooltipWrapper } from "@/components/tooltip.wrapper"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function VendorsPage() {
  const [search, setSearch] = useState("")
  const { data, isLoading: loading } = useGetVendorsQuery("")

  if (loading) return <LoadingPage />

  const vendors = data?.data.data

  const filteredVendors = vendors?.filter(
    (vendor) =>
      vendor.business_name.toLowerCase().includes(search.toLowerCase()) ||
      vendor.business_email.toLowerCase().includes(search.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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

  return (
    <div className=" overflow-auto max-h-[80vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Vendor Management
            </h1>
            <p className="text-slate-600 mt-2 text-lg">Manage and monitor your business partners</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 lg:w-auto w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search vendors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-80 px-4 py-3 pl-10 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex gap-3">
              <SortDropdown
                options={[
                  { label: "Name (A-Z)", value: "name_asc" },
                  { label: "Name (Z-A)", value: "name_desc" },
                  { label: "Email (A-Z)", value: "email_asc" },
                  { label: "Email (Z-A)", value: "email_desc" },
                ]}
              />
              <VendorRegisterDialog />
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card className="bg-white/70 p-3 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Vendors</p>
                  <p className="text-3xl font-bold text-slate-900">{vendors?.length || 0}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 p-3 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Approved</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {vendors?.filter((v) => v.status === "APPROVED").length || 0}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 p-3 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">With Bank Details</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {vendors?.filter((v) => v.have_bank_details).length || 0}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 p-3 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Search Results</p>
                  <p className="text-3xl font-bold text-slate-900">{filteredVendors?.length || 0}</p>
                </div>
                <Eye className="h-8 w-8 text-slate-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vendor Cards */}
      {!!filteredVendors?.length ? (
        <AnimatePresence>
          <div className="grid grid-cols-1   lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              >
                <Card className="group py-0 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <CardContent className="p-0 ">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-accent-400 to-accent-500 p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Image
                              src={vendor.logo_url || "/placeholder.svg"}
                              width={60}
                              height={60}
                              alt={`${vendor.business_name} Logo`}
                              className="w-15 h-15 object-cover rounded-full border-3 border-white shadow-lg"
                            />
                            {vendor.have_bank_details && (
                              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1">
                                <CreditCard className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white truncate max-w-[200px]">
                              {vendor.business_name}
                            </h3>
                            <Badge className={`${getStatusColor(vendor.status)} border text-xs font-medium`}>
                              {vendor.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Contact Information */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-sm truncate">{vendor.business_email}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{vendor.phone_number}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          <span className="text-sm">Joined {formatDate(vendor.createdAt)}</span>
                        </div>
                      </div>

                      {/* Bank Details Status */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm font-medium text-slate-700">Bank Details</span>
                        <div className="flex items-center space-x-2">
                          {vendor.have_bank_details ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              <span className="text-sm text-emerald-600 font-medium">Complete</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span className="text-sm text-red-600 font-medium">Missing</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                        <TooltipWrapper
                          title="View Details"
                          className="bg-accent-600"
                          arroClassName="bg-accent-600 fill-accent-600"
                        >
                          <Button asChild  className="bg-slate-100 box-border border text-accent-500 border-accent-500 hover:bg-accent-500 hover:text-white">
                            <Link href={`/admin/vendors/${vendor.id}`}>
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Link>
                          </Button>
                        </TooltipWrapper>

                        <UpdateVendorStatusModal currentStatus={vendor.status as VendorStatus} vendorId={vendor.id} />

                        <EditVendorModal vendor={vendor} />

                        <DeleteFeature
                          featureId={vendor.id}
                          feature="Vendor"
                          useDelete={useDeleteVendorMutation as FeatureDeleteActionType}
                          redirectUrl="/admin/vendors"
                          iconOnly
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <div className="max-w-md mx-auto">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No vendors found</h3>
            <p className="text-slate-500 mb-6">
              {search ? "Try adjusting your search criteria" : "Get started by adding your first vendor"}
            </p>
            {!search && <VendorRegisterDialog />}
          </div>
        </motion.div>
      )}
    </div>
  )
}
