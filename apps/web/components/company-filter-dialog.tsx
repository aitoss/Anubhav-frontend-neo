"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"

import { CompanyFilterList } from "@/components/company-filter"

// The sidebar is hidden below lg, so small screens get the same filter in a
// dialog. Icon is the funnel from master's Stories page.
function FilterIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5.3999 2.1001H18.5999C19.6999 2.1001 20.5999 3.0001 20.5999 4.1001V6.3001C20.5999 7.1001 20.0999 8.1001 19.5999 8.6001L15.2999 12.4001C14.6999 12.9001 14.2999 13.9001 14.2999 14.7001V19.0001C14.2999 19.6001 13.8999 20.4001 13.3999 20.7001L11.9999 21.6001C10.6999 22.4001 8.8999 21.5001 8.8999 19.9001V14.6001C8.8999 13.9001 8.4999 13.0001 8.0999 12.5001L4.2999 8.5001C3.7999 8.0001 3.3999 7.1001 3.3999 6.5001V4.2001C3.3999 3.0001 4.2999 2.1001 5.3999 2.1001Z" />
      <path d="M10.93 2.1001L6 10.0001" />
    </svg>
  )
}

type Props = {
  activeCompany?: string
  onSelect: (company: string) => void
}

export function CompanyFilterDialog({ activeCompany, onSelect }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            aria-label="Filter by company"
          >
            <FilterIcon />
            Filter
          </Button>
        }
      />
      {/* The header stays put and only the list scrolls — reusing the sidebar's
          sticky heading here let rows slide over the title. */}
      <DialogContent className="flex max-h-[80vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-sm">
        <DialogTitle className="border-border shrink-0 border-b px-4 py-3 text-base font-medium">
          Filter by Company
        </DialogTitle>
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          <CompanyFilterList
            activeCompany={activeCompany}
            onSelect={(company) => {
              onSelect(company)
              setOpen(false)
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
