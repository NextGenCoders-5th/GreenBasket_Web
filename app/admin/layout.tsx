import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Role } from "@/enums/role.enum"
import PermissionProvider from "@/providers/permission.provider"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
  icons: {
    icon: "/logo.png",
  },
}

interface DashboardLayoutProps {
  children: React.ReactNode
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <PermissionProvider roles={[Role.ADMIN]}>
      <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  </PermissionProvider>
  )
}
