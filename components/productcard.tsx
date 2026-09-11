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
  image,
  stock = "In Stock",
  freeShipping = false,
  freeGift = false,
}: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      
      {/* Image */}
      <div className="relative bg-white pt-6 pb-4 px-4">
        <Link href={`/products/${id}`}>
          <div className="relative w-full aspect-square">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        </Link>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            wishlisted
              ? "bg-red-500 text-white"
              : "bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500"
          }`}
        >
          <Heart
            size={15}
            className={wishlisted ? "fill-current" : ""}
          />
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-500 font-medium">
            {rating.toFixed(2)}
          </span>
        </div>

        {/* Title */}
        <Link href={`/products/${id}`}>
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-2 hover:text-[#00A8E8] transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-bold text-red-500">
            ${price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock */}
        <p
          className={`text-sm font-medium mb-3 ${
            stock === "In Stock"
              ? "text-green-600"
              : stock === "Low Stock"
              ? "text-orange-500"
              : "text-red-500"
          }`}
        >
          {stock}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {freeShipping && (
            <span className="text-[11px] font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
              FREE SHIPPING
            </span>
          )}
          {freeGift && (
            <span className="text-[11px] font-semibold bg-pink-100 text-pink-600 px-2.5 py-1 rounded-full">
              FREE GIFT
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button className="w-full flex items-center justify-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
          <ShoppingCart size={15} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;