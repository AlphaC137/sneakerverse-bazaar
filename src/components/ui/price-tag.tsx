
import { cn } from "@/lib/utils";

interface PriceTagProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  currency?: string;
  size?: "sm" | "default" | "lg";
  discountedPrice?: number;
}

export function PriceTag({
  price,
  currency = "$",
  size = "default",
  discountedPrice,
  className,
  ...props
}: PriceTagProps) {
  const sizeClasses = {
    sm: "text-sm",
    default: "text-base",
    lg: "text-lg font-medium",
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedPrice = formatter.format(price);
  
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {discountedPrice ? (
        <>
          <span className={cn("line-through text-muted-foreground", sizeClasses.sm)}>
            {currency}{formatter.format(discountedPrice)}
          </span>
          <span className={cn("font-medium text-primary", sizeClasses[size])}>
            {currency}{formattedPrice}
          </span>
        </>
      ) : (
        <span className={cn("font-medium", sizeClasses[size])}>
          {currency}{formattedPrice}
        </span>
      )}
    </div>
  );
}
