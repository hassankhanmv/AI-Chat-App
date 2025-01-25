import { cn } from "~/lib/utils";
import { forwardRef, type ElementType, type ComponentPropsWithoutRef } from "react";

type TextSize =
  | "h-xs"
  | "h-sm"
  | "h-md"
  | "h-lg"
  | "h-xl"
  | "h-2xl"
  | "h-3xl"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";

type TextProps<T extends ElementType> = {
  as?: T;
  size?: TextSize;
  className?: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

const sizeClasses: Record<TextSize, string> = {
// Heading sizes
"h-xs": "text-lg font-semibold",
"h-sm": "text-xl font-semibold",
"h-md": "text-2xl font-semibold",
"h-lg": "text-3xl font-semibold",
"h-xl": "text-4xl font-semibold",
"h-2xl": "text-5xl font-semibold",
"h-3xl": "text-6xl font-semibold",

// Text sizes - explicitly set font-normal to override defaults
"xs": "text-xs font-normal",
"sm": "text-sm font-normal",
"md": "text-base font-normal",
"lg": "text-lg font-normal",
"xl": "text-xl font-normal",
"2xl": "text-2xl font-normal",
"3xl": "text-3xl font-normal",
};

const Text = forwardRef<HTMLElement, TextProps<ElementType>>(
({ as, size = "md", className, children, ...props }, ref) => {
    const Component = as || (size.startsWith("h-") ? "h2" : "p");
    const isHeading = size.startsWith("h-");
    
    return (
    <Component
        ref={ref}
        className={cn(
        sizeClasses[size],
        {
            "leading-2": !isHeading,  // Fixed from leading-2 to valid Tailwind class
            "tracking-tight": isHeading, // Better heading typography
        },
        className
        )}
        {...props}
    >
        {children}
    </Component>
    );
}
);

Text.displayName = "Text";

export { Text };
export type { TextProps };