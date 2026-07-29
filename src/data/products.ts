export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  sellerRating?: number;
  colors?: string[];
  sizes?: string[];
}
export const PRODUCTS: Product[] = [
  {
    id: "prod-101",
    name: "AuraSound Noise-Canceling Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Premium over-ear headphones featuring active noise cancellation, 30-hour battery life, and ultra-soft memory foam earcups.",
    sellerRating: 4.8,
    colors: ["Matte Black", "Silver", "Navy Blue"]
  },
  {
    id: "prod-102",
    name: "Classic Organic Cotton Crewneck T-Shirt",
    category: "Apparel",
    price: 29.50,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    description: "Breathable 100% organic cotton tee tailored for everyday wear. Pre-shrunk fabric ensures a consistent fit after washing.",
    sellerRating: 4.5,
    colors: ["White", "Heather Gray", "Sage Green", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-103",
    name: "Velocity Pro Trail Running Shoes",
    category: "Apparel",
    price: 129.95,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "Lightweight trail runners with high-grip rubber outsoles and responsive cushioning designed for tough terrains.",
    sellerRating: 4.7,
    colors: ["Neon Yellow/Black", "Cobalt/Orange", "All Black"],
    sizes: ["7", "8", "8.5", "9", "10", "11", "12"]
  },
  {
    id: "prod-104",
    name: "Minimalist Stainless Steel Water Bottle (32oz)",
    category: "Home & Kitchen",
    price: 34.00,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    description: "Double-wall vacuum insulated water bottle that keeps drinks cold for up to 24 hours or hot for up to 12 hours.",
    sellerRating: 4.9,
    colors: ["Matte Black", "White", "Terracotta", "Olive"]
  },
  {
    id: "prod-105",
    name: "Urban Explorer Waterproof Backpack",
    category: "Accessories",
    price: 85.00,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    description: "Durable 25L commuter backpack featuring a padded 15-inch laptop sleeve, hidden anti-theft pocket, and water-resistant zippers.",
    sellerRating: 4.6,
    colors: ["Dark Gray", "Olive Drab"]
  },
  {
    id: "prod-106",
    name: "Cozy Knit Oversized Pullover Sweater",
    category: "Apparel",
    price: 64.99,
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
    description: "Relaxed-fit knit sweater made from a soft wool-blend yarn. Features ribbed cuffs and a classic crew neckline.",
    sellerRating: 4.3,
    colors: ["Oatmeal", "Dusty Rose", "Cream"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "prod-107",
    name: "PulseFit Smartwatch & Fitness Tracker",
    category: "Electronics",
    price: 149.00,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "Track heart rate, sleep quality, and daily activities with a vibrant AMOLED display and 7-day battery life.",
    sellerRating: 4.4,
    colors: ["Black", "Rose Gold", "Space Gray"]
  },
  {
    id: "prod-108",
    name: "Ergonomic Leather Desk Chair",
    category: "Furniture",
    price: 249.99,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-fU9RVAfQj_sxwNatrLVlm1GHzyonKhXMUXdDtofWQ&s=10",
    description: "High-back executive chair with adjustable lumbar support, pneumatic seat height adjustment, and breathable bonded leather.",
    sellerRating: 4.2,
    colors: ["Cognac Brown", "Midnight Black"]
  },
  {
    id: "prod-109",
    name: "Slim Fit Stretch Chino Pants",
    category: "Apparel",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
    description: "Versatile stretch chinos designed for modern comfort. Perfect for smart-casual office settings or weekend outings.",
    sellerRating: 4.6,
    colors: ["Khaki", "Navy", "Olive", "Black"],
    sizes: ["30x30", "32x30", "32x32", "34x32", "36x32"]
  },
  {
    id: "prod-110",
    name: "Precision Pour-Over Coffee Maker Set",
    category: "Home & Kitchen",
    price: 42.50,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    description: "Borosilicate glass carafe with a reusable stainless steel mesh filter for rich, sediment-free pour-over coffee.",
    sellerRating: 4.8
  }
];
