
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ImageLazy } from "@/components/ui/image-lazy";
import { PriceTag } from "@/components/ui/price-tag";
import { ProductCard } from "@/components/products/product-card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MinusCircle, PlusCircle, ArrowLeft, ShoppingBag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/hooks/use-cart";
import { getProductById, getRelatedProducts } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useCart();
  
  const product = id ? getProductById(id) : undefined;
  const relatedProducts = id ? getRelatedProducts(id) : [];
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <Button asChild>
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountedPrice || product.price,
      image: product.images[0],
      size: selectedSize,
      quantity,
    });
  };
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 md:pt-32">
        <div className="container">
          <Button 
            variant="ghost" 
            className="-ml-3 mb-6" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              <ImageLazy
                src={product.images[currentImage]}
                alt={product.name}
                className="rounded-lg aspect-square object-cover w-full animate-fade-in"
              />
              
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`rounded-md overflow-hidden border-2 transition-colors ${
                      currentImage === index ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <ImageLazy
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="animate-slide-in">
              <div className="sticky top-24">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                  {product.name}
                </h1>
                
                <PriceTag
                  price={product.price}
                  discountedPrice={product.discountedPrice}
                  size="lg"
                  className="mb-6"
                />
                
                <div className="prose prose-sm max-w-none mb-8">
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
                
                <Separator className="my-6" />
                
                {/* Color Selection */}
                <div className="mb-6">
                  <Label htmlFor="color" className="text-base block mb-3">
                    Color: <span className="font-medium">{selectedColor}</span>
                  </Label>
                  <RadioGroup 
                    id="color" 
                    value={selectedColor} 
                    onValueChange={setSelectedColor}
                    className="flex flex-wrap gap-3"
                  >
                    {product.colors.map((color) => (
                      <div key={color}>
                        <RadioGroupItem 
                          value={color} 
                          id={`color-${color}`} 
                          className="peer sr-only" 
                        />
                        <Label
                          htmlFor={`color-${color}`}
                          className="px-4 py-2 rounded-md border hover:bg-secondary flex items-center justify-center cursor-pointer transition-colors peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                        >
                          {color}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {/* Size Selection */}
                <div className="mb-6">
                  <Label htmlFor="size" className="text-base block mb-3">
                    Size
                  </Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Quantity */}
                <div className="mb-8">
                  <Label className="text-base block mb-3">
                    Quantity
                  </Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="font-medium text-xl w-8 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full mb-4"
                  size="lg"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                {/* Additional Info */}
                <div className="text-sm text-muted-foreground mt-8">
                  <p className="mb-2">Free shipping on orders over $100</p>
                  <p>Ships within 2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 mb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
