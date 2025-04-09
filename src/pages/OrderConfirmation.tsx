
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PriceTag } from "@/components/ui/price-tag";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, orderDate, total } = location.state || {};
  
  // Format date
  const formattedDate = orderDate 
    ? new Date(orderDate).toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';
  
  // If navigated directly without order info
  if (!orderNumber) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="container max-w-xl mx-auto text-center py-16">
            <h1 className="text-2xl font-bold mb-4">No order information found</h1>
            <p className="mb-6">Please return to the shop and complete your purchase.</p>
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
        <div className="container max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg border">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-gray-600">
                Thank you for your purchase. We've received your order and will begin processing it right away.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <p className="font-medium text-sm text-gray-500">Order Number</p>
                  <p className="font-bold">{orderNumber}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="font-medium text-sm text-gray-500">Date</p>
                  <p>{formattedDate}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="font-medium text-sm text-gray-500">Total</p>
                  <PriceTag price={total} />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h2 className="font-bold text-lg mb-2">What happens next?</h2>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>We'll send a confirmation email with your order details.</li>
                  <li>Our team will prepare your order for shipping.</li>
                  <li>You'll receive tracking information once your order ships.</li>
                  <li>Your Nike products will arrive at your doorstep!</li>
                </ol>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="font-bold text-lg mb-2">Need Help?</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about your order, please contact our customer service team.
                </p>
                <p className="font-medium">support@nikestore.com</p>
                <p>+1 (800) 806-6453</p>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <Button 
                onClick={() => navigate("/shop")} 
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
