import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-muted/50 relative overflow-hidden rounded-md", className)}
      {...props}
    >
        <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-muted/50 via-muted to-muted/50"></div>
    </div>
  )
}

export { Skeleton }
