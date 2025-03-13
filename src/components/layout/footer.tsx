
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t py-12 mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-display font-semibold tracking-tight">
              SNEAKVERSE
            </Link>
            <p className="mt-4 text-muted-foreground text-sm max-w-xs">
              Redefining premium sneaker experiences with minimalist design and exceptional quality.
            </p>
          </div>
          
          {[
            {
              title: "Shop",
              links: ["All Products", "New Arrivals", "Best Sellers", "Sale"],
            },
            {
              title: "Information",
              links: ["About Us", "Contact", "Shipping & Returns", "FAQ"],
            },
            {
              title: "Legal",
              links: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link 
                      to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} SNEAKVERSE. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            {["Instagram", "Twitter", "Facebook"].map((social) => (
              <a 
                key={social}
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
