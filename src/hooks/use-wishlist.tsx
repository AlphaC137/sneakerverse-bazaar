
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "@/components/ui/use-toast";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === product.id);
        
        if (!existingItem) {
          set({ items: [...currentItems, product] });
          toast({
            title: "Added to Wishlist",
            description: `${product.name} has been added to your wishlist`,
          });
        }
      },
      
      removeItem: (id) => {
        const currentItems = get().items;
        const filteredItems = currentItems.filter(item => item.id !== id);
        
        set({ items: filteredItems });
        toast({
          title: "Removed from Wishlist",
          description: "Item has been removed from your wishlist",
        });
      },
      
      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      },
      
      clearWishlist: () => {
        set({ items: [] });
        toast({
          title: "Wishlist Cleared",
          description: "All items have been removed from your wishlist",
        });
      },
    }),
    {
      name: "sneakverse-wishlist",
    }
  )
);
