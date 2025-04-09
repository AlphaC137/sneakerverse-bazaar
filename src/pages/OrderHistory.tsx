
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageLazy } from "@/components/ui/image-lazy";
import { useAuth } from "@/contexts/auth-context";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: "processing" | "shipped" | "delivered";
  items: OrderItem[];
}

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  
  // In a real app, this would fetch from your API
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: "ORD-1234-ABCD",
        date: "2025-03-15",
        total: 2899.94,
        status: "delivered",
        items: [
          {
            id: "1",
            name: "Air Zoom Pulse",
            price: 1899.99,
            quantity: 1,
            size: "UK 9",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop"
          },
          {
            id: "3",
            name: "Air Force 1",
            price: 999.95,
            quantity: 1,
            size: "UK 8",
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1587&auto=format&fit=crop"
          }
        ]
      },
      {
        id: "ORD-5678-EFGH",
        date: "2025-02-28",
        total: 1599.95,
        status: "shipped",
        items: [
          {
            id: "3",
            name: "Air Force 1",
            price: 1599.95,
            quantity: 1,
            size: "UK 10",
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1587&auto=format&fit=crop"
          }
        ]
      }
    ];
    
    // Simulate API delay
    setTimeout(() => setOrders(mockOrders), 500);
  }, [user]);
  
  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrder(prevSelected => prevSelected === orderId ? null : orderId);
  };
  
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "shipped": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">Order History</h1>
          
          {orders.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <h2 className="text-2xl font-medium">No orders yet</h2>
              <p className="text-muted-foreground">Your order history will appear here</p>
              <Button asChild className="mt-4">
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      
                      <p className="font-medium">
                        R{order.total.toFixed(2)}
                      </p>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        {selectedOrder === order.id ? "Hide Details" : "View Details"}
                      </Button>
                    </div>
                  </div>
                  
                  {selectedOrder === order.id && (
                    <div className="p-4 sm:p-6 space-y-4">
                      <h3 className="font-medium">Order Items</h3>
                      
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div 
                            key={`${item.id}-${item.size}`} 
                            className="flex gap-4 items-center"
                          >
                            <ImageLazy 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded"
                            />
                            
                            <div className="flex-1">
                              <Link 
                                to={`/products/${item.id}`}
                                className="font-medium hover:underline"
                              >
                                {item.name}
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                Size: {item.size} | Quantity: {item.quantity}
                              </p>
                            </div>
                            
                            <p className="font-medium">
                              R{item.price.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <p className="font-medium">Shipped to:</p>
                          <p className="text-sm text-muted-foreground">
                            123 Example Street, Sample City, ABC 12345
                          </p>
                        </div>
                        
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/support?order=${order.id}`}>
                            Need Help?
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
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

export default OrderHistory;
