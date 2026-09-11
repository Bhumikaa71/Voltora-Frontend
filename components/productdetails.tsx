"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Check,
  ChevronRight,
} from "lucide-react";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    id: 1,
    title: "Apple MagSafe Battery Pack",
    price: 99.99,
    oldPrice: 129.99,
    rating: 4.6,
    reviews: 128,
    stock: "Low Stock",
    sku: "APL-MSG-BP-001",
    description:
      "The MagSafe Battery Pack attaches magnetically and provides wireless charging for iPhone 12 and later. Perfect for on-the-go power with a sleek, portable design that snaps right onto the back of your phone.",
    features: [
      "Magnetic attachment for iPhone 12 and later",
      "Up to 15 hours of additional battery life",
      "Wireless charging with MagSafe",
      "Status LED indicator",
      "Compact and lightweight design",
      "USB-C charging port",
    ],
    images: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80",
      "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    ],
  };

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#00A8E8]">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-[#00A8E8]">
              Products
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#0B1D36] font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ========== LEFT: Images ========== */}
          <div>
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-contain p-8"
                priority
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-[#E5484D] text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-[#00A8E8]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ========== RIGHT: Details ========== */}
          <div>
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.round(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1D36] mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-[#0B1D36]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-[#E5484D]">
                You save ${(product.oldPrice - product.price).toFixed(2)}
              </span>
            </div>

            {/* Stock & SKU */}
            <div className="flex items-center gap-4 mb-6 text-sm">
              <span className="font-medium text-amber-600">{product.stock}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">SKU: {product.sku}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Features */}
            <ul className="space-y-2.5 mb-8">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <Check size={16} className="text-[#00A8E8] mt-0.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Quantity + Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {/* Quantity */}
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart */}
              <button className="flex-1 min-w-[180px] flex items-center justify-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white font-semibold py-3.5 px-6 rounded-full transition-colors">
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                  isWishlisted
                    ? "bg-[#E5484D] border-[#E5484D] text-white"
                    : "border-gray-200 text-[#0B1D36] hover:border-[#E5484D] hover:text-[#E5484D]"
                }`}
              >
                <Heart
                  size={20}
                  className={isWishlisted ? "fill-current" : ""}
                />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#00A8E8]/10 flex items-center justify-center text-[#00A8E8]">
                  <Truck size={18} />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#00A8E8]/10 flex items-center justify-center text-[#00A8E8]">
                  <ShieldCheck size={18} />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  Secure Payment
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#00A8E8]/10 flex items-center justify-center text-[#00A8E8]">
                  <RotateCcw size={18} />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  30 Days Return
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;