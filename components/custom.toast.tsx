import { toast } from "sonner";
import { XCircle, CheckCircle, Info, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils"; 

export function CustomToast({
  type,
  message,
  toastId,
}: {
  type: "success" | "error" | "info" | "loading";
  message: string;
  toastId?: string | number;
}) {
  const styles = {
    success: {
      icon: <CheckCircle className="text-green-600 w-5 h-5" />,
      bg: "bg-green-100 text-green-800 border-l-4 border-l-green-600",
      xColor: "text-green-600",
    },
    error: {
      icon: <XCircle className="text-red-600 w-5 h-5" />,
      bg: "bg-red-100  text-red-800 border-l-4 border-l-red-600",
      xColor: "text-red-600",
    },
    info: {
      icon: <Info className="text-blue-600 w-5 h-5" />,
      bg: "bg-blue-100 text-blue-800 border-l-4 border-l-blue-600",
      xColor: "text-blue-600",
    },
    loading: {
      icon: <Loader2 className="animate-spin text-blue-600 w-5 h-5" />,
      bg: "bg-blue-100  text-blue-800 border-l-4 border-l-blue-600",
      xColor: "text-blue-600",
    },
  };

  const style = styles[type];

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 p-4 py-2.5  shadow-md min-w-[15rem] w-[20rem] max-w-sm",
        style.bg
      )}
    >
      <div className="flex items-center gap-2">
        {style.icon}
        <span className="text-sm font-medium">{message}</span>
      </div>
      {
        type !== "loading" && (
          <button
            onClick={() => toast.dismiss(toastId)}
            className={cn(
              "p-1 cursor-pointer",
              style.xColor
            )}
          >
            <X className="w-5 h-5" />
          </button>
        )
      }
    </div>
  );
}
