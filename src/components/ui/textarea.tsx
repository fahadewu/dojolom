import * as React from "react"

import { cn } from "@/lib/utils"
import { fieldClasses } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldClasses, "block min-h-32 resize-y py-3 leading-7", className)}
      {...props}
    />
  )
}

export { Textarea }
