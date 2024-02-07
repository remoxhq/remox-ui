import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center overflow-hidden justify-center whitespace-nowrap ring-offset-background transition-all duration-200 ease-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        create:
        "border border-input bg-background hover:text-brand text-base lg:text-sm font-semibold text-whitish rounded-brandPrimary disabled:opacity-70 ",
        logout:
        "bg-transparent hover:text-brand rounded-brandPrimary",
        connect:
        "border border-input bg-background hover:text-brand text-base lg:text-sm rounded-brandPrimary font-semibold text-whitish",
        mobileDrawer:
        "bg-transparent hover:text-brand rounded-brandPrimary",
        add:
        "bg-foreground hover:bg-background rounded-[6px] text-whitish disabled:text-whitish",
        remove:
        "bg-removeRed hover:bg-removeRedHover rounded-[6px] text-whitish",
        brand:
        "bg-brand rounded-[8px] text-whitish text-sm font-medium hover:bg-brand/90",
        close:
        "bg-transparent rounded-[8px] text-whitish text-sm font-medium border hover:bg-foreground/40"
      },
      size: {
        mobileDrawer:"h-6 w-6 md:h-7 md:w-7",
        logout: "h-4 w-4",
        connect:"h-7 lg:h-8 px-3 py-2",
        create:"h-7 lg:h-8 px-3 py-2",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        add:"h-5 w-5",
        brand:"w-[120px] h-9"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
