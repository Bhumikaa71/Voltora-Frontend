"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Star,
} from "lucide-react";

const initialWishlist = [
  {
    id: 1,
    title: "Apple MagSafe Battery Pack",
    price: 99.99,
    oldPrice: 129.99,
    rating: 4.6,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80",
    stock: "In Stock" as const,
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 348.0,
    oldPrice: 399.99,
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80",
    stock: "In Stock" as const,
  },
  {
    id: 6,
    title: "MacBook Pro 16-inch M3 Pro",
    price: 2499,
    oldPrice: 2799,
    rating: 4.8,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    stock: "In Stock" as const,
  },
  {
    id: 7,
    title: "iPhone 16 Pro Max",
    price: 1199,
    oldPrice: 1299,
    rating: 4.9,
    reviews: 3200,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
    stock: "Low Stock" as const,
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeItem = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-[#F4F6F9] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-white border border-gray-100 flex items-center justify-center">
            <Heart size={32} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-[#0B1D36] mb-2">
            Your wishlist is empty
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Save items you love by clicking the heart icon.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F6F9] min-h-screen pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-[#00A8E8]">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#0B1D36] font-medium">Wishlist</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1D36]">
            My Wishlist
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlist.map((item) => {
            const discount =
              item.oldPrice && item.oldPrice > item.price
                ? Math.round(
                    ((item.oldPrice - item.price) / item.oldPrice) * 100
                  )
                : 0;

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative bg-[#F7F8FA] pt-6 pb-4 px-4">
                  <Link href={`/products/${item.id}`} className="block">
                    <div className="relative mx-auto w-full max-w-[150px] aspect-square">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-[#E5484D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      -{discount}%
                    </span>
                  )}

                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#E5484D] transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={
                          i < Math.round(item.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                    <span className="text-[11px] text-gray-400 ml-0.5">
                      ({item.reviews})
                    </span>
                  </div>

                  <Link href={`/products/${item.id}`}>
                    <h3 className="text-[14px] font-semibold text-[#0B1D36] line-clamp-2 min-h-[40px] hover:text-[#00A8E8] transition-colors">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="flex items-baseline gap-2 mt-2 mb-1">
                    <span className="text-[16px] font-bold text-[#0B1D36]">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.oldPrice && (
                      <span className="text-[12px] text-gray-400 line-through">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-[11px] font-medium mb-3 ${
                      item.stock === "In Stock"
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {item.stock}
                  </p>

                  <button className="w-full h-10 flex items-center justify-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white text-[12px] font-semibold rounded-xl transition-colors">
                    <ShoppingCart size={14} />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}