import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IAddress } from '@/types/address.type'
import { motion } from 'framer-motion'
import { Building2, Globe, Hash, MapPin, Navigation, Pencil, Plus } from 'lucide-react'
import React, { useState } from 'react'
import AddressDialog from '../vendor/settings/_components/AddressDialog'
interface Props {
    address?: IAddress
}
export const DisplayAddress = ({ address }: Props) => {
    const [addressDialogOpen, setAddressDialogOpen] = useState(false)
    const [editingAddress, setEditingAddress] = useState<any>(null)
    const handleAddAddress = () => {
        setEditingAddress(null)
        setAddressDialogOpen(true)
    }
    const handleEditAddress = () => {
        setEditingAddress(address)
        setAddressDialogOpen(true)
    }
    return (
        <>
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
                                {address && (
                                    <Button size="sm" variant="outline" onClick={handleEditAddress}>
                                        <Pencil className="w-4 h-4 mr-1" />
                                        Edit
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {address ?
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
            <AddressDialog
                open={addressDialogOpen}
                onOpenChange={setAddressDialogOpen}
                address={editingAddress}
                onSave={() => {
                    setAddressDialogOpen(false)
                    setEditingAddress(null)
                }}
            />
        </>
    )
}
