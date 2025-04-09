
import { Link } from "react-router-dom";
import { ImageLazy } from "@/components/ui/image-lazy";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { WishlistButton } from "@/components/products/wishlist-button";
import { PriceTag } from "@/components/ui/price-tag";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, discountedPrice, images } = product;
  
  return (
    <div className="group relative flex flex-col">
      <Link to={`/products/${id}`} className="relative aspect-square w-full overflow-hidden rounded-lg">
        <ImageLazy
          src={images[0]}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {discountedPrice && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
            Sale
          </div>
        )}
        
        <div className="absolute top-2 right-2 z-10">
          <WishlistButton 
            productId={id}
            productName={name}
            productPrice={discountedPrice || price}
            productImage={images[0]}
            className="bg-white hover:bg-white/90"
          />
        </div>
      </Link>
      
      <div className="mt-4 space-y-2">
        <Link to={`/products/${id}`} className="block">
          <h3 className="font-medium leading-tight">{name}</h3>
        </Link>
        
        <div className="flex items-center gap-2">
          <PriceTag 
            price={price} 
            discountedPrice={discountedPrice}
          />
        </div>
        
        <div className="flex justify-between items-center gap-2 pt-2">
          <Link to={`/products/${id}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View details
          </Link>
          
          <Button variant="outline" size="icon">
            <ShoppingBag className="h-[18px] w-[18px]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
