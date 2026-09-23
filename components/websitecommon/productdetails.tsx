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
import { useStore } from "@/lib/store";
import ProductCard from "./productcard";

interface ProductDetailsProps {
  productId?: string;
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: "Rahul S.",
      rating: 5,
      date: "2 days ago",
      comment:
        "Excellent battery life and attaches perfectly. Highly recommended!",
    },
    {
      id: 2,
      name: "Anita K.",
      rating: 4,
      date: "1 week ago",
      comment:
        "Good product but a bit expensive. Charging is very convenient though.",
    },
    {
      id: 3,
      name: "Suresh M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Perfect for travel. I no longer worry about my phone dying.",
    },
  ]);

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useStore();

  const product = {
    id: productId || "1",
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

  const isWishlisted = isInWishlist(product.id);

  const relatedProducts = [
    {
      id: 2,
      title: "Sony WH-1000XM5 Wireless Headphones",
      price: 348.0,
      oldPrice: 399.99,
      rating: 4.8,
      reviews: 312,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
      stock: "In Stock" as const,
      freeShipping: true,
      freeGift: false,
    },
    {
      id: 3,
      title: "Samsung Galaxy Buds3 Pro",
      price: 199.99,
      oldPrice: 249.99,
      rating: 4.5,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
      stock: "In Stock" as const,
      freeShipping: true,
      freeGift: true,
    },
    {
      id: 4,
      title: "Anker 737 Power Bank 24000mAh",
      price: 119.99,
      oldPrice: 149.99,
      rating: 4.7,
      reviews: 205,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
      stock: "Low Stock" as const,
      freeShipping: true,
      freeGift: false,
    },
    {
      id: 5,
      title: "Apple AirPods Pro 2nd Gen",
      price: 229.0,
      oldPrice: 249.0,
      rating: 4.9,
      reviews: 540,
      image:
        "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80",
      stock: "In Stock" as const,
      freeShipping: true,
      freeGift: true,
    },
  ];

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const handleSubmitReview = () => {
    if (!userRating || !reviewName.trim() || !reviewText.trim()) {
      alert("Please fill all fields and select a rating.");
      return;
    }
    setReviewsList([
      {
        id: Date.now(),
        name: reviewName,
        rating: userRating,
        date: "Just now",
        comment: reviewText,
      },
      ...reviewsList,
    ]);
    setUserRating(0);
    setReviewName("");
    setReviewText("");
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.images[0],
        stock: product.stock,
      },
      quantity
    );
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        reviews: product.reviews,
        image: product.images[0],
        stock: product.stock,
      });
    }
  };

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
          {/* Images */}
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
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
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

            <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1D36] mb-4">
              {product.title}
            </h1>

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

            <div className="flex items-center gap-4 mb-6 text-sm">
              <span className="font-medium text-amber-600">{product.stock}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">SKU: {product.sku}</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <ul className="space-y-2.5 mb-8">
              {product.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-gray-700"
                >
                  <Check size={16} className="text-[#00A8E8] mt-0.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[180px] flex items-center justify-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white font-semibold py-3.5 px-6 rounded-full transition-colors"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                onClick={handleWishlist}
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

        {/* Reviews */}
        <div className="mt-16 border-t border-gray-100 pt-12">
          <h2 className="text-2xl font-bold text-[#0B1D36] mb-8">
            Ratings & Reviews
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="bg-gray-50 rounded-2xl p-6 h-fit">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#0B1D36]">
                  {product.rating}
                </div>
                <div className="flex justify-center gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.round(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Based on {product.reviews} reviews
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#0B1D36] mb-4">
                  Write a Review
                </h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Your Rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                      >
                        <Star
                          size={28}
                          className={
                            star <= userRating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-200 text-gray-200 hover:fill-amber-200"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 text-slate-800"
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-sm text-gray-600 mb-1.5">
                    Your Review
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 resize-none text-slate-800"
                  />
                </div>
                <button
                  onClick={handleSubmitReview}
                  className="bg-[#0B1D36] hover:bg-[#00A8E8] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
                >
                  Submit Review
                </button>
              </div>

              <div className="space-y-6">
                {reviewsList.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0B1D36] text-white flex items-center justify-center text-sm font-semibold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#0B1D36]">
                            {review.name}
                          </p>
                          <p className="text-xs text-gray-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-gray-200 text-gray-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-16 border-t border-gray-100 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#0B1D36]">
              You May Also Like
            </h2>
            <Link
              href="/products"
              className="text-sm font-semibold text-[#00A8E8] hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                oldPrice={item.oldPrice}
                rating={item.rating}
                reviews={item.reviews}
                image={item.image}
                stock={item.stock}
                freeShipping={item.freeShipping}
                freeGift={item.freeGift}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;