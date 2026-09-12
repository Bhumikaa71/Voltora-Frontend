"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  id: number | string;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews?: number;
  image: string;
  stock?: "In Stock" | "Low Stock" | "Out of Stock";
  freeShipping?: boolean;
  freeGift?: boolean;
  badge?: string;
}

const ProductCard = ({
  id,
  title,
  price,
  oldPrice,
  rating,
  reviews = 0,
  image,
  stock = "In Stock",
  freeShipping = false,
  freeGift = false,
}: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-gray-200">
      {/* ================= IMAGE ================= */}
      <div className="relative bg-[#F7F8FA] pt-10 pb-8 px-6">
        <Link href={`/products/${id}`} className="block">
          <div className="relative mx-auto w-full max-w-[180px] aspect-square">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        </Link>

        {/* Wishlist Button - Improved Design */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          aria-label="Add to wishlist"
          className={`absolute top-3.5 right-3.5 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            wishlisted
              ? "bg-[#E5484D] text-white shadow-lg scale-110"
              : "bg-white/90 backdrop-blur-sm text-gray-500 shadow-md hover:bg-[#E5484D] hover:text-white hover:scale-110"
          }`}
        >
          <Heart
            size={18}
            strokeWidth={2}
            className={wishlisted ? "fill-current" : ""}
          />
        </button>
      </div>

      {/* ================= BODY ================= */}
      <div className="flex flex-col flex-1 px-5 pt-5 pb-5">
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center gap-[2px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.round(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-[12px] text-gray-400 font-medium">
            {(rating ?? 0).toFixed(1)}{" "}
            {reviews > 0 && <span className="text-gray-300"> ({reviews})</span>}
          </span>
        </div>

        {/* Title */}
        <Link href={`/products/${id}`}>
          <h3 className="text-[15px] font-semibold text-[#0B1D36] leading-[1.4] line-clamp-2 min-h-[42px] mb-3 hover:text-[#00A8E8] transition-colors">
            {title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[20px] font-bold text-[#0B1D36] tracking-tight">
            ${price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-[13px] text-gray-400 line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <p
          className={`text-[12px] font-medium mb-4 ${
            stock === "In Stock"
              ? "text-emerald-600"
              : stock === "Low Stock"
                ? "text-amber-600"
                : "text-red-500"
          }`}
        >
          {stock}
        </p>

        {/* Badges */}
        {(freeShipping || freeGift) && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {freeShipping && (
              <span className="inline-flex items-center text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 px-2.5 py-[3px] rounded-full">
                Free Shipping
              </span>
            )}
            {freeGift && (
              <span className="inline-flex items-center text-[10px] font-bold tracking-wider uppercase bg-rose-50 text-rose-600 px-2.5 py-[3px] rounded-full">
                Free Gift
              </span>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Add to Cart */}
        <button className="w-full h-11 flex items-center justify-center gap-2 bg-[#0B1D36] text-white text-[13px] font-semibold rounded-xl hover:bg-[#00A8E8] active:scale-[0.98] transition-all duration-200">
          <ShoppingCart size={15} strokeWidth={2.2} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
