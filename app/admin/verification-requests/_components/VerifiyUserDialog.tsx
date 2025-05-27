"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Clock,
  ImageIcon,
  Eye,
  Download,
  UserCheck,
  UserX,
} from "lucide-react"
import type { IUser } from "@/types/user.type"
import { useToast } from "@/providers/toast.provider"
import { useVerifyUserMutation } from "@/redux/api/user.api"

// Interface as requested
interface VerifyUserRequest {
  userId: string
  verify_status: string
}

// Extended interface for form data
interface VerifyUserFormData extends VerifyUserRequest {
}

// Form validation schema
const verifyUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  verify_status: z.string({
    required_error: "Please select a verification status",
  }),
})



interface VerifyUserDialogProps {
  user: IUser | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function VerifyUserDialog({ user, open, onOpenChange, onSuccess }: VerifyUserDialogProps) {
  const toast = useToast()
  const [error, setError] = useState<string | null>(null)
  const [verifyUser, { isLoading }] = useVerifyUserMutation();

  const form = useForm<VerifyUserFormData>({
    resolver: zodResolver(verifyUserSchema),
    defaultValues: {
      userId: user?.id || "",
      verify_status: user?.verify_status || "REQUESTED",
    },
  })

  // Reset form when user changes
  useEffect(() => {
    if (user) {
      form.reset({
        userId: user.id,
        verify_status: user.verify_status,
      })
      setError(null)
    }
  }, [user, form])

  const onSubmit = async (data: VerifyUserFormData) => {
    const toastId = toast.loading("Updating verification status...")
    if (!user) return
    try {
      setError(null)
      const verifyRequest: VerifyUserRequest = {
        userId: data.userId,
        verify_status: data.verify_status,
      }
      await verifyUser(verifyRequest).unwrap().then(() => {
        toast.success(`${user.first_name} ${user.last_name} has been ${data.verify_status.toLowerCase()}`, { id: toastId })
        onOpenChange(false)
        onSuccess?.()
        form.reset()
      })
        .catch((err) => {
          if (err.status === 'UNKOWN_ERROR')
            toast.error('New user add failed, please try again.', { id: toastId });
          else {
            toast.error(err.message || 'New user add failed, please try again.', { id: toastId });
          }
        });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      toast.error(errorMessage || 'Failed to update verification status')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "REJECTED":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "REQUESTED":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return "text-green-600"
      case "REJECTED":
        return "text-red-600"
      case "REQUESTED":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDateOnly = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getAge = (dateString: string) => {
    const today = new Date()
    const birthDate = new Date(dateString)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default"
      case "INACTIVE":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getVerifyStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return "default"
      case "REQUESTED":
        return "secondary"
      case "REJECTED":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Verify User Account</DialogTitle>
          <DialogDescription>
            Review user information and update verification status for {user.first_name} {user.last_name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
          {/* Left Column - User Information */}
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              {/* User Profile Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={user.profile_picture || "/placeholder.svg"}
                        alt={`${user.first_name} ${user.last_name}`}
                      />
                      <AvatarFallback className="text-lg">
                        {getInitials(user.first_name, user.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {user.first_name} {user.last_name}
                      </h3>
                      <p className="text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={user.role === "VENDOR" ? "default" : "secondary"}>{user.role}</Badge>
                        <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(user.verify_status)}
                          <Badge variant={getVerifyStatusBadgeVariant(user.verify_status)}>{user.verify_status}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">First Name</label>
                      <p className="text-sm">{user.first_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                      <p className="text-sm">{user.last_name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Gender</label>
                      <p className="text-sm capitalize">{user.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Age</label>
                      <p className="text-sm">{getAge(user.date_of_birth)} years old</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                    <p className="text-sm">{formatDateOnly(user.date_of_birth)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{user.phone_number}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                      <div className="flex items-center gap-2 mt-1">
                        {user.status === "ACTIVE" ? (
                          <UserCheck className="h-4 w-4 text-green-600" />
                        ) : (
                          <UserX className="h-4 w-4 text-gray-600" />
                        )}
                        <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">User Role</label>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Badge variant={user.role === "VENDOR" ? "default" : "secondary"}>{user.role}</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Authentication Provider</label>
                    <p className="text-sm">{user.authProvider}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Onboarding Status</label>
                      <div className="flex items-center gap-2 mt-1">
                        {user.is_onboarding ? (
                          <Clock className="h-4 w-4 text-orange-600" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        <Badge variant={user.is_onboarding ? "secondary" : "default"}>
                          {user.is_onboarding ? "In Progress" : "Completed"}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Password Reset Required</label>
                      <div className="flex items-center gap-2 mt-1">
                        {user.need_reset_password ? (
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        <Badge variant={user.need_reset_password ? "destructive" : "default"}>
                          {user.need_reset_password ? "Required" : "Not Required"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timestamps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5" />
                    Account Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Account Created</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{formatDate(user.updatedAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>


          {/* Right Column - Verification Documents & Form */}
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              {/* ID Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ImageIcon className="h-5 w-5" />
                    Verification Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {/* ID Front */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">ID Photo (Front)</label>
                      <div className="mt-2">
                        {user.idPhoto_front ? (
                          <div className="space-y-2">
                            <div className="relative group">
                              <img
                                src={user.idPhoto_front || "/placeholder.svg"}
                                alt="ID Front"
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                <Button size="sm" variant="secondary">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                                <Button size="sm" variant="secondary">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600">Document uploaded</span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <XCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <span className="text-sm text-muted-foreground">No document uploaded</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ID Back */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">ID Photo (Back)</label>
                      <div className="mt-2">
                        {user.idPhoto_back ? (
                          <div className="space-y-2">
                            <div className="relative group">
                              <img
                                src={user.idPhoto_back || "/placeholder.svg"}
                                alt="ID Back"
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                <Button size="sm" variant="secondary">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                                <Button size="sm" variant="secondary">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600">Document uploaded</span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <XCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <span className="text-sm text-muted-foreground">No document uploaded</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* Verification Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5" />
                    Update Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="verify_status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Verification Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select verification status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="VERIFIED">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>Verified</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="REJECTED">
                                  <div className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-red-600" />
                                    <span>Rejected</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="REQUESTED">
                                  <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                                    <span>Requested</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Choose the new verification status for this user</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {error && (
                        <Alert variant="destructive">
                          <XCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isLoading ? "Updating..." : "Update Status"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
