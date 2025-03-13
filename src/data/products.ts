
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Air Zoom Pulse",
    description: "Sleek, lightweight running shoes featuring Nike Air technology and responsive cushioning. Engineered mesh upper provides targeted breathability for all-day comfort.",
    price: 1899.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
    ],
    colors: ["Black/White", "Blue/Grey", "Red/Black"],
    tags: ["Running", "Latest", "Featured"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    featured: true,
  },
  {
    id: "2",
    name: "LeBron Elite",
    description: "High-performance basketball shoes with Nike Zoom Air cushioning and FlightWire cables for superior lockdown. Designed for explosive movements and ultimate court control.",
    price: 2300.00,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1364&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
    ],
    colors: ["White/Black", "Blue/White", "Black/Gold"],
    tags: ["Basketball", "Latest"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    featured: true,
  },
  {
    id: "3",
    name: "Air Force 1",
    description: "Iconic street style with premium leather upper and Air cushioning. The legendary silhouette that revolutionized sneaker culture, perfect for everyday wear.",
    price: 1599.95,
    discountedPrice: 1299.95,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1587&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450&auto=format&fit=crop",
    ],
    colors: ["White", "Black", "Grey"],
    tags: ["Lifestyle", "Sale"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    featured: false,
  },
  {
    id: "4",
    name: "ACG Mountain Fly",
    description: "Rugged trail shoes with GORE-TEX waterproof technology and aggressive Nike Grind rubber outsole. Engineered for stability and traction on challenging outdoor terrain.",
    price: 1999.99,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1412&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1470&auto=format&fit=crop",
    ],
    colors: ["Brown/Green", "Grey/Blue", "Black/Orange"],
    tags: ["Hiking", "Outdoor"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    featured: false,
  },
  {
    id: "5",
    name: "Metcon 8",
    description: "Premium performance training shoes with Nike React foam and Hyperlift technology. Versatile design for weightlifting, HIIT, and short runs.",
    price: 1799.95,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1420&auto=format&fit=crop",
    ],
    colors: ["Black/Red", "Grey/Lime", "Navy/White"],
    tags: ["Training", "Fitness"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    featured: true,
  },
  {
    id: "6",
    name: "Dunk Low Retro",
    description: "Iconic vintage basketball sneakers reimagined for today. Classic design with modern comfort technology and premium materials that defined an era.",
    price: 1499.99,
    discountedPrice: 1199.99,
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1450&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1420&auto=format&fit=crop",
    ],
    colors: ["White/Navy", "White/Red", "Grey/White"],
    tags: ["Lifestyle", "Retro", "Sale"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    featured: false,
  },
  {
    id: "7",
    name: "ZoomX Vaporfly",
    description: "Elite racing shoes with carbon fiber plate and ZoomX foam for unrivaled energy return. Built for record-breaking marathon performance.",
    price: 2100.00,
    images: [
      "https://images.unsplash.com/photo-1584735175315-9d5df23be3f0?q=80&w=1587&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
    ],
    colors: ["Neon Green/Black", "Orange/White", "Black/Silver"],
    tags: ["Running", "Performance"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    featured: true,
  },
  {
    id: "8",
    name: "Offline Slip-On",
    description: "Convenient slip-on casual sneakers with ultra-soft React foam and adjustable heel strap. Effortless style for recovery days and casual wear.",
    price: 1299.95,
    images: [
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1479&auto=format&fit=crop",
    ],
    colors: ["Black", "Grey", "Navy"],
    tags: ["Lifestyle", "Casual"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
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
