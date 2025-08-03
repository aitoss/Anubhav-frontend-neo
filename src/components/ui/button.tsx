import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center select-none gap-2 whitespace-nowrap rounded-lg text-sm font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-0 cursor-pointer focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-0 aria-invalid:ring-destructive/0 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive/0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-t from-primary to-primary/90 border border-primary text-primary-foreground shadow-xs hover:bg-primary/90 inset-shadow-[0_1px_rgb(255_255_255/0.35)]",
        destructive:
          "bg-gradient-to-t from-destructive to-destructive/90 text-white border border-destructive-foreground shadow-xs hover:bg-destructive/90 inset-shadow-[0_1px_rgb(255_255_255/0.35)] focus-visible:ring-destructive/0 dark:focus-visible:ring-destructive/0 dark:bg-destructive/60",
        outline:
          "border bg-gradient-to-t from-accent/50 to-background shadow-xs hover:from-accent/50 hover:to-accent/50 hover:text-accent-foreground inset-shadow-[0_1px_rgb(255_255_255)] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "bg-gradient-to-t from-accent/50 to-background hover:bg-gradient-to-t from-accent to-accent/90 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
