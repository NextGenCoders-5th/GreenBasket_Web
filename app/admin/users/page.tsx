"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Search,
  Download,
  RefreshCw,
  Grid3X3,
  List,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
} from "lucide-react"
import { IUser } from "@/types/user.type"
import { useGetUsersQuery } from "@/redux/api/user.api"
import { LoadingPage } from "./_compnents/Loading"
import { UserDetailDrawer } from "./_compnents/UserDtailDialog"


export default function UsersPage() {
  const contentRef = useRef<HTMLPreElement | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, roleFilter])

  // Fetch users from the API
  const { data, isLoading: loading, error, refetch } = useGetUsersQuery("")
  const users = data?.data || []

  if (loading) return <LoadingPage />

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <XCircle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-semibold mb-2">Error Loading Users</h3>
            <p className="text-muted-foreground mb-4">
              {typeof error === "object" && "message" in error ? error.message : "An unexpected error occurred"}
            </p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const resetPagination = () => {
    setCurrentPage(1)
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
        return <CheckCircle className="h-3 w-3" />
      case "REQUESTED":
        return <Clock className="h-3 w-3" />
      case "REJECTED":
        return <XCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase()
  }

  const exportData = () => {
    if (contentRef.current) {
      const dataStr = JSON.stringify(filteredUsers, null, 2)
      contentRef.current.textContent = dataStr

      // Create downloadable file
      const blob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "users-export.json"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "ACTIVE").length,
    inactive: users.filter((u) => u.status === "INACTIVE").length,
    verified: users.filter((u) => u.verify_status === "VERIFIED").length,
    pending: users.filter((u) => u.verify_status === "REQUESTED").length,
    customers: users.filter((u) => u.role === "CUSTOMER").length,
    vendors: users.filter((u) => u.role === "VENDOR").length,
  }

  const handleViewUser = (user: IUser) => {
    setSelectedUser(user)
    setIsDrawerOpen(true)
  }

  return (
    <div className="container mx-auto  py-8 px-4">
      {/* Hidden pre element for data export */}
      <pre ref={contentRef} className="hidden" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Users Management</h1>
            <p className="text-muted-foreground">Manage and monitor all user accounts</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={exportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="py-4">
          <CardContent className="p-6 py-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <h4>Users ({filteredUsers.length})</h4>
                  <span>
                    {filteredUsers.length === users.length
                      ? `Showing ${startIndex + 1}-${Math.min(endIndex, filteredUsers.length)} of ${filteredUsers.length} users`
                      : `Showing ${startIndex + 1}-${Math.min(endIndex, filteredUsers.length)} of ${filteredUsers.length} filtered users (${users.length} total)`}
                  </span>
                </div>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 per page</SelectItem>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="20">20 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                    <SelectItem value="VENDOR">Vendor</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="rounded-r-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-l-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Display */}
        <Card  >

          <CardContent className="max-h-[50vh] my-0 scrollbar-custom  overflow-auto" >
            {viewMode === "table" ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>User</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verification</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={user.profile_picture || "/placeholder.svg"}
                                alt={`${user.first_name} ${user.last_name}`}
                              />
                              <AvatarFallback>{getInitials(user.first_name, user.last_name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {user.first_name} {user.last_name}
                              </div>
                              <div className="text-sm text-muted-foreground capitalize">{user.gender}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              {user.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {user.phone_number}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === "VENDOR" ? "default" : "secondary"}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getVerifyStatusIcon(user.verify_status)}
                            <Badge variant={getVerifyStatusBadgeVariant(user.verify_status)} className="text-xs">
                              {user.verify_status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(user.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">{formatDate(user.updatedAt)}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedUsers.map((user) => (
                  <Card key={user.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={user.profile_picture || "/placeholder.svg"}
                            alt={`${user.first_name} ${user.last_name}`}
                          />
                          <AvatarFallback>{getInitials(user.first_name, user.last_name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={user.role === "VENDOR" ? "default" : "secondary"} className="text-xs">
                              {user.role}
                            </Badge>
                            <Badge variant={getStatusBadgeVariant(user.status)} className="text-xs">
                              {user.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            {getVerifyStatusIcon(user.verify_status)}
                            <Badge variant={getVerifyStatusBadgeVariant(user.verify_status)} className="text-xs">
                              {user.verify_status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">Joined {formatDate(user.createdAt)}</div>
                        </div>
                      </div>
                    </CardContent>
                    <div className="mt-3 pt-3 border-t">
                      <Button variant="outline" size="sm" onClick={() => handleViewUser(user)} className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {paginatedUsers.length === 0 && filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {paginatedUsers.length === 0 && filteredUsers.length > 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No users on this page</h3>
                <p className="text-muted-foreground">Try going to a different page or adjusting your filters</p>
                <Button variant="outline" onClick={() => setCurrentPage(1)} className="mt-4">
                  Go to First Page
                </Button>
              </div>
            )}

            {/* Pagination Controls */}
          </CardContent>
          {totalPages > 1 && (
            <div className="flex items-center justify-between  px-6">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber
                    if (totalPages <= 5) {
                      pageNumber = i + 1
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i
                    } else {
                      pageNumber = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNumber)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNumber}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
        <UserDetailDrawer user={selectedUser} open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
      </div>
    </div>
  )
}
