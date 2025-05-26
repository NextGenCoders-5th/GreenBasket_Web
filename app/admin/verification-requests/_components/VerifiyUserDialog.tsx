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
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { IUser } from "@/types/user.type"

// Interface as requested
interface VerifyUserRequest {
  userId: string
  verifyStatus: string
}

// Extended interface for form data
interface VerifyUserFormData extends VerifyUserRequest {
}



// Form validation schema
const verifyUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  verifyStatus: z.string( {
    required_error: "Please select a verification status",
  }),
})

// Mock Redux mutation hook - replace with your actual implementation
const useVerifyUserMutation = () => {
  const [isLoading, setIsLoading] = useState(false)

  const mutateAsync = async (data: VerifyUserRequest) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    // Simulate success/error randomly for demo
    if (Math.random() > 0.2) {
      return { success: true, message: "User verification status updated successfully" }
    } else {
      throw new Error("Failed to update verification status")
    }
  }

  return {
    mutateAsync,
    isLoading,
  }
}

interface VerifyUserDialogProps {
  user: IUser | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function VerifyUserDialog({ user, open, onOpenChange, onSuccess }: VerifyUserDialogProps) {
  const [error, setError] = useState<string | null>(null)
  const { mutateAsync: verifyUser, isLoading } = useVerifyUserMutation()

  const form = useForm<VerifyUserFormData>({
    resolver: zodResolver(verifyUserSchema),
    defaultValues: {
      userId: user?.id || "",
      verifyStatus: user?.verify_status || "REQUESTED",
    },
  })

  // Reset form when user changes
  useEffect(() => {
    if (user) {
      form.reset({
        userId: user.id,
        verifyStatus: user.verify_status,
      })
      setError(null)
    }
  }, [user, form])

  const onSubmit = async (data: VerifyUserFormData) => {
    if (!user) return

    try {
      setError(null)

      const verifyRequest: VerifyUserRequest = {
        userId: data.userId,
        verifyStatus: data.verifyStatus,
      }

      await verifyUser(verifyRequest)

      toast.success("Verification status updated successfully", {
        description: `${user.first_name} ${user.last_name} has been ${data.verifyStatus.toLowerCase()}`,
      })

      onOpenChange(false)
      onSuccess?.()
      form.reset()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      toast.error("Failed to update verification status", {
        description: errorMessage,
      })
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

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Verify User Account</DialogTitle>
          <DialogDescription>
            Update the verification status for {user.first_name} {user.last_name} ({user.email})
          </DialogDescription>
        </DialogHeader>

        {/* User Info Card */}
        <div className="rounded-lg border p-4 bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user.first_name.charAt(0)}
                {user.last_name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <div className="font-medium">
                {user.first_name} {user.last_name}
              </div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
            <div className="flex items-center gap-1">
              {getStatusIcon(user.verify_status)}
              <span className={`text-sm font-medium ${getStatusColor(user.verify_status)}`}>{user.verify_status}</span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="verifyStatus"
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
      </DialogContent>
    </Dialog>
  )
}
