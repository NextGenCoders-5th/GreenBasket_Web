"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, Mail, FileText, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useRequestWithDrawalMutation } from "@/redux/api/vendor.api"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppSelector } from "@/redux/store"
import { IUser } from "@/types/user.type"
import { useToast } from "@/providers/toast.provider"
import { ErrorEnum } from "@/enums/error.enum"
import { useRequestAccountVerificationMutation } from "@/redux/api/user.api"

interface VerificationConfirmationDialogProps {
    userEmail?: string
    submissionId?: string
}

export default function VerificationRequestDialog({
    userEmail = "user@example.com",
    submissionId = "VER-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
}: VerificationConfirmationDialogProps) {

    const toast = useToast()
    const user = useAppSelector(state => state.auth.user) as IUser | null;
    const requested = user?.verify_status === 'REQUESTED';
    const isVerified = user?.verify_status === 'VERIFIED';
    const [showAnimation, setShowAnimation] = useState(false)
    const [open, setOpen] = useState(false)
    const [requestVerification, { isLoading }] = useRequestAccountVerificationMutation()


    const handleRequestVerification = async () => {
        const toastId = toast.loading("Submitting verification request...")
        try {
            await requestVerification().unwrap().then((response) => {
                toast.success("Verification request submitted successfully!", {
                })
                setOpen(true)
            }
            ).catch((error) => {
                if (error.status === ErrorEnum.UNKOWN_ERROR) {
                    toast.error('Failed to submit verification request', { id: toastId })
                } else {
                    toast.error(error.message || 'Failed to submit verification request', { id: toastId })
                }
            });
         
        } catch (error) {
            console.error("Verification request failed:", error)
            toast.error('Failed to submit verification request', { id: toastId })
        }
    }
    useEffect(() => {
        if (open) {
            // Trigger animation after dialog opens
            const timer = setTimeout(() => setShowAnimation(true), 200)
            return () => clearTimeout(timer)
        } else {
            setShowAnimation(false)
        }
    }, [open])

    const nextSteps = [
        {
            icon: <Mail className="w-5 h-5" />,
            title: "Email Confirmation",
            description: "Check your email for a confirmation message",
            timeframe: "Within 5 minutes",
        },
        {
            icon: <FileText className="w-5 h-5" />,
            title: "Document Review",
            description: "Our team will review your submitted documents",
            timeframe: "1-3 business days",
        },
        {
            icon: <CheckCircle className="w-5 h-5" />,
            title: "Account Activation",
            description: "Your account will be fully activated upon approval",
            timeframe: "After review completion",
        },
    ]

    return (
        <Dialog open={open} onOpenChange={(set) => {
            setOpen(set)
        }}>
            <DialogTrigger asChild>
                {
                    user?.is_verified ? (
                        <Button variant="default" className="cursor-not-allowed" disabled>
                            Account Verified
                        </Button>
                    ) : requested ? (
                        <Button variant="default"  >
                            Verification Requested
                        </Button>
                    ) : (
                        <Button variant="default" className="cursor-pointer">
                            Request Verification
                        </Button>
                    )
                }

            </DialogTrigger>
            <DialogContent className="w-fit min-w-xl ">

                {
                    requested ?
                        (

                            <ScrollArea className=" w-full scrollbar-custom p-3 h-[80vh] overflow-auto  mx-auto">
                                <div className="text-center space-y-6">
                                    {/* Success Animation */}
                                    <div className="relative flex justify-center">
                                        <div
                                            className={`relative transition-all duration-700 ease-out ${showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"
                                                }`}
                                        >
                                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-12 h-12 text-primary" />
                                            </div>
                                            {/* Ripple effect */}
                                            <div
                                                className={`absolute inset-0 bg-primary/20 rounded-full transition-all duration-1000 ease-out ${showAnimation ? "scale-150 opacity-0" : "scale-100 opacity-100"
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <DialogHeader className="space-y-3">
                                        <DialogTitle className="text-2xl font-semibold text-primary">
                                            Verification Request Submitted!
                                        </DialogTitle>
                                        <DialogDescription className="text-base">
                                            Thank you for submitting your verification documents. We've received your request and will begin
                                            processing it shortly.
                                        </DialogDescription>
                                    </DialogHeader>

                                    {/* Submission Details */}
                                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Submission ID:</span>
                                            <Badge variant="secondary" className="font-mono">
                                                {submissionId}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Email:</span>
                                            <span className="text-sm text-muted-foreground">{userEmail}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Status:</span>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-amber-500" />
                                                <span className="text-sm font-medium text-amber-600">Under Review</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Next Steps */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-left">What happens next?</h3>
                                        <div className="space-y-3">
                                            {nextSteps.map((step, index) => (
                                                <div key={index} className="flex items-start gap-3 text-left">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                                                        {step.icon}
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-medium text-sm">{step.title}</h4>
                                                            <span className="text-xs text-muted-foreground">{step.timeframe}</span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Important Notice */}
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                                        <div className="flex items-start gap-2">
                                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-white text-xs font-bold">!</span>
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-medium text-blue-900 text-sm">Important Notice</h4>
                                                <p className="text-sm text-blue-700">
                                                    Please ensure your email notifications are enabled. We'll send updates about your verification status
                                                    to <strong>{userEmail}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <Button variant="outline" onClick={() => setOpen(false)} className="flex-1 border text-accent border-accent-500 hover:border-accent-600 ">
                                            Close 
                                        </Button>

                                    </div>

                                    {/* Support Link */}
                                    <p className="text-xs text-muted-foreground">
                                        Need help?{" "}
                                        <button className="text-primary hover:underline font-medium">Contact our support team</button>
                                    </p>
                                </div>
                            </ScrollArea>
                        )
                        : (
                            <ScrollArea className="w-full scrollbar-custom max-h-[80vh] overflow-auto mx-auto">
                                <div className="text-center space-y-6">
                                    <div className="relative flex justify-center">
                                        <div
                                            className={`relative transition-all duration-700 ease-out ${showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"
                                                }`}
                                        >
                                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                                                <Clock className="w-12 h-12 text-red-500" />
                                            </div>
                                            <div
                                                className={`absolute inset-0 bg-red-200 rounded-full transition-all duration-1000 ease-out ${showAnimation ? "scale-150 opacity-0" : "scale-100 opacity-100"
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <DialogHeader className="space-y-3">
                                        <DialogTitle className="text-2xl font-semibold text-red-600">
                                            Verification Required
                                        </DialogTitle>
                                        <DialogDescription className="text-base text-muted-foreground">
                                            Your account is not yet verified. Please submit your verification documents to proceed.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <Button variant="default" onClick={() => handleRequestVerification()} disabled={isLoading} className="w-full">
                                        {isLoading ? "Submitting..." : "Submit Verification Request"}
                                    </Button>

                                    <p className="text-xs text-muted-foreground">
                                        Need help?{" "}
                                        <button className="text-primary hover:underline font-medium">Contact our support team</button>
                                    </p>
                                </div>
                            </ScrollArea>

                        )
                }
            </DialogContent>
        </Dialog>
    )
}
