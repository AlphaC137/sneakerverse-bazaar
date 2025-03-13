
import { Link } from "react-router-dom";
import { ImageLazy } from "@/components/ui/image-lazy";
import { PriceTag } from "@/components/ui/price-tag";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: "default" | "horizontal" | "minimal";
}

export function ProductCard({ 
  product, 
  className, 
  variant = "default",
}: ProductCardProps) {
  const { id, name, price, discountedPrice, images } = product;
  
  const variants = {
    default: "flex flex-col",
    horizontal: "grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] gap-4",
    minimal: "flex flex-col",
  };
  
  const imageVariants = {
    default: "aspect-[3/4] rounded-lg",
    horizontal: "aspect-square rounded-lg w-full",
    minimal: "aspect-square rounded-lg",
  };
  
  return (
    <div className={cn(
      "group relative overflow-hidden bg-background hover-lift",
      variants[variant],
      className
    )}>
      <div className="relative">
        <ImageLazy
          src={images[0]}
          alt={name}
          className={cn(imageVariants[variant])}
        />
        
        {variant !== "minimal" && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm"
              asChild
            >
              <Link to={`/products/${id}`}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">View product</span>
              </Link>
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm"
              asChild
            >
              <Link to={`/products/${id}`}>
                <ShoppingBag className="h-4 w-4" />
                <span className="sr-only">Add to cart</span>
              </Link>
            </Button>
          </div>
        )}
        
        {discountedPrice && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium animate-fade-in">
            Sale
          </div>
        )}
      </div>
      
      <div className={cn(
        "flex flex-col",
        variant === "horizontal" ? "py-2" : "mt-3"
      )}>
        <Link 
          to={`/products/${id}`}
          className="font-medium hover:underline"
        >
          {name}
        </Link>
        
        <PriceTag
          price={price}
          discountedPrice={discountedPrice}
          className="mt-1"
        />
      </div>
    </div>
  );
}
