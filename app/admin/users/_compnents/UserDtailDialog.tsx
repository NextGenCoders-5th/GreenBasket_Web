"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Calendar,  Shield, Settings, Clock, CheckCircle, XCircle, AlertTriangle, Trash2, UserCheck, UserX, Key, ImageIcon, Pencil } from 'lucide-react'
import { IUser } from "@/types/user.type"
import DeleteFeature, { FeatureDeleteActionType } from "@/components/modals/DeleteFetureDialog"
import { useDeleteUserMutation } from "@/redux/api/user.api"
import EditUserDialog from "./EditUser"

interface UserDetailDrawerProps {
  user: IUser | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserDetailDrawer({ user, open, onOpenChange }: UserDetailDrawerProps) {
  if (!user) return null

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase()
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

  const getVerifyStatusIcon = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "REQUESTED":
        return <Clock className="h-4 w-4 text-orange-600" />
      case "REJECTED":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <UserCheck className="h-4 w-4 text-green-600" />
      case "INACTIVE":
        return <UserX className="h-4 w-4 text-gray-600" />
      default:
        return <User className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[540px] sm:max-w-[540px] scrollbar-custom overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={user.profile_picture || "/placeholder.svg"}
                alt={`${user.first_name} ${user.last_name}`}
              />
              <AvatarFallback className="text-lg">
                {getInitials(user.first_name || "", user.last_name || "")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <SheetTitle className="text-xl">
                {user.first_name} {user.last_name}
              </SheetTitle>
              <SheetDescription className="text-base">{user.email}</SheetDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={user.role === "VENDOR" ? "default" : "secondary"}>{user.role}</Badge>
                <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <EditUserDialog editUser={user}
            onsuccess={() => onOpenChange(false)}
            >
            <Button size="sm" variant="outline">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
            </EditUserDialog>
            {/* <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View Profile
            </Button> */}
            <DeleteFeature
              feature="User"
              featureId={user.id}
              redirectUrl=""
              triggerContent={<Button size="sm" className="py-1" variant="destructive">
                <Trash2 className="h-3 w-3 mr-2" />
                Delete User
              </Button>

              } 

              useDelete={useDeleteUserMutation as FeatureDeleteActionType}
              onSuccess={() => onOpenChange(false)}
              />
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
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

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(user.status)}
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
                <label className="text-sm font-medium text-muted-foreground">Verification Status</label>
                <div className="flex items-center gap-2 mt-1">
                  {getVerifyStatusIcon(user.verify_status)}
                  <Badge variant={getVerifyStatusBadgeVariant(user.verify_status)}>{user.verify_status}</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Authentication Provider</label>
                <p className="text-sm">{user.authProvider}</p>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              {user.reset_password_token && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Password Reset Token</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-mono bg-muted px-2 py-1 rounded text-xs">
                      {user.reset_password_token.substring(0, 20)}...
                    </p>
                  </div>
                </div>
              )}
              {user.reset_password_token_expires_at && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Token Expires At</label>
                  <p className="text-sm">{formatDate(user.reset_password_token_expires_at)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verification Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ImageIcon className="h-5 w-5" />
                Verification Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID Photo (Front)</label>
                  <div className="mt-2">
                    {user.idPhoto_front ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Uploaded</span>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-muted-foreground">Not uploaded</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID Photo (Back)</label>
                  <div className="mt-2">
                    {user.idPhoto_back ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Uploaded</span>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-muted-foreground">Not uploaded</span>
                      </div>
                    )}
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

          {/* User ID */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Key className="h-5 w-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                <p className="text-sm font-mono bg-muted px-2 py-1 rounded mt-1">{user.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
