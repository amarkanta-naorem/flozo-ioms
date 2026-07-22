import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva("animate-pulse rounded-md bg-(--bg-tertiary)", {
  variants: {
    variant: {
      default: "bg-(--bg-tertiary)",
      muted: "bg-(--border-primary)",
    },
    shape: {
      default: "rounded-md",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
    shape: "default",
  },
});

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, shape, ...props }: SkeletonProps) {
  return <div className={cn(skeletonVariants({ variant, shape, className }))} {...props} />;
}

export { Skeleton, skeletonVariants };
