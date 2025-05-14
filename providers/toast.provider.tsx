'use client';

import { createContext, useContext, ReactNode } from "react";
import { toast } from "sonner";
import { CustomToast } from "@/components/custom.toast";

type ToastType = 'success' | 'error' | 'info' | 'loading';

interface ToastContextType {
  success: (message: string, options?: { id?: string | number }) => string | number;
  error: (message: string, options?: { id?: string | number }) => string | number;
  info: (message: string, options?: { id?: string | number }) => string | number;
  loading: (message: string, options?: { id?: string | number}) => string | number;
  dismiss: (id: string | number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const show = (
    type: ToastType,
    message: string,
    options?: { id?: string | number }
  ): string | number => {
    const toastId = options?.id ?? Math.random().toString(36).substr(2, 9); // fallback id
    toast.custom(() => <CustomToast type={type} message={message} />, {
      id: toastId,
    });
    return toastId;
  };

  const value: ToastContextType = {
    success: (msg, opts) => show("success", msg, opts),
    error: (msg, opts) => show("error", msg, opts),
    info: (msg, opts) => show("info", msg, opts),
    loading: (msg, opts) => show("loading", msg, opts),
    dismiss: (id) => toast.dismiss(id),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
