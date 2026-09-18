"use client"

import { useQuery } from "@tanstack/react-query"

import { fetchCompanyCounts } from "@/lib/companies"

export function useCompanies() {
  return useQuery({
    queryKey: ["company-counts"],
    queryFn: fetchCompanyCounts,
    staleTime: 5 * 60 * 1000,
  })
}
