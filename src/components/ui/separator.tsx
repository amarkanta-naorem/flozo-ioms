import * as React from "react";
import * as SeparatorPrimitive from "@base-ui/react/separator";
import { cn } from "@/lib/utils";

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Separator> {
  decorative?: boolean;
}

function Separator({ className, orientation = "horizontal", decorative = true, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive.Separator
      role={decorative ? "none" : "separator"}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-(--border-primary)",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
}

Separator.displayName = "Separator";

export { Separator };
