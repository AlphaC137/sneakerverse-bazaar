
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/contexts/auth-context";
import { UserNav } from "@/components/auth/user-nav";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "py-3 bg-background/80 backdrop-blur-lg shadow-sm" 
        : "py-5 bg-transparent"
    )}>
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-display font-semibold tracking-tight transition-transform hover:scale-[1.01]"
        >
          SNEAKVERSE
        </Link>
        
        <nav className={cn(
          "fixed md:relative top-0 md:top-auto left-0 md:left-auto w-full md:w-auto h-screen md:h-auto bg-background md:bg-transparent z-50 md:z-auto transition-transform",
          isMenuOpen 
            ? "translate-x-0" 
            : "-translate-x-full md:translate-x-0"
        )}>
          <div className="flex md:hidden items-center justify-between p-5 border-b">
            <span className="text-xl font-medium">Menu</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <ul className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 p-5 md:p-0 text-lg md:text-base">
            {["Home", "Shop", "Collections", "About"].map((item) => (
              <li key={item}>
                <Link 
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="relative text-muted-foreground hover:text-foreground transition-colors after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-foreground after:scale-x-0 after:origin-right after:transition-transform hover:after:scale-x-100 hover:after:origin-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <UserNav />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            asChild
            className="relative"
          >
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-semibold rounded-full bg-primary text-primary-foreground animate-fade-in">
                  {items.length}
                </span>
              )}
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
