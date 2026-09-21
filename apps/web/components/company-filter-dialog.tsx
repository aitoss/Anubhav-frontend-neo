"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { FunnelIcon } from "@heroicons/react/24/solid"

import { Button } from "@workspace/ui/components/button"

import { CompanyFilterList } from "@/components/company-filter"

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
            <FunnelIcon className="size-4" />
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
