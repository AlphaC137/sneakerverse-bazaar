
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PriceTag } from "@/components/ui/price-tag";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/hooks/use-cart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/components/ui/use-toast";

const Checkout = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "South Africa",
    saveInfo: false,
    paymentMethod: "credit-card", // default payment method
  });

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormValues({
      ...formValues,
      paymentMethod: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formValues.firstName || !formValues.lastName || !formValues.email || 
        !formValues.address || !formValues.city || !formValues.postalCode) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Process order
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate("/order-confirmation", { 
        state: { 
          orderNumber: `NK-${Math.floor(100000 + Math.random() * 900000)}`,
          orderDate: new Date().toISOString(),
          total
        } 
      });
    }, 2000);
  };

  // Empty cart redirect
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="container max-w-4xl mx-auto text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-6">Add something to your cart before checking out.</p>
            <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Checkout Form */}
            <div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  {/* Contact Information */}
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formValues.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formValues.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Shipping Address */}
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formValues.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formValues.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code *</Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            value={formValues.postalCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formValues.country}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="saveInfo"
                          name="saveInfo"
                          checked={formValues.saveInfo}
                          onCheckedChange={(checked) => 
                            setFormValues({
                              ...formValues, 
                              saveInfo: checked as boolean
                            })
                          }
                        />
                        <Label htmlFor="saveInfo" className="text-sm font-normal">
                          Save information for next time
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    
                    <Accordion type="single" collapsible defaultValue="credit-card">
                      <AccordionItem value="credit-card">
                        <AccordionTrigger className="py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 flex items-center justify-center rounded-full border border-black">
                              {formValues.paymentMethod === "credit-card" && (
                                <div className="w-3 h-3 rounded-full bg-black" />
                              )}
                            </div>
                            <span>Credit / Debit Card</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="py-2 space-y-4">
                            <p className="text-sm text-muted-foreground">
                              All transactions are secure and encrypted. Credit card information is never stored.
                            </p>
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                disabled={isProcessing}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input
                                  id="expiry"
                                  placeholder="MM/YY"
                                  disabled={isProcessing}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input
                                  id="cvc"
                                  placeholder="123"
                                  disabled={isProcessing}
                                />
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              For demo purposes, no real payment will be processed
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="paypal">
                        <AccordionTrigger className="py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 flex items-center justify-center rounded-full border border-black">
                              {formValues.paymentMethod === "paypal" && (
                                <div className="w-3 h-3 rounded-full bg-black" />
                              )}
                            </div>
                            <span>PayPal</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="py-2">
                            <p className="text-sm text-muted-foreground">
                              You will be redirected to PayPal to complete your purchase securely.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  
                  <div className="lg:hidden">
                    <OrderSummary 
                      items={items}
                      subtotal={subtotal}
                      shipping={shipping}
                      total={total}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full py-6 text-base"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Pay R${total.toFixed(2)}`}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="hidden lg:block">
              <OrderSummary 
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Order Summary Component
interface OrderSummaryProps {
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
}

const OrderSummary = ({ items, subtotal, shipping, total }: OrderSummaryProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex gap-3">
            <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">Size: {item.size}</p>
              <div className="flex justify-between mt-1">
                <p className="text-sm">Qty: {item.quantity}</p>
                <PriceTag price={item.price * item.quantity} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <PriceTag price={subtotal} />
        </div>
        
        <div className="flex justify-between">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <PriceTag price={shipping} />
          )}
        </div>
        
        <Separator className="my-2" />
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <PriceTag price={total} size="lg" />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
