
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/products/product-card";
import { ImageLazy } from "@/components/ui/image-lazy";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getFeaturedProducts, getSaleProducts } from "@/data/products";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const featuredProducts = getFeaturedProducts();
  const saleProducts = getSaleProducts();
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="flex flex-col animate-slide-in order-2 lg:order-1">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  New Collection
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
                  Discover the Art of Premium Footwear
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-md mt-4">
                  Meticulously crafted sneakers that blend innovation, comfort, and timeless design.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild size="lg" className="font-medium">
                  <Link to="/shop">Shop Collection</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-medium">
                  <Link to="/collections">Explore More</Link>
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 animate-fade-in">
              <div className="relative">
                <ImageLazy
                  src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1470&auto=format&fit=crop"
                  alt="Featured sneaker"
                  className="rounded-lg aspect-[4/3] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-background p-3 rounded-lg shadow-lg animate-slide-up">
                  <div className="flex items-center gap-3">
                    <ImageLazy
                      src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1587&auto=format&fit=crop"
                      alt="Nimbus Runner"
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-sm">Nimbus Runner</h3>
                      <p className="text-primary text-sm font-medium">$189.99</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Featured Collection</h2>
              <p className="text-muted-foreground mt-2">
                Our most popular designs, selected for their exceptional quality and style.
              </p>
            </div>
            <Button variant="link" size="sm" asChild className="font-medium -ml-4 md:ml-0">
              <Link to="/shop" className="gap-1 items-center inline-flex">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Highlight Banner */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 z-10"></div>
            <ImageLazy
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1374&auto=format&fit=crop"
              alt="Premium craftsmanship"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center z-20 p-6 md:p-12">
              <div className="max-w-lg animate-slide-in">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                  Craftsmanship Beyond Compare
                </h2>
                <p className="text-white/80 text-lg mb-6 max-w-md">
                  Every pair is meticulously crafted with premium materials and innovative technology for unparalleled comfort and style.
                </p>
                <Button asChild>
                  <Link to="/about">Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sales Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Special Offers</h2>
              <p className="text-muted-foreground mt-2">
                Limited-time deals on select premium styles.
              </p>
            </div>
            <Button variant="link" size="sm" asChild className="font-medium -ml-4 md:ml-0">
              <Link to="/sale" className="gap-1 items-center inline-flex">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to receive updates on new releases and exclusive offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-md border bg-background"
                required
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
