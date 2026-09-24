"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Clock, Flame, ChevronRight } from "lucide-react";
import ProductCard from "@/components/websitecommon/productcard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("discount");

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/products/deals`);
        if (!res.ok) throw new Error("Failed to fetch deals");
        const data = await res.json();
        setDeals(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const sortedDeals = useMemo(() => {
    const list = [...deals];
    list.sort((a, b) => {
      if (sortBy === "discount") {
        const discA =
          a.oldPrice && a.oldPrice > a.price
            ? ((a.oldPrice - a.price) / a.oldPrice) * 100
            : 0;
        const discB =
          b.oldPrice && b.oldPrice > b.price
            ? ((b.oldPrice - b.price) / b.oldPrice) * 100
            : 0;
        return discB - discA;
      }
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
    return list;
  }, [deals, sortBy]);

  if (loading) {
    return (
      <div className="bg-[#F4F6F9] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#00A8E8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500">Loading deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F6F9] min-h-screen pb-16">
      {/* Header */}
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
        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-[#0B1D36]">
              {sortedDeals.length}
            </span>{" "}
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

        {/* Deals List */}
        {sortedDeals.length === 0 ? (
          <div className="bg-white rounded-2xl py-20 text-center border border-gray-100">
            <p className="text-[#0B1D36] font-semibold text-lg">
              No deals available
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Check back later for new offers
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedDeals.map((deal) => (
              <ProductCard
                key={deal._id}
                id={deal._id}
                title={deal.title}
                price={deal.price}
                oldPrice={deal.oldPrice}
                rating={deal.rating || 4.5}
                reviews={deal.reviews || 0}
                image={deal.images?.[0] || ""}
                stock={deal.stock || "In Stock"}
                freeShipping={deal.freeShipping}
                freeGift={deal.freeGift}
                features={deal.features || []}
                layout="list"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}