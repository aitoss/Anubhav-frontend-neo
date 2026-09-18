"use client"

import { Skeleton } from "@workspace/ui/components/skeleton"
import { cn } from "@workspace/ui/lib/utils"

import { useCompanies } from "@/hooks/use-companies"
import { getCompanyLogoUrl } from "@/lib/companies"

type CompanyFilterProps = {
  activeCompany?: string
  onSelect: (company: string) => void
}

export function CompanyFilter({ activeCompany, onSelect }: CompanyFilterProps) {
  const { data, isLoading } = useCompanies()

  // Highest article count first, matching the Vite sidebar.
  const companies = [...(data ?? [])].sort((a, b) => b.count - a.count)

  return (
    <aside className="w-full">
      <h5 className="bg-background sticky top-0 z-10 mb-2 pb-2 text-xl font-medium">Filter by Company</h5>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-full" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1 pr-1">
          {companies.map((item) => (
            <button
              key={item.company}
              type="button"
              onClick={() => onSelect(item.company)}
              className={cn(
                "hover:bg-accent flex cursor-pointer items-center justify-between rounded-md px-2 py-1 text-left transition-colors",
                activeCompany === item.company && "bg-accent",
              )}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden
                  className="size-5 shrink-0 rounded bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${getCompanyLogoUrl(item.company)})` }}
                />
                <span className="truncate text-sm">{item.company}</span>
              </span>
              <span className="bg-muted text-muted-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-light">
                {item.count}
              </span>
            </button>
          ))}
        </div>
      )}
    </aside>
  )
}
