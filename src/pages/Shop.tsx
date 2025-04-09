import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, X } from "lucide-react";
import { Product } from "@/types";
import { products } from "@/data/products";

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: "all" as "all" | "under100" | "100to200" | "over200",
    sortBy: "featured" as "featured" | "newest" | "priceAsc" | "priceDesc",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique tags for filter categories
  const allTags = products.flatMap(product => product.tags);
  const uniqueTags = [...new Set(allTags)];
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        product.tags.some(tag => filters.categories.includes(tag))
      );
    }
    
    // Filter by price range
    if (filters.priceRange !== "all") {
      result = result.filter(product => {
        const price = product.discountedPrice || product.price;
        
        switch (filters.priceRange) {
          case "under100":
            return price < 100;
          case "100to200":
            return price >= 100 && price <= 200;
          case "over200":
            return price > 200;
          default:
            return true;
        }
      });
    }
    
    // Sort products
    switch (filters.sortBy) {
      case "newest":
        // Since we don't have a date field, we'll just use ID as a proxy for "newest"
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "priceAsc":
        result.sort((a, b) => 
          (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
        );
        break;
      case "priceDesc":
        result.sort((a, b) => 
          (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
        );
        break;
      default:
        // Default sorting: featured items first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [filters]);
  
  const handleCategoryChange = (category: string) => {
    setFilters(prev => {
      const categories = prev.categories.includes(category) 
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
        
      return { ...prev, categories };
    });
  };
  
  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: "all",
      sortBy: "featured",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">Shop</h1>
            
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            {/* Filters - Mobile Drawer */}
            <div className={`
              fixed inset-0 z-50 bg-background p-6 transition-transform duration-300 md:hidden
              ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Mobile Filter Content */}
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {uniqueTags.map(tag => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-${tag}`} 
                          checked={filters.categories.includes(tag)}
                          onCheckedChange={() => handleCategoryChange(tag)}
                        />
                        <Label htmlFor={`mobile-${tag}`}>{tag}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Select 
                    value={filters.priceRange} 
                    onValueChange={(value) => setFilters(prev => ({
                      ...prev, 
                      priceRange: value as typeof filters.priceRange
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All prices</SelectItem>
                      <SelectItem value="under100">Under R100</SelectItem>
                      <SelectItem value="100to200">R100 - R200</SelectItem>
                      <SelectItem value="over200">Over R200</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                {/* Reset Filters */}
                <Button 
                  variant="outline" 
                  onClick={handleClearFilters}
                  className="w-full"
                >
                  Clear Filters
                </Button>
                
                <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
            
            {/* Filters - Desktop Sidebar */}
            <div className="hidden md:block space-y-8">
              <div className="sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Filters</h2>
                  <Button 
                    variant="link" 
                    onClick={handleClearFilters}
                    className="h-auto p-0 text-sm"
                  >
                    Clear All
                  </Button>
                </div>
                
                <Accordion type="multiple" className="w-full" defaultValue={["categories", "price"]}>
                  {/* Categories */}
                  <AccordionItem value="categories">
                    <AccordionTrigger className="py-3">Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        {uniqueTags.map(tag => (
                          <div key={tag} className="flex items-center space-x-2">
                            <Checkbox 
                              id={tag} 
                              checked={filters.categories.includes(tag)}
                              onCheckedChange={() => handleCategoryChange(tag)}
                            />
                            <Label htmlFor={tag}>{tag}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Price Range */}
                  <AccordionItem value="price">
                    <AccordionTrigger className="py-3">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        {[
                          { value: "all", label: "All prices" },
                          { value: "under100", label: "Under R100" },
                          { value: "100to200", label: "R100 - R200" },
                          { value: "over200", label: "Over R200" },
                        ].map(option => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox 
                              id={option.value} 
                              checked={filters.priceRange === option.value}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFilters(prev => ({
                                    ...prev, 
                                    priceRange: option.value as typeof filters.priceRange
                                  }));
                                }
                              }}
                            />
                            <Label htmlFor={option.value}>{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            
            {/* Product Grid */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
                
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters(prev => ({
                    ...prev, 
                    sortBy: value as typeof filters.sortBy
                  }))}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                    <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <Button onClick={handleClearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
