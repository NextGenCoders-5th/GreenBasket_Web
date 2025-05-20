import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VendorStatus } from '@/enums/status.enum';
import { useUpdateVendorMutation } from '@/redux/api/vendor.api';
import { ErrorEnum } from '@/enums/error.enum';
import DropDownInput from '@/app/_components/DropdownInput';
import { useForm } from 'react-hook-form';
import { toTitleCase } from '@/util/string';
import { ClassName } from '@/enums/classnames.enum';
import { TooltipWrapper } from '@/components/tooltip.wrapper';
import { useToast } from '@/providers/toast.provider';

interface Props {
    currentStatus: VendorStatus;
    vendorId: string;
}
interface FormData {
    status: VendorStatus;
}
export default function UpdateVendorStatusModal({ currentStatus, vendorId }: Props) {

    // TOAST: toast instance to toast messages
    const toast  = useToast()
    // STATE: to handle the modal open and close
    const [open, setOpen] = useState(false);

    // FORM HANDLER INSTANCE
    const { handleSubmit, register, setValue, getValues, reset } = useForm<FormData>({
        defaultValues: {
            status: currentStatus,
        }
    })

    // UPDATE VENDOR METHOD INSTANCE
    const [updateVendorStatus, { isLoading }] = useUpdateVendorMutation()

    // METHOD: to handle the form submission
    const handleSave = (data: FormData) => {

        if (data.status === currentStatus) {
            toast.info("Please select other than the current status")
            return;
        }
        const toastId = toast.loading(`Adding vendor to ${data.status} list`)
        updateVendorStatus({ vendorId, vendorData: data }).unwrap().then((res) => {
            toast.success(`Vendor is added to ${data.status} list`, { id: toastId });
            setOpen(false);
            reset();
        }).catch((err) => {
            if (err.status === ErrorEnum.UNKOWN_ERROR) {
                toast.error('Failed to update vendor status. Please try again.', { id: toastId });
            }
            else {
                toast.error(err.message || `Failed to update vendor status`, {
                    id: toastId,
                });
            }

        })
    };

    const handleCancel = () => {
        setOpen(false);

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <TooltipWrapper
                title={`Update Vendor Status from ${toTitleCase(currentStatus)}`}>
                <DialogTrigger asChild>
                    <Button className={ClassName.BUTTON + " bg-green-500/90 hover:bg-green-500"}>
                        <span className="hidden sm:inline">Update Status</span>
                    </Button>
                </DialogTrigger>
            </TooltipWrapper>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Vendor Status</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSave)} className="">
                    <DropDownInput
                        placeholder="Select Status"
                        {...register("status", { required: "Status is required" })}
                        setValue={(value) => setValue('status', value)}
                        options={
                            Object.values(VendorStatus).map(status => ({
                                label: toTitleCase(status),
                                value: status
                            }))
                        }
                    />
                    {/* Buttons to cancel and update the status  */}
                    <div className="flex items-center gap-3 justify-end">
                        <button onClick={handleCancel} type='reset' className={ClassName.BUTTON}>
                            Cancl
                        </button>
                        <button disabled={isLoading} type='submit' className={ClassName.BUTTON + " bg-accent-600/80 hover:bg-accent-600"}>
                            {toTitleCase(getValues().status)}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
