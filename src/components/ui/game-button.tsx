import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gameButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        hand: "border-2 border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md transition-all duration-200",
        "hand-selected": "border-2 border-primary bg-primary text-primary-foreground shadow-md scale-105",
        record: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200",
        win: "bg-win text-win-foreground shadow-md hover:bg-win/90",
        lose: "bg-lose text-lose-foreground shadow-md hover:bg-lose/90",
        draw: "bg-draw text-draw-foreground shadow-md hover:bg-draw/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-8",
        hand: "h-12 w-12 rounded-full p-0 text-xs flex-col",
        "hand-lg": "h-14 w-14 rounded-full p-0 text-sm flex-col",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface GameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gameButtonVariants> {
  asChild?: boolean
}

const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(gameButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GameButton.displayName = "GameButton"

export { GameButton, gameButtonVariants }