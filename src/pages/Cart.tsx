import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ImageLazy } from "@/components/ui/image-lazy";
import { Separator } from "@/components/ui/separator";
import { Trash2, MinusCircle, PlusCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart, CartItem } from "@/hooks/use-cart";
import { PriceTag } from "@/components/ui/price-tag";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  const shipping = subtotal > 1000 ? 0 : 100;
  
  const handleQuantityChange = (item: CartItem, change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, item.size, newQuantity);
    }
  };
  
  const handleCheckout = () => {
    navigate("/checkout");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">Your Cart</h1>
          
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              {/* Cart Items */}
              <div>
                <div className="space-y-6">
                  {items.map((item) => (
                    <div 
                      key={`${item.id}-${item.size}`} 
                      className="flex gap-4 animate-fade-in"
                    >
                      <div className="flex-shrink-0">
                        <ImageLazy
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 rounded object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <Link 
                            to={`/products/${item.id}`}
                            className="font-medium hover:underline"
                          >
                            {item.name}
                          </Link>
                          
                          <PriceTag price={item.price} />
                        </div>
                        
                        <div className="text-sm text-muted-foreground mt-1">
                          Size: {item.size}
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item, 1)}
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id, item.size)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-8">
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  
                  <Button asChild variant="outline">
                    <Link to="/shop">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:sticky lg:top-24">
                <div className="border rounded-lg p-6 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <PriceTag price={subtotal} />
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span className="font-medium text-green-600">Free</span>
                      ) : (
                        <PriceTag price={shipping} />
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-medium text-base pt-2">
                      <span>Total</span>
                      <PriceTag price={totalPrice} size="lg" />
                    </div>
                  </div>
                  
                  {subtotal > 0 && subtotal < 1000 && (
                    <p className="text-xs text-muted-foreground mt-4">
                      Add R{(1000 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  
                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <div className="mt-6 text-xs text-muted-foreground text-center">
                    <p>Secure checkout powered by Stripe</p>
                    <p className="mt-1">All transactions are encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it with amazing products.
              </p>
              
              <Button asChild size="lg">
                <Link to="/shop">
                  Browse Products
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
