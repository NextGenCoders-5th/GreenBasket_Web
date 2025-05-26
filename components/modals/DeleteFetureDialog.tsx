"use client"

import type React from "react"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash, AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { TooltipWrapper } from "../tooltip.wrapper"
import { useToast } from "@/providers/toast.provider"

export type FeatureDeleteActionType = () => [unknown, { isLoading: boolean }]

interface Props {
  useDelete: FeatureDeleteActionType
  feature: string
  featureId?: string
  redirectUrl: string
  iconOnly?: boolean
  triggerContent?: React.ReactNode
  onSuccess?: () => void
}

export default function DeleteFeature({
  useDelete,
  feature,
  featureId,
  redirectUrl,
  triggerContent,
  iconOnly = false,
  onSuccess,
}: Props) {
  const toast = useToast()
  const [deleteFeature, { isLoading }] = useDelete() as [(id: string) => Promise<unknown>, { isLoading: boolean }]
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const onConfirm = async () => {
    if (!featureId) {
      toast.error(`There is no ${feature} id to delete`)
      return
    }

    const toastId = toast.loading(`Deleting ${feature}...`)

    try {
      await deleteFeature(featureId)
      toast.success(`${feature} deleted successfully`, { id: toastId })
      if (onSuccess) {
        onSuccess()
      }else{
        setIsOpen(false)
      }
      router.push(redirectUrl)
    } catch (err: any) {
      if (err.status === "UNKNOWN_ERROR") {
        toast.error(`Failed to delete ${feature}`, { id: toastId })
      } else {
        toast.error(err.message || `Failed to delete ${feature}`, { id: toastId })
      }
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipWrapper title={`Delete ${feature}`} className="bg-red-600" arroClassName="bg-red-600 fill-red-600">
        <DialogTrigger asChild>
          {triggerContent || (
            <Button
              variant="destructive"
              size={iconOnly ? "icon" : "default"}
              className="bg-red-500 hover:bg-red-600 transition-colors"
            >
              <Trash className="w-4 h-4" />
              {!iconOnly && <span className="hidden sm:inline ml-2">Delete {feature}</span>}
            </Button>
          )}
        </DialogTrigger>
      </TooltipWrapper>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">Delete {feature}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">This action cannot be undone</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-800">
              Are you sure you want to delete this {feature}? This will permanently remove all associated data and
              cannot be recovered.
            </AlertDescription>
          </Alert>

          <div className="rounded-lg border border-red-200 bg-red-50/50 p-3">
            <p className="text-sm font-medium text-red-900">What will be deleted:</p>
            <ul className="mt-2 text-sm text-red-700 space-y-1">
              <li>• All {feature} data</li>
              <li>• Associated files and records</li>
              <li>• Related configurations</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Deleting..." : `Delete ${feature}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
