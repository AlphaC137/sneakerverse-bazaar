
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PriceTag } from "@/components/ui/price-tag";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/contexts/auth-context";
import { LoginDialog } from "@/components/auth/login-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const shippingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP Code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }
  
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  
  const onSubmit = async (data: ShippingFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate random order number
      const orderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
      const orderDate = new Date().toISOString();
      
      // Clear cart and navigate to success page
      clearCart();
      
      navigate("/order-confirmation", {
        state: {
          orderNumber,
          orderDate,
          total: totalPrice,
        },
      });
      
      toast({
        title: "Order placed!",
        description: `Your order #${orderNumber} has been placed successfully.`,
      });
    } catch (error) {
      console.error("Checkout error:", error);
      
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
      
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Shipping Information */}
            <div className="flex-1 order-2 lg:order-1">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                
                {!isAuthenticated && (
                  <div className="mb-6 p-4 bg-muted/50 rounded-md">
                    <p className="mb-2 text-sm">
                      Already have an account? Sign in for faster checkout.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowLoginDialog(true)}
                    >
                      Sign In
                    </Button>
                    
                    <LoginDialog 
                      open={showLoginDialog}
                      onOpenChange={setShowLoginDialog}
                      onSuccess={() => {
                        // Reset form with user data when logged in
                        if (user) {
                          form.setValue("firstName", user.firstName);
                          form.setValue("lastName", user.lastName);
                          form.setValue("email", user.email);
                        }
                      }}
                    />
                  </div>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        All transactions are secure and encrypted. Credit card information is never stored.
                      </p>
                      
                      {/* Simulated payment form */}
                      <div className="space-y-4 mb-8">
                        <div>
                          <label htmlFor="card-number" className="text-sm font-medium block mb-2">
                            Card Number
                          </label>
                          <Input 
                            id="card-number" 
                            placeholder="1234 5678 9012 3456" 
                            className="font-mono"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="text-sm font-medium block mb-2">
                              Expiry Date
                            </label>
                            <Input 
                              id="expiry" 
                              placeholder="MM/YY" 
                              className="font-mono"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cvc" className="text-sm font-medium block mb-2">
                              CVC
                            </label>
                            <Input 
                              id="cvc" 
                              placeholder="123" 
                              className="font-mono"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full text-base py-6" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : `Pay ${totalPrice.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}`}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-96 order-1 lg:order-2">
              <div className="bg-white p-6 rounded-lg border sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3">
                      <div className="h-16 w-16 bg-muted rounded flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Size: {item.size} | Qty: {item.quantity}
                        </p>
                        <PriceTag 
                          price={item.price * item.quantity} 
                          className="text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      {subtotal.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {(subtotal > 1000 ? 0 : 100).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
                    </span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>
                      {totalPrice.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
                    </span>
                  </div>
                  
                  {subtotal > 1000 && (
                    <p className="text-sm text-green-600 mt-2">
                      Free shipping on orders over R1,000!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
