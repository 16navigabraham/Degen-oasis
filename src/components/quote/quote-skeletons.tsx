import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DailyQuoteSkeleton() {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-24" />
                </div>
            </CardHeader>
            <CardContent className="py-6">
                <div className="space-y-4 text-center">
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <Skeleton className="h-8 w-1/2 mx-auto" />
                    <Skeleton className="h-6 w-28 mx-auto" />
                </div>
            </CardContent>
            <CardFooter>
                <div className="mx-auto flex items-center justify-center gap-2 sm:gap-4">
                    <Skeleton className="h-12 w-20 rounded-full" />
                    <Skeleton className="h-12 w-20 rounded-full" />
                    <Skeleton className="h-12 w-20 rounded-full" />
                    <Skeleton className="h-12 w-20 rounded-full" />
                </div>
            </CardFooter>
        </Card>
    )
}

export function QuoteHistorySkeleton() {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48 mx-auto" />
        <div className="relative space-y-4 after:absolute after:inset-y-0 after:left-4 after:w-0.5 after:bg-border/50">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="relative pl-10">
              <div className="absolute left-4 top-4 z-10 -translate-x-1/2 rounded-full bg-muted p-1.5">
                  <div className='h-2 w-2 rounded-full bg-foreground/30'></div>
              </div>
              <Card>
                <CardHeader className="pb-3">
                  <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-2/3" />
                    </div>
                </CardContent>
                <CardFooter className="flex items-center gap-4">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-12" />
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
