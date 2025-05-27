"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, Mail, Phone, Calendar, User, CheckCircle, Users, Clock, Store } from "lucide-react"
import { VerifyUserDialog } from "./_components/VerifiyUserDialog"
import { useGetAllVerificationsQuery } from "@/redux/api/user.api"
import LoadingPage from "@/app/_components/Loading"
import NetworkErrorSection from "@/components/network-error"
import { ResponseError } from "@/types/general.types"
import NotFound from "@/app/_components/NotFound"
import { IUser } from "@/types/user.type"
import { UserDetailDrawer } from "../users/_compnents/UserDtailDialog"

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "ACTIVE":
      return "default"
    case "INACTIVE":
      return "secondary"
    default:
      return "outline"
  }
}

function getVerifyStatusBadgeVariant(status: string) {
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

function getRoleBadgeVariant(role: string) {
  switch (role) {
    case "VENDOR":
      return "default"
    case "CUSTOMER":
      return "secondary"
    default:
      return "outline"
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export default function VerificationRequestsPage() {

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { data, error, isLoading } = useGetAllVerificationsQuery()
  const handleVerifyUser = (user: IUser) => {
    setSelectedUser(user)
    setIsVerifyDialogOpen(true)
  }

  const handleViewUser = (user: IUser) => {
    setSelectedUser(user)
    setIsViewDialogOpen(true)
  }

  const handleVerificationSuccess = () => {
    // Refresh the data or update the local state
    // In a real app, you might want to refetch the data or update the specific user
    console.log("Verification updated successfully")
  }

  if (isLoading) {
    return (
      <LoadingPage />
    )
  }

  if (error) {
    return (
      <NetworkErrorSection error={error as ResponseError} />
    )
  }
  const verificationRequests = data?.data.data;
  if (!verificationRequests?.length) {
    return (
      <NotFound>
        <div className="text-center text-muted-foreground">No verification requests found.</div>
      </NotFound>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex gap-4 text-center">
          <div className="flex flex-col items-start">
            <CardTitle className="text-2xl font-bold">Verification Requests</CardTitle>
            <CardDescription>
              Manage and review user verification requests. Total requests: {verificationRequests.length}
            </CardDescription>
          </div>
          <div className=" flex-grow grid  grid-cols-1 md:grid-cols-4 gap-2">
            <Card className="p-1">
              <CardContent className="p-4 py-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div className="flex flex-col flex-1 items-end">
                    <div className="text-2xl font-bold">{verificationRequests.length}</div>
                    <p className="text-xs text-muted-foreground">Total Requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-1">
              <CardContent className="p-4 py-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div className="flex flex-col flex-1 items-end">
                    <div className="text-2xl font-bold text-orange-600">
                      {verificationRequests.filter((r) => r.verify_status === "REQUESTED").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-1">
              <CardContent className="p-4 py-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex flex-col flex-1 items-end">
                    <div className="text-2xl font-bold text-green-600">
                      {verificationRequests.filter((r) => r.verify_status === "VERIFIED").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Verified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-1">
              <CardContent className="p-4 py-2">
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-purple-600" />
                  <div className="flex flex-col flex-1 items-end">
                    <div className="text-2xl font-bold text-purple-600">
                      {verificationRequests.filter((r) => r.role === "VENDOR").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Vendors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardHeader>
        <CardContent className="h-[75vh] scrollbar-custom overflow-auto">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[80px]">Avatar</TableHead>
                  <TableHead>User Details</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verificationRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={request.profile_picture || "/placeholder.svg"}
                          alt={`${request.first_name} ${request.last_name}`}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getInitials(request?.first_name || "", request?.last_name || "")}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">
                          {request.first_name} {request.last_name}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          {request.gender}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate max-w-[150px]" title={request.email}>
                            {request.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {request.phone_number}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(request.role)} className="text-xs">
                        {request.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(request.status)} className="text-xs">
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getVerifyStatusBadgeVariant(request.verify_status)} className="text-xs">
                        {request.verify_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(request.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Button variant="ghost"  onClick={() => handleViewUser(request)} size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleVerifyUser(request)}
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="sr-only">Verify user</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <VerifyUserDialog
        user={selectedUser}
        open={isVerifyDialogOpen}
        onOpenChange={setIsVerifyDialogOpen}
        onSuccess={handleVerificationSuccess}
      />
              <UserDetailDrawer user={selectedUser} open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} />
      
    </div>
  )
}
