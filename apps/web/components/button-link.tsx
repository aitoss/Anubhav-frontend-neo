"use client"

import { useRouter } from "next/navigation"

import { Button, type ButtonProps } from "@workspace/ui/components/button"

type ButtonLinkProps = Omit<ButtonProps, "render" | "onClick"> & {
  href: string
}

export function ButtonLink({ href, children, ...props }: ButtonLinkProps) {
  const router = useRouter()

  return (
    <Button
      {...props}
      onClick={() => {
        router.push(href)
      }}
    >
      {children}
    </Button>
  )
}