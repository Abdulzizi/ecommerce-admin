import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define alert variants using class-variance-authority
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 flex items-start space-x-4",
  {
    variants: {
      variant: {
        default:
          "bg-gray-100 border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100",
        destructive:
          "bg-red-50 border-red-300 text-red-900 dark:bg-red-800 dark:border-red-700 dark:text-red-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Main Alert component
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

// AlertTitle component
const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight text-gray-900 dark:text-gray-100",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

// AlertDescription component
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-gray-700 dark:text-gray-200",
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
