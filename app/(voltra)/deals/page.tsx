"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Flame, ChevronRight } from "lucide-react";
import ProductCard from "@/components/websitecommon/productcard";

const allDeals = [
  {
    id: 1,
    title: "Xiaomi Redmi Note 11 Pro 256GB 2023, Black Smartphone",
    price: 42999,
    oldPrice: 60999,
    rating: 4.6,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: true,
    features: [
      '6.67" AMOLED Display, 120Hz',
      "108MP Triple Camera",
      "5000mAh + 67W charging",
      "8GB RAM + 256GB",
    ],
  },
  {
    id: 2,
    title: "Xbox Wireless Controller – Carbon Black",
    price: 4999,
    oldPrice: 9999,
    rating: 4.8,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
    features: [
      "Textured grip",
      "Bluetooth wireless",
      "Xbox & Windows compatible",
      "Share button",
    ],
  },
  {
    id: 3,
    title: "iPad Air 5th Gen 64GB Wi-Fi – Space Gray",
    price: 78999,
    oldPrice: 94999,
    rating: 4.7,
    reviews: 20,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    stock: "Low Stock" as const,
    freeShipping: true,
    freeGift: false,
    features: [
      "10.9-inch Liquid Retina",
      "M1 chip",
      "12MP front camera",
      "Up to 10 hours battery",
    ],
  },
  {
    id: 4,
    title: "Samsung Galaxy S23 Ultra 256GB – Phantom Black",
    price: 134999,
    oldPrice: 159999,
    rating: 4.9,
    reviews: 44,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: true,
    features: [
      "6.8-inch AMOLED 120Hz",
      "200MP camera",
      "5000mAh battery",
      "12GB RAM",
    ],
  },
  {
    id: 5,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 34999,
    oldPrice: 44999,
    rating: 4.8,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
    features: [
      "Industry-leading ANC",
      "30 hours battery",
      "Multipoint connection",
      "Speak-to-Chat",
    ],
  },
  {
    id: 6,
    title: "MacBook Air M2 13-inch 256GB – Midnight",
    price: 124999,
    oldPrice: 149999,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: false,
    features: [
      "Apple M2 chip",
      "13.6-inch Liquid Retina",
      "18 hours battery",
      "8GB + 256GB SSD",
    ],
  },
  {
    id: 7,
    title: "Apple AirPods Pro 2nd Generation",
    price: 24999,
    oldPrice: 29999,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80",
    stock: "In Stock" as const,
    freeShipping: true,
    freeGift: true,
    features: [
      "Active Noise Cancellation",
      "Adaptive Transparency",
      "Spatial Audio",
      "6 hours listening",
    ],
  },
  {
    id: 8,
    title: "PlayStation 5 Slim Console",
    price: 64999,
    oldPrice: 74999,
    rating: 4.9,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80",
    stock: "Low Stock" as const,
    freeShipping: true,
    freeGift: false,
    features: [
      "Ultra-high speed SSD",
      "Ray tracing",
      "4K gaming",
      "Tempest 3D Audio",
    ],
  },
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      {[
        { value: timeLeft.hours, label: "h" },
        { value: timeLeft.minutes, label: "m" },
        { value: timeLeft.seconds, label: "s" },
      ].map((unit, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className="bg-[#0B1D36] text-white text-sm font-bold min-w-[32px] h-8 flex items-center justify-center rounded-lg tabular-nums">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-xs text-white/60 font-medium">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function DealsPage() {
  const [sortBy, setSortBy] = useState("discount");

  const sortedDeals = [...allDeals].sort((a, b) => {
    if (sortBy === "discount") {
      const discA = ((a.oldPrice - a.price) / a.oldPrice) * 100;
      const discB = ((b.oldPrice - b.price) / b.oldPrice) * 100;
      return discB - discA;
    }
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-[#F4F6F9] min-h-screen pb-16">
      <div className="bg-gradient-to-r from-[#0B1D36] via-[#0E2544] to-[#132B4A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/80">Deals</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame size={22} className="text-[#00A8E8]" />
                <span className="text-[#00A8E8] text-sm font-semibold uppercase tracking-wider">
                  Limited Time
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold">All Deals</h1>
              <p className="text-white/60 mt-2 text-sm sm:text-base">
                Grab the best offers before they expire
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <Clock size={16} className="text-[#00A8E8]" />
              <span className="text-sm text-white/70">Ends in</span>
              <CountdownTimer />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-[#0B1D36]">{allDeals.length}</span>{" "}
            active deals
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm font-medium text-[#0B1D36] bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Horizontal list layout — different from products grid */}
        <div className="space-y-4">
          {sortedDeals.map((deal) => (
            <ProductCard
              key={deal.id}
              id={deal.id}
              title={deal.title}
              price={deal.price}
              oldPrice={deal.oldPrice}
              rating={deal.rating}
              reviews={deal.reviews}
              image={deal.image}
              stock={deal.stock}
              freeShipping={deal.freeShipping}
              freeGift={deal.freeGift}
              features={deal.features}
              layout="list"
            />
          ))}
        </div>
      </div>
    </div>
  );
}