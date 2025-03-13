
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "@/components/ui/use-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === product.id && item.size === product.size
        );

        if (existingItemIndex > -1) {
          // Update quantity if item already exists
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += product.quantity;
          
          set({ items: updatedItems });
          toast({
            title: "Added to Cart",
            description: `Updated ${product.name} (Size: ${product.size}) quantity to ${updatedItems[existingItemIndex].quantity}`,
          });
        } else {
          // Add new item
          set({ items: [...currentItems, product] });
          toast({
            title: "Added to Cart",
            description: `${product.name} (Size: ${product.size}) added to your cart`,
          });
        }
      },
      
      removeItem: (id, size) => {
        const currentItems = get().items;
        const filteredItems = currentItems.filter(
          (item) => !(item.id === id && item.size === size)
        );
        
        set({ items: filteredItems });
        toast({
          title: "Removed from Cart",
          description: "Item has been removed from your cart",
        });
      },
      
      updateQuantity: (id, size, quantity) => {
        const currentItems = get().items;
        const updatedItems = currentItems.map((item) => {
          if (item.id === id && item.size === size) {
            return { ...item, quantity };
          }
          return item;
        });
        
        set({ items: updatedItems });
      },
      
      clearCart: () => {
        set({ items: [] });
        toast({
          title: "Cart Cleared",
          description: "All items have been removed from your cart",
        });
      },
    }),
    {
      name: "sneakverse-cart",
    }
  )
);
