import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-lg font-semibold text-gray-800 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-black peer-focus:scale-110 peer-focus:font-medium",
  {
    variants: {
      size: {
        default: "text-lg",
        sm: "text-sm",
        lg: "text-xl",
      },
      color: {
        default: "text-gray-800",
        primary: "text-black",
        secondary: "text-black",
        accent: "text-pink-600",
      },
    },
    defaultVariants: {
      size: "default",
      color: "default",
    },
  }
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, size, color, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ size, color }), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
