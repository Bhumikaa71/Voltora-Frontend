// lib/products.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: string; // must match the category slug
  brand: string;
  description: string;
  specs: { label: string; value: string }[];
  inStock: boolean;
  stockCount?: number;
  colors?: string[];
  storageOptions?: string[];
}

const products: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 16-inch M3 Pro",
    price: 2499,
    originalPrice: 2799,
    discount: 11,
    rating: 4.8,
    reviewCount: 1240,
    images: ["/images/logo1.png"], // replace with real images later
    category: "laptops",
    brand: "Apple",
    description:
      "The most advanced MacBook Pro ever. Featuring the blazing-fast M3 Pro chip, Liquid Retina XDR display, and up to 22 hours of battery life.",
    specs: [
      { label: "Processor", value: "Apple M3 Pro" },
      { label: "RAM", value: "18GB Unified Memory" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "16.2-inch Liquid Retina XDR" },
      { label: "Battery", value: "Up to 22 hours" },
      { label: "Weight", value: "2.14 kg" },
    ],
    inStock: true,
    stockCount: 14,
    colors: ["Space Black", "Silver"],
    storageOptions: ["512GB", "1TB", "2TB"],
  },
  {
    id: "2",
    name: "iPhone 16 Pro Max",
    price: 1199,
    originalPrice: 1299,
    discount: 8,
    rating: 4.9,
    reviewCount: 3200,
    images: ["/images/logo1.png"],
    category: "cell-phones",
    brand: "Apple",
    description: "Titanium design. A18 Pro chip. Camera Control. Action button.",
    specs: [
      { label: "Chip", value: "A18 Pro" },
      { label: "Display", value: "6.9-inch Super Retina XDR" },
      { label: "Camera", value: "48MP Fusion" },
      { label: "Battery", value: "Up to 33 hours video" },
    ],
    inStock: true,
    colors: ["Natural Titanium", "Black Titanium", "White Titanium"],
    storageOptions: ["256GB", "512GB", "1TB"],
  },
  {
    id: "3",
    name: "Dell XPS 15",
    price: 1899,
    originalPrice: 2199,
    discount: 14,
    rating: 4.6,
    reviewCount: 890,
    images: ["/images/logo1.png"],
    category: "laptops",
    brand: "Dell",
    description: "Powerful 15-inch laptop with stunning OLED display and long battery life.",
    specs: [
      { label: "Processor", value: "Intel Core Ultra 7" },
      { label: "RAM", value: "32GB" },
      { label: "Storage", value: "1TB SSD" },
      { label: "Display", value: "15.6-inch OLED" },
    ],
    inStock: true,
    stockCount: 8,
  },
];

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((r) => setTimeout(r, 80));
  return products.find((p) => p.id === id) ?? null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}