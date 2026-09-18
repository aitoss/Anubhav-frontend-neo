import Link from "next/link"

import { Button, type ButtonProps } from "@workspace/ui/components/button"

type ButtonLinkProps = Omit<ButtonProps, "render" | "onClick"> & {
  href: string
}

// Renders a real anchor rather than a button with router.push: these are
// navigations, so they need to be crawlable, middle-clickable and announced
// as links.
export function ButtonLink({ href, children, ...props }: ButtonLinkProps) {
  return (
    <Button {...props} render={<Link href={href} />}>
      {children}
    </Button>
  )
}
