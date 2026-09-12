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
  layout?: "grid" | "list";
  // optional short features for list view
  features?: string[];
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
  layout = "grid",
  features = [],
}: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  // ===================== LIST LAYOUT =====================
  if (layout === "list") {
    return (
      <div className="group flex flex-col sm:flex-row bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
        {/* Left - Image */}
        <Link
          href={`/products/${id}`}
          className="relative w-full sm:w-[200px] h-[180px] sm:h-auto flex-shrink-0 bg-[#F7F8FA]"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="200px"
          />
        </Link>

        {/* Middle - Details */}
        <div className="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Title */}
            <Link href={`/products/${id}`}>
              <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#0B1D36] leading-snug line-clamp-2 hover:text-[#00A8E8] transition-colors">
                {title}
              </h3>
            </Link>

            {/* Rating + Reviews + Stock */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-[1px]">
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
                <span className="text-[12px] text-gray-500">
                  {rating.toFixed(1)}
                  {reviews > 0 && (
                    <span className="text-gray-400"> ({reviews})</span>
                  )}
                </span>
              </div>

              <span
                className={`text-[12px] font-medium ${
                  stock === "In Stock"
                    ? "text-emerald-600"
                    : stock === "Low Stock"
                    ? "text-amber-600"
                    : "text-red-500"
                }`}
              >
                {stock}
              </span>
            </div>

            {/* Features / Highlights */}
            {features.length > 0 ? (
              <ul className="mt-3 space-y-1">
                {features.slice(0, 4).map((feat, i) => (
                  <li
                    key={i}
                    className="text-[12px] text-gray-500 flex items-start gap-1.5"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {freeShipping && (
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                    Free Shipping
                  </span>
                )}
                {freeGift && (
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">
                    Free Gift
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right - Price + Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 p-4 sm:p-5 sm:min-w-[150px] sm:border-l border-gray-50">
          <div className="text-right">
            <div className="text-lg font-bold text-[#0B1D36]">
              ${price.toFixed(2)}
            </div>
            {oldPrice && oldPrice > price && (
              <>
                <div className="text-[13px] text-gray-400 line-through">
                  ${oldPrice.toFixed(2)}
                </div>
                <div className="text-[12px] font-semibold text-[#E5484D] mt-0.5">
                  {discount}% Off
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                wishlisted
                  ? "bg-[#E5484D] border-[#E5484D] text-white"
                  : "border-gray-200 text-gray-400 hover:border-[#E5484D] hover:text-[#E5484D]"
              }`}
            >
              <Heart size={15} className={wishlisted ? "fill-current" : ""} />
            </button>
            <button className="h-9 px-3.5 flex items-center gap-1.5 bg-[#0B1D36] text-white text-[12px] font-semibold rounded-lg hover:bg-[#00A8E8] transition-colors">
              <ShoppingCart size={14} />
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===================== GRID LAYOUT =====================
  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-gray-200">
      {/* Image */}
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

      {/* Body */}
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
            {(rating ?? 0).toFixed(1)}
            {reviews > 0 && (
              <span className="text-gray-300"> ({reviews})</span>
            )}
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

        {/* Stock */}
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

        <div className="flex-1" />

        <button className="w-full h-11 flex items-center justify-center gap-2 bg-[#0B1D36] text-white text-[13px] font-semibold rounded-xl hover:bg-[#00A8E8] active:scale-[0.98] transition-all duration-200">
          <ShoppingCart size={15} strokeWidth={2.2} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;