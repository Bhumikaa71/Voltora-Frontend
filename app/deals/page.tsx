"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Truck,
  Gift,
  Star,
  CheckCircle2,
  Flame,
  ChevronRight,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useStore } from "@/lib/store";

const allDeals = [
  {
    id: 1,
    title: "Xiaomi Redmi Note 11 Pro 256GB 2023, Black Smartphone",
    price: 42999,
    oldPrice: 60999,
    rating: 4.6,
    reviews: 12,
    features: [
      '6.67" AMOLED Display, 120Hz',
      "108MP Triple Camera + 16MP Front",
      "5000mAh Battery with 67W Fast Charging",
      "8GB RAM + 256GB Storage",
    ],
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    sold: 26,
    total: 75,
    category: "Cell Phones",
  },
  {
    id: 2,
    title: "Xbox Wireless Controller – Carbon Black",
    price: 4999,
    oldPrice: 9999,
    rating: 4.8,
    reviews: 31,
    features: [
      "Textured grip for enhanced comfort",
      "Bluetooth technology for free wireless play",
      "Compatible with Xbox Series X|S, Xbox One & Windows",
      "Share button for easy capture & share",
    ],
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80",
    sold: 48,
    total: 100,
    category: "Gaming & VR",
  },
  {
    id: 3,
    title: "iPad Air 5th Gen 64GB Wi-Fi – Space Gray",
    price: 78999,
    oldPrice: 94999,
    rating: 4.7,
    reviews: 20,
    features: [
      "10.9-inch Liquid Retina display",
      "M1 chip for next-level performance",
      "12MP Ultra Wide front camera with Center Stage",
      "Up to 10 hours of battery life",
    ],
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    sold: 19,
    total: 50,
    category: "Tablets",
  },
  {
    id: 4,
    title: "Samsung Galaxy S23 Ultra 256GB – Phantom Black",
    price: 134999,
    oldPrice: 159999,
    rating: 4.9,
    reviews: 44,
    features: [
      "6.8-inch Dynamic AMOLED 2X, 120Hz",
      "200MP main camera with 100x Space Zoom",
      "5000mAh battery with 45W fast charging",
      "Snapdragon 8 Gen 2 • 12GB RAM",
    ],
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
    sold: 33,
    total: 60,
    category: "Cell Phones",
  },
  {
    id: 5,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 34999,
    oldPrice: 44999,
    rating: 4.8,
    reviews: 67,
    features: [
      "Industry-leading noise cancellation",
      "Up to 30 hours battery life",
      "Multipoint connection",
      "Speak-to-Chat technology",
    ],
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    sold: 41,
    total: 80,
    category: "Sounds",
  },
  {
    id: 6,
    title: "MacBook Air M2 13-inch 256GB – Midnight",
    price: 124999,
    oldPrice: 149999,
    rating: 4.9,
    reviews: 89,
    features: [
      "Apple M2 chip",
      "13.6-inch Liquid Retina display",
      "Up to 18 hours battery life",
      "8GB unified memory, 256GB SSD",
    ],
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    sold: 22,
    total: 40,
    category: "Laptops",
  },
  {
    id: 7,
    title: "Apple AirPods Pro 2nd Generation",
    price: 24999,
    oldPrice: 29999,
    rating: 4.8,
    reviews: 156,
    features: [
      "Active Noise Cancellation",
      "Adaptive Transparency",
      "Spatial Audio",
      "Up to 6 hours listening time",
    ],
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80",
    sold: 55,
    total: 100,
    category: "Accessories",
  },
  {
    id: 8,
    title: "PlayStation 5 Slim Console",
    price: 64999,
    oldPrice: 74999,
    rating: 4.9,
    reviews: 112,
    features: [
      "Ultra-high speed SSD",
      "Ray tracing support",
      "4K-TV gaming",
      "Tempest 3D AudioTech",
    ],
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80",
    sold: 28,
    total: 50,
    category: "Gaming & VR",
  },
];

function formatPrice(n: number) {
  return `Rs. ${n.toLocaleString("en-NP")}`;
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
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
  );
}

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
          <span className="text-xs text-gray-400 font-medium">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function DealsPage() {
  const [sortBy, setSortBy] = useState("discount");
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useStore();

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

  const handleAddToCart = (deal: (typeof allDeals)[0]) => {
    addToCart({
      id: deal.id,
      title: deal.title,
      price: deal.price,
      oldPrice: deal.oldPrice,
      image: deal.image,
      stock: "In Stock",
    });
  };

  const handleWishlist = (deal: (typeof allDeals)[0]) => {
    if (isInWishlist(deal.id)) {
      removeFromWishlist(deal.id);
    } else {
      addToWishlist({
        id: deal.id,
        title: deal.title,
        price: deal.price,
        oldPrice: deal.oldPrice,
        rating: deal.rating,
        reviews: deal.reviews,
        image: deal.image,
        stock: "In Stock",
      });
    }
  };

  return (
    <div className="bg-[#F4F6F9] min-h-screen pb-16">
      {/* Header */}
      <div className="bg-linear-to-r from-[#0B1D36] via-[#0E2544] to-[#132B4A] text-white">
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
        {/* Toolbar */}
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

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sortedDeals.map((deal) => {
            const discountPct = Math.round(
              ((deal.oldPrice - deal.price) / deal.oldPrice) * 100
            );
            const saveAmount = deal.oldPrice - deal.price;
            const progress = Math.round((deal.sold / deal.total) * 100);
            const remaining = deal.total - deal.sold;
            const wishlisted = isInWishlist(deal.id);

            return (
              <div
                key={deal.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col sm:flex-row"
              >
                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 bg-[#F7F8FA]">
                  <Link
                    href={`/products/${deal.id}`}
                    className="block relative w-full h-full min-h-45"
                  >
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      fill
                      className="object-contain p-4"
                      sizes="200px"
                    />
                  </Link>
                  <span className="absolute top-3 left-3 bg-[#E5484D] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg z-10">
                    -{discountPct}%
                  </span>

                  <button
                    onClick={() => handleWishlist(deal)}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 ${
                      wishlisted
                        ? "bg-[#E5484D] text-white shadow-md"
                        : "bg-white/90 text-gray-400 hover:text-[#E5484D] shadow-sm"
                    }`}
                  >
                    <Heart
                      size={16}
                      className={wishlisted ? "fill-current" : ""}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col">
                  <div className="flex items-center gap-2 mb-1.5">
                    <RatingStars rating={deal.rating} />
                    <span className="text-xs text-gray-400">
                      {deal.rating} ({deal.reviews})
                    </span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{deal.category}</span>
                  </div>

                  <Link href={`/products/${deal.id}`}>
                    <h3 className="text-[15px] font-semibold text-[#0B1D36] line-clamp-2 hover:text-[#00A8E8] transition-colors mb-3">
                      {deal.title}
                    </h3>
                  </Link>

                  <ul className="space-y-1 mb-4 hidden sm:block">
                    {deal.features.slice(0, 2).map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-[12px] text-gray-500"
                      >
                        <CheckCircle2
                          size={13}
                          className="text-[#00A8E8] mt-0.5 shrink-0"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold text-[#0B1D36]">
                      {formatPrice(deal.price)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(deal.oldPrice)}
                    </span>
                    <span className="text-xs font-semibold text-[#E5484D]">
                      Save {formatPrice(saveAmount)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>{deal.sold} sold</span>
                      <span className="text-[#E5484D] font-medium">
                        Only {remaining} left
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00A8E8] rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                        <Truck size={10} /> Free Shipping
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                        <Gift size={10} /> Free Gift
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddToCart(deal)}
                        className="flex-1 h-10 flex items-center justify-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white text-[13px] font-semibold rounded-xl transition-colors"
                      >
                        <ShoppingCart size={15} />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => handleWishlist(deal)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${
                          wishlisted
                            ? "bg-[#E5484D] border-[#E5484D] text-white"
                            : "border-gray-200 text-gray-400 hover:border-[#E5484D] hover:text-[#E5484D]"
                        }`}
                      >
                        <Heart
                          size={16}
                          className={wishlisted ? "fill-current" : ""}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}