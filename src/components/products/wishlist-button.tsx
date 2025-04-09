
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  className?: string;
}

export function WishlistButton({
  productId,
  productName,
  productPrice,
  productImage,
  className
}: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(productId);
  
  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeItem(productId);
    } else {
      addItem({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
      });
    }
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("rounded-full", className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleWishlist();
      }}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        className={cn(
          "h-5 w-5 transition-colors", 
          inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
        )} 
      />
    </Button>
  );
}
