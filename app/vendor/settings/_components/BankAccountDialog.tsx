"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CreditCard, Loader2 } from "lucide-react"
import { useAddBankAccountMutation } from "@/redux/api/vendor.api"
import { useToast } from "@/providers/toast.provider"
import { ErrorEnum } from "@/enums/error.enum"
import { userApi, UserTags } from "@/redux/api/user.api"

const bankAccountSchema = z.object({
  account_name: z.string().min(1, "Account name is required"),
  account_number: z.string().min(10, "Account number must be at least 10 digits"),
  bank_name: z.string().min(1, "Bank name is required"),
})

type BankAccountFormValues = z.infer<typeof bankAccountSchema>

interface BankAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bankAccount?: any
  onSave: (data: BankAccountFormValues) => void
}

export default function BankAccountDialog({ open, onOpenChange, bankAccount, onSave }: BankAccountDialogProps) {
  const toast = useToast()
  const isEditing = !!bankAccount
  const [addBankAccount, { isLoading }] = useAddBankAccountMutation()
  const form = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      account_name: "",
      account_number: "",
      bank_name: "",
    },
  })

  useEffect(() => {
    if (bankAccount) {
      form.reset({
        account_name: bankAccount.account_name || "",
        account_number: bankAccount.account_number || "",
        bank_name: bankAccount.bank_name || "",
      })
    } else {
      form.reset({
        account_name: "",
        account_number: "",
        bank_name: "",
      })
    }
  }, [bankAccount, form])



  const onSubmit = async (data: BankAccountFormValues) => {

    const toastId = toast.loading('Adding bank account...');
    try {
      await addBankAccount(data)
        .unwrap()
        .then(() => {
          toast.success('Bank Account added successfully', { id: toastId });
          form.reset();
          onOpenChange(false);
          onSave(data);
          userApi.util.invalidateTags([UserTags.CURRENT_USER])
        })
        .catch((error) => {
          if (error.status === ErrorEnum.UNKOWN_ERROR)
            toast.error('Adding bank account failed. Please try again.', { id: toastId });
          else {
            toast.error(error.message || 'An error occurred', {
              id: toastId,
            });
          }
        });
    } catch (error) {
      console.error("Error adding bank account:", error)
      toast.error("Failed to bank bank account. Please try again.", {
        id: toastId,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-green-500" />
            {isEditing ? "Edit Bank Account" : "Add New Bank Account"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the bank account information below."
              : "Enter the bank account details for this vendor."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="bank_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Commercial Bank of Ethiopia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Casper LLC Business Account" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 1234567890123456"
                      {...field}
                      onChange={(e) => {
                        // Remove any non-numeric characters
                        const value = e.target.value.replace(/\D/g, "")
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isEditing ? "Update Account" : "Add Account"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
