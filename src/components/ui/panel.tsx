"use client";

import * as React from "react";
import * as DrawerPrimitive from "@base-ui/react/drawer";
import { cn } from "@/lib/utils";

function Panel({ open, onOpenChange, children, ...props }: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Drawer.Root>) {
  return (
    <DrawerPrimitive.Drawer.Root open={open} onOpenChange={onOpenChange} {...props}>
      {children}
    </DrawerPrimitive.Drawer.Root>
  );
}
Panel.displayName = "Panel";

function PanelContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Drawer.Content>) {
  return (
    <DrawerPrimitive.Drawer.Content className={cn("", className)} {...props}>
      {children}
    </DrawerPrimitive.Drawer.Content>
  );
}
PanelContent.displayName = "PanelContent";

function PanelViewport({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Drawer.Viewport>) {
  return (
    <DrawerPrimitive.Drawer.Viewport className={cn(className)} {...props}>
      {children}
    </DrawerPrimitive.Drawer.Viewport>
  );
}
PanelViewport.displayName = "PanelViewport";

function PanelBackdrop({ className, ...props }: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Drawer.Backdrop>) {
  return (
    <DrawerPrimitive.Drawer.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}
PanelBackdrop.displayName = "PanelBackdrop";

export { Panel, PanelContent, PanelViewport, PanelBackdrop };
