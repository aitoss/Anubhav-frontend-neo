import { Skeleton } from "@workspace/ui/components/skeleton"

/** Mirrors step 1 of ArticleForm so the page does not jump when data lands. */
export function ArticleFormSkeleton() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 pt-32 pb-16">
      <div className="flex items-baseline justify-between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {["h-10 w-full", "h-10 w-48", "h-10 w-full", "h-10 w-full"].map(
          (size, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className={size} />
            </div>
          ),
        )}

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-36 w-full rounded-lg" />
        </div>

        <Skeleton className="h-10 w-20 self-end" />
      </div>
    </main>
  )
}
