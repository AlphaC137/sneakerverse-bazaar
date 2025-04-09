
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ImageLazy } from "@/components/ui/image-lazy";
import { Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
  
  const handleAddToCart = (itemId: string) => {
    const size = selectedSize[itemId];
    if (!size) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    const item = items.find(i => i.id === itemId);
    if (item) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size,
        quantity: 1,
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">My Wishlist</h1>
            
            {items.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                className="text-sm"
              >
                Clear Wishlist
              </Button>
            )}
          </div>
          
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <h2 className="text-2xl font-medium">Your wishlist is empty</h2>
              <p className="text-muted-foreground">Items you add to your wishlist will appear here</p>
              <Button asChild className="mt-4">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row gap-6 p-4 border rounded-lg animate-fade-in"
                >
                  <Link 
                    to={`/products/${item.id}`}
                    className="shrink-0 w-full sm:w-32 h-32"
                  >
                    <ImageLazy 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </Link>
                  
                  <div className="flex-1 space-y-2">
                    <Link 
                      to={`/products/${item.id}`}
                      className="text-xl font-medium hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="font-semibold">
                      R{item.price.toFixed(2)}
                    </p>
                    
                    <div className="pt-2">
                      <label className="block text-sm mb-1">Select Size:</label>
                      <select
                        className="w-full sm:w-auto px-3 py-2 border rounded-md text-sm"
                        value={selectedSize[item.id] || ""}
                        onChange={(e) => setSelectedSize({...selectedSize, [item.id]: e.target.value})}
                      >
                        <option value="">Choose a size</option>
                        <option value="UK 6">UK 6</option>
                        <option value="UK 7">UK 7</option>
                        <option value="UK 8">UK 8</option>
                        <option value="UK 9">UK 9</option>
                        <option value="UK 10">UK 10</option>
                        <option value="UK 11">UK 11</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col gap-2 justify-end">
                    <Button 
                      onClick={() => handleAddToCart(item.id)} 
                      className="gap-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span className="hidden sm:inline">Add to Cart</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
