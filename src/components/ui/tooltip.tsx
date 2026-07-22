import * as React from "react";
import * as TooltipPrimitive from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

function TooltipProvider({ children, ...props }: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Tooltip.Root>) {
  return <TooltipPrimitive.Tooltip.Root {...props}>{children}</TooltipPrimitive.Tooltip.Root>;
}
TooltipProvider.displayName = "TooltipProvider";

function Tooltip({ ...props }: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Tooltip.Root>) {
  return <TooltipPrimitive.Tooltip.Root {...props} />;
}
Tooltip.displayName = "Tooltip";

function TooltipTrigger({ delay = 300, closeDelay = 0, ...props }: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Tooltip.Trigger> & { delay?: number; closeDelay?: number }) {
  return <TooltipPrimitive.Tooltip.Trigger delay={delay} closeDelay={closeDelay} {...props} />;
}
TooltipTrigger.displayName = "TooltipTrigger";

function TooltipPopup({ className, ...props }: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Tooltip.Popup>) {
  return (
    <TooltipPrimitive.Tooltip.Popup
      className={cn(
        "z-50 overflow-hidden rounded-md bg-(--text-primary) px-3 py-1.5 text-xs text-(--bg-primary) shadow-md outline-none",
        className
      )}
      {...props}
    />
  );
}
TooltipPopup.displayName = "TooltipPopup";

function TooltipArrow({ className, ...props }: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Tooltip.Arrow>) {
  return (
    <TooltipPrimitive.Tooltip.Arrow className={cn("fill-(--text-primary) drop-shadow-sm", className)} {...props} />
  );
}
TooltipArrow.displayName = "TooltipArrow";

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipPopup, TooltipArrow };
