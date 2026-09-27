"use client"

import * as React from "react"

import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import { ARTICLE_ROLES, type ArticleFilters } from "@/lib/articles"

// The archive starts in 2021; a couple of spare years costs nothing and saves
// a request just to learn which years exist.
const FIRST_YEAR = 2020

function years() {
  const now = new Date().getFullYear()
  return Array.from({ length: now - FIRST_YEAR + 1 }, (_, i) => String(now - i))
}

function toggle(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((entry) => entry !== value)
    : [...values, value]
}

function FilterMenu({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: readonly string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
        {label}
        {selected.length > 0 ? (
          <span className="bg-foreground text-background rounded-full px-1.5 text-xs">
            {selected.length}
          </span>
        ) : null}
        <ChevronDownIcon className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selected.includes(option)}
            // closeOnClick would shut the menu after every tick, and these are
            // meant to be picked a few at a time.
            closeOnClick={false}
            onClick={() => onToggle(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ArticleFilterBar({
  filters,
  onChange,
}: {
  filters: ArticleFilters
  onChange: (filters: ArticleFilters) => void
}) {
  const active = [
    ...filters.roles.map((value) => ({ value, key: "roles" as const })),
    ...filters.years.map((value) => ({ value, key: "years" as const })),
  ]

  return (
    <>
      <FilterMenu
        label="Role"
        options={ARTICLE_ROLES}
        selected={filters.roles}
        onToggle={(value) => onChange({ ...filters, roles: toggle(filters.roles, value) })}
      />
      <FilterMenu
        label="Year"
        options={years()}
        selected={filters.years}
        onToggle={(value) => onChange({ ...filters, years: toggle(filters.years, value) })}
      />

      {active.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1.5">
          {active.map(({ value, key }) => (
            <button
              key={`${key}-${value}`}
              type="button"
              onClick={() =>
                onChange({ ...filters, [key]: filters[key].filter((v) => v !== value) })
              }
              className="border-border text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
            >
              {value}
              <XMarkIcon className="size-3" />
            </button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={() => onChange({ roles: [], years: [] })}
          >
            Clear all
          </Button>
        </div>
      ) : null}
    </>
  )
}
