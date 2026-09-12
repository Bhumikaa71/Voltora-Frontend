// // app/products/page.tsx
// import Link from "next/link";
// import ProductCard from "@/components/productcard";

// interface PageProps {
//   searchParams: Promise<{ category?: string }>;
// }

// // Temporary product data (matches your ProductCard props)
// const allProducts = [
//   {
//     id: 1,
//     title: "Apple MagSafe Battery Pack",
//     price: 99.99,
//     oldPrice: 129.99,
//     rating: 4.6,
//     reviews: 128,
//     image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80",
//     stock: "Low Stock" as const,
//     freeShipping: true,
//     freeGift: false,
//     category: "accessories",
//   },
//   {
//     id: 2,
//     title: "Sony WH-1000XM5 Wireless Headphones",
//     price: 348.0,
//     oldPrice: 399.99,
//     rating: 4.8,
//     reviews: 312,
//     image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
//     stock: "In Stock" as const,
//     freeShipping: true,
//     freeGift: false,
//     category: "sounds",
//   },
//   {
//     id: 3,
//     title: "Samsung Galaxy Buds3 Pro",
//     price: 199.99,
//     oldPrice: 249.99,
//     rating: 4.5,
//     reviews: 89,
//     image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
//     stock: "In Stock" as const,
//     freeShipping: true,
//     freeGift: true,
//     category: "accessories",
//   },
//   {
//     id: 4,
//     title: "Anker 737 Power Bank 24000mAh",
//     price: 119.99,
//     oldPrice: 149.99,
//     rating: 4.7,
//     reviews: 205,
//     image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
//     stock: "Low Stock" as const,
//     freeShipping: true,
//     freeGift: false,
//     category: "accessories",
//   },
//   {
//     id: 5,
//     title: "Apple AirPods Pro 2nd Gen",
//     price: 229.0,
//     oldPrice: 249.0,
//     rating: 4.9,
//     reviews: 540,
//     image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80",
//     stock: "In Stock" as const,
//     freeShipping: true,
//     freeGift: true,
//     category: "accessories",
//   },
//   {
//     id: 6,
//     title: "MacBook Pro 16-inch M3 Pro",
//     price: 2499,
//     oldPrice: 2799,
//     rating: 4.8,
//     reviews: 1240,
//     image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
//     stock: "In Stock" as const,
//     freeShipping: true,
//     freeGift: false,
//     category: "laptops",
//   },
//   {
//     id: 7,
//     title: "iPhone 16 Pro Max",
//     price: 1199,
//     oldPrice: 1299,
//     rating: 4.9,
//     reviews: 3200,
//     image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
//     stock: "In Stock" as const,
//     freeShipping: true,
//     freeGift: false,
//     category: "cell-phones",
//   },
//   {
//     id: 8,
//     title: "Dell XPS 15",
//     price: 1899,
//     oldPrice: 2199,
//     rating: 4.6,
//     reviews: 890,
//     image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&q=80",
//     stock: "In Stock" as const,
//     freeShipping: true,
//     freeGift: false,
//     category: "laptops",
//   },
// ];

// export default async function ProductsPage({ searchParams }: PageProps) {
//   const { category } = await searchParams;

//   const products = category
//     ? allProducts.filter((p) => p.category === category)
//     : allProducts;

//   const title = category
//     ? category
//         .split("-")
//         .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//         .join(" ")
//     : "All Products";

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* Header */}
//         <div className="mb-8">
//           <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
//             <Link href="/" className="hover:text-[#00A8E8]">
//               Home
//             </Link>
//             <span>/</span>
//             <span className="text-[#0B1D36] font-medium">{title}</span>
//           </nav>
//           <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1D36]">
//             {title}
//           </h1>
//           <p className="text-gray-500 mt-1">
//             {products.length} product{products.length !== 1 ? "s" : ""} found
//           </p>
//         </div>

//         {/* Product Grid */}
//         {products.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-gray-500 text-lg">
//               No products found in this category.
//             </p>
//             <Link
//               href="/products"
//               className="inline-block mt-4 text-[#00A8E8] font-medium hover:underline"
//             >
//               View all products →
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 id={product.id}
//                 title={product.title}
//                 price={product.price}
//                 oldPrice={product.oldPrice}
//                 rating={product.rating}
//                 reviews={product.reviews}
//                 image={product.image}
//                 stock={product.stock}
//                 freeShipping={product.freeShipping}
//                 freeGift={product.freeGift}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import ProductsListing from "@/components/ProductsListing";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category } = await searchParams;

  return <ProductsListing initialCategory={category || ""} />;
}