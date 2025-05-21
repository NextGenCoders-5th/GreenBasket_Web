import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ClassName } from '@/enums/classnames.enum';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TooltipWrapper } from '../tooltip.wrapper';
import { useToast } from '@/providers/toast.provider';

export type FeatureDeleteActionType = () => [unknown, { isLoading: boolean }];
interface Props {
  useDelete: FeatureDeleteActionType;
  feature: string;
  featureId?: string;
  redirectUrl: string;
  iconOnly?: boolean;
  triggerContent?: React.ReactNode;
}
export default function DeleteFeature({ useDelete, feature, featureId, redirectUrl, triggerContent, iconOnly = false }: Props) {
  const toast = useToast();
  const [deleteFeature, { isLoading }] = useDelete() as [(id: string) => Promise<unknown>, { isLoading: boolean }];
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const onConfirm = () => {
    if (!featureId) {
      toast.error(`There is no ${feature} id to delete`);
      return;
    }
    const toastId = toast.loading(`Deleting ${feature}...`);
    try {
      deleteFeature(featureId)
        .then(() => {
          toast.success(`${feature} deleted successfully`, { id: toastId });
          setIsOpen(false);
          router.push(redirectUrl);
        })
        .catch((err) => {
          if (err.status === 'UNKNOWN_ERROR') {
            toast.error(`Failed to delete ${feature}`);
          } else {
            toast.error(err.message || `Failed to delete ${feature}`, {
              id: toastId,
            });
          }
        });
    } catch (error) {
      toast.error(`Failed to delete ${feature}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipWrapper
        title={`Delete ${feature}`}
        className="bg-red-600"
        arroClassName='bg-red-600 fill-red-600'
      >
        <DialogTrigger asChild>
          {triggerContent || <button className={` ${ClassName.BUTTON} bg-red-500/90 hover:bg-red-500`}>
            <Trash className="w-4 h-4" />
            {!iconOnly && <span className="hidden sm:inline">Delete {feature}</span>}
          </button>}

        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent className="max-w-sm bg-slate-200">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">Are you sure you want to delete this {feature}? This action cannot be undone.</p>
        <DialogFooter className="flex flex-col md:flex-row gap-2">
          <button disabled={isLoading} onClick={() => setIsOpen(false)} className="px-4 py-1 cursor-pointer disabled:cursor-not-allowed bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={() => {
              onConfirm();
              setIsOpen(false);
            }}
            className="px-3 py-1  cursor-pointer text-sm disabled:cursor-not-allowed  bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
