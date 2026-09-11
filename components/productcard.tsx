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
    <div className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      
      {/* ========== IMAGE ========== */}
      <div className="relative bg-[#FAFAFA] pt-8 pb-6 px-6">
        <Link href={`/products/${id}`} className="block">
          <div className="relative mx-auto w-full max-w-[200px] aspect-square">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        </Link>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted(!wishlisted);
          }}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? "bg-red-500 text-white shadow-md"
              : "bg-white text-gray-400 shadow-sm hover:text-red-500 hover:shadow"
          }`}
        >
          <Heart
            size={16}
            strokeWidth={2}
            className={wishlisted ? "fill-current" : ""}
          />
        </button>
      </div>

      {/* ========== CONTENT ========== */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
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
          <span className="text-xs text-gray-400 font-medium">
            {rating.toFixed(1)}
            {reviews > 0 && (
              <span className="text-gray-300"> ({reviews})</span>
            )}
          </span>
        </div>

        {/* Title */}
        <Link href={`/products/${id}`}>
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 mb-3 hover:text-[#00A8E8] transition-colors">
            {title}
          </h3>
        </Link>

        {/* Price + Stock */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p
            className={`text-xs font-medium mb-4 ${
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
            <div className="flex flex-wrap gap-1.5 mb-4">
              {freeShipping && (
                <span className="inline-flex items-center text-[10px] font-semibold tracking-wide uppercase bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                  Free Shipping
                </span>
              )}
              {freeGift && (
                <span className="inline-flex items-center text-[10px] font-semibold tracking-wide uppercase bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full">
                  Free Gift
                </span>
              )}
            </div>
          )}

          {/* Add to Cart */}
          <button className="w-full h-11 flex items-center justify-center gap-2 bg-[#0B1D36] text-white text-sm font-semibold rounded-xl hover:bg-[#00A8E8] transition-colors duration-200">
            <ShoppingCart size={16} strokeWidth={2.2} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;