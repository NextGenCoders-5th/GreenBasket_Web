import { Loader2 } from "lucide-react"

export function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Loading users...</p>
    </div>
  )
}
