import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full border border-transparent font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 outline-none select-none active:scale-[0.985] focus-visible:ring-4 focus-visible:ring-focus/20 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[#2750d6] shadow-[var(--shadow-cta)]",
        outline: "border-input bg-card text-foreground hover:border-foreground/30 hover:bg-card shadow-[0_1px_2px_rgb(20_27_45/0.04)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-[#dde6fa]",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        sun: "bg-sun text-ink hover:bg-[#f2bb33] shadow-[0_1px_0_rgb(255_255_255/0.35)_inset]",
        white: "bg-white text-ink hover:bg-white/90",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 gap-2 px-5 text-sm",
        xs: "h-7 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-4 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-[52px] gap-2.5 px-7 text-base",
        icon: "size-10",
        "icon-sm": "size-9",
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
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
