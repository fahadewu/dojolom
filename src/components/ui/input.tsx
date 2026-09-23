import * as React from "react"

import { cn } from "@/lib/utils"

export const fieldClasses =
  "w-full min-w-0 rounded-xl border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/70 shadow-[0_1px_2px_rgb(20_27_45/0.04)] transition-[border-color,box-shadow] duration-200 outline-none hover:border-foreground/25 focus-visible:border-focus focus-visible:ring-4 focus-visible:ring-focus/15 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/15 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldClasses, "flex h-12 [&[type=file]]:cursor-pointer", className)}
      {...props}
    />
  )
}

export { Input }
