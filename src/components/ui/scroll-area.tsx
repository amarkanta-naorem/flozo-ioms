import * as React from "react";
import * as ScrollAreaPrimitive from "@base-ui/react/scroll-area";
import { cn } from "@/lib/utils";

function ScrollArea({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollArea.Root>) {
  return (
    <ScrollAreaPrimitive.ScrollArea.Root className={cn("relative", className)} {...props}>
      {children}
      <ScrollBar />
      <ScrollCorner />
    </ScrollAreaPrimitive.ScrollArea.Root>
  );
}
ScrollArea.displayName = "ScrollArea";

function ScrollViewport({ className, ...props }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollArea.Viewport>) {
  return (
    <ScrollAreaPrimitive.ScrollArea.Viewport className={cn("h-full w-full rounded-[inherit]", className)} {...props} />
  );
}
ScrollViewport.displayName = "ScrollViewport";

function ScrollBar({ className, orientation = "vertical", ...props }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollArea.Scrollbar> & { orientation?: "vertical" | "horizontal" }) {
  return (
    <ScrollAreaPrimitive.ScrollArea.Scrollbar
      orientation={orientation}
      className={cn(
        "flex touch-none p-0.5 transition-colors select-none",
        orientation === "vertical" && "h-full w-2 border-l border-l-transparent",
        orientation === "horizontal" && "h-2 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollThumb orientation={orientation} />
    </ScrollAreaPrimitive.ScrollArea.Scrollbar>
  );
}
ScrollBar.displayName = "ScrollBar";

interface ScrollThumbProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollArea.Thumb> {
  orientation?: "vertical" | "horizontal";
}

function ScrollThumb({ className, orientation, ...props }: ScrollThumbProps) {
  return (
    <ScrollAreaPrimitive.ScrollArea.Thumb
      className={cn(
        "relative rounded-full bg-(--scrollbar-thumb) transition-colors hover:bg-(--scrollbar-thumb-hover)",
        orientation === "vertical" && "w-full min-h-11",
        orientation === "horizontal" && "h-full min-w-11",
        className
      )}
      {...props}
    />
  );
}
ScrollThumb.displayName = "ScrollThumb";

function ScrollCorner({ className, ...props }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollArea.Corner>) {
  return (
    <ScrollAreaPrimitive.ScrollArea.Corner className={cn("bg-(--bg-card)", className)} {...props} />
  );
}
ScrollCorner.displayName = "ScrollCorner";

export { ScrollArea, ScrollViewport, ScrollBar, ScrollThumb, ScrollCorner };
