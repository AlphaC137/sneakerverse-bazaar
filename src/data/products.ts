
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Nimbus Runner",
    description: "Sleek, lightweight running shoes featuring responsive cushioning and breathable mesh upper for all-day comfort. Perfect for daily runs and casual wear.",
    price: 189.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
    ],
    colors: ["Black/White", "Blue/Grey", "Red/Black"],
    tags: ["Running", "Latest", "Featured"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    featured: true,
  },
  {
    id: "2",
    name: "Velocity Pro",
    description: "High-performance basketball shoes with enhanced ankle support and impact protection. Designed for explosive movements and superior court grip.",
    price: 230.00,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1364&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
    ],
    colors: ["White/Black", "Blue/White", "Black/Gold"],
    tags: ["Basketball", "Latest"],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12", "US 13"],
    featured: true,
  },
  {
    id: "3",
    name: "Urban Street",
    description: "Fashion-forward lifestyle sneakers with premium materials and minimalist design. The perfect blend of comfort and style for everyday wear.",
    price: 159.95,
    discountedPrice: 129.95,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1587&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450&auto=format&fit=crop",
    ],
    colors: ["White", "Black", "Grey"],
    tags: ["Lifestyle", "Sale"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    featured: false,
  },
  {
    id: "4",
    name: "Terrain Hiker",
    description: "Rugged trail shoes with waterproof construction and aggressive outsole. Engineered for stability and traction on challenging outdoor terrain.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1412&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1470&auto=format&fit=crop",
    ],
    colors: ["Brown/Green", "Grey/Blue", "Black/Orange"],
    tags: ["Hiking", "Outdoor"],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    featured: false,
  },
  {
    id: "5",
    name: "Pulse Elite",
    description: "Premium performance training shoes with adaptive fit technology and responsive cushioning. Versatile design for various workout styles.",
    price: 179.95,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1420&auto=format&fit=crop",
    ],
    colors: ["Black/Red", "Grey/Lime", "Navy/White"],
    tags: ["Training", "Fitness"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    featured: true,
  },
  {
    id: "6",
    name: "Retro Classic",
    description: "Iconic vintage-inspired sneakers with modern comfort technology. Timeless design that complements any casual outfit.",
    price: 149.99,
    discountedPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1450&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1420&auto=format&fit=crop",
    ],
    colors: ["White/Navy", "White/Red", "Grey/White"],
    tags: ["Lifestyle", "Retro", "Sale"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    featured: false,
  },
  {
    id: "7",
    name: "Aero Light",
    description: "Ultra-lightweight running shoes with innovative foam technology and streamlined design. Engineered for speed and responsiveness.",
    price: 210.00,
    images: [
      "https://images.unsplash.com/photo-1584735175315-9d5df23be3f0?q=80&w=1587&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
    ],
    colors: ["Neon Green/Black", "Orange/White", "Black/Silver"],
    tags: ["Running", "Performance"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    featured: true,
  },
  {
    id: "8",
    name: "Metro Slip-On",
    description: "Convenient slip-on casual sneakers with elastic goring and cushioned footbed. Effortless style for on-the-go comfort.",
    price: 129.95,
    images: [
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1479&auto=format&fit=crop",
    ],
    colors: ["Black", "Grey", "Navy"],
    tags: ["Lifestyle", "Casual"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    featured: false,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getRelatedProducts(id: string, limit: number = 4): Product[] {
  const currentProduct = getProductById(id);
  
  if (!currentProduct) return [];
  
  // Filter products with similar tags, excluding the current product
  return products
    .filter(product => 
      product.id !== id && 
      product.tags.some(tag => currentProduct.tags.includes(tag))
    )
    .slice(0, limit);
}

export function getFeaturedProducts(limit: number = 4): Product[] {
  return products
    .filter(product => product.featured)
    .slice(0, limit);
}

export function getSaleProducts(limit: number = 4): Product[] {
  return products
    .filter(product => product.discountedPrice)
    .slice(0, limit);
}
