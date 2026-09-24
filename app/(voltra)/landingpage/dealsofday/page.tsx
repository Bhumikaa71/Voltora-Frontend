"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Truck,
  Gift,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
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

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [origin, setOrigin] = useState("50% 50%");
  const [zoomed, setZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-zoom-in"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-3 transition-transform duration-300 ease-out"
        style={{
          transformOrigin: origin,
          transform: zoomed ? "scale(2)" : "scale(1)",
        }}
        priority
        unoptimized
      />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0B1D36] text-white">
      <span className="text-base sm:text-lg font-bold leading-none tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] sm:text-[10px] text-white/60 mt-0.5">
        {label}
      </span>
    </div>
  );
}

const DealsOfTheDay = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [activeDeal, setActiveDeal] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/deals`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const list = Array.isArray(data) ? data.slice(0, 8) : [];
        setDeals(list);
        if (list.length > 0) setActiveDeal(list[0]);
      } catch (err) {
        console.error(err);
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedImage(0);
  }, [activeDeal]);

  if (loading) {
    return (
      <section className="py-10 lg:py-14 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 h-64 flex items-center justify-center">
          <div className="w-9 h-9 border-4 border-[#00A8E8] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (!activeDeal || deals.length === 0) return null;

  const images =
    activeDeal.images?.length > 0
      ? activeDeal.images
      : ["https://via.placeholder.com/600"];

  const saveAmount =
    activeDeal.oldPrice && activeDeal.oldPrice > activeDeal.price
      ? activeDeal.oldPrice - activeDeal.price
      : 0;

  const discountPct =
    activeDeal.oldPrice && activeDeal.oldPrice > activeDeal.price
      ? Math.round(
          ((activeDeal.oldPrice - activeDeal.price) / activeDeal.oldPrice) * 100
        )
      : 0;

  const features =
    Array.isArray(activeDeal.features) && activeDeal.features.length > 0
      ? activeDeal.features.slice(0, 4)
      : [];

  const shortDesc = activeDeal.description
    ? activeDeal.description.slice(0, 110) +
      (activeDeal.description.length > 110 ? "..." : "")
    : null;

  const sold = 32;
  const total = 75;
  const progress = Math.round((sold / total) * 100);
  const remaining = total - sold;

  // Up to 5 more deals on the side (no "View all" card)
  const sideDeals = deals.filter((d) => d._id !== activeDeal._id).slice(0, 5);

  return (
    <section className="py-10 lg:py-14 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-[#00A8E8]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1D36]">
              Deals of the Day
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <Clock size={15} className="text-[#E5484D]" />
              Ends in {String(timeLeft.hours).padStart(2, "0")}h{" "}
              {String(timeLeft.minutes).padStart(2, "0")}m
            </div>
            <Link
              href="/deals"
              className="text-sm font-semibold text-[#00A8E8] hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          {/* ========== MAIN DEAL ========== */}
          <div className="xl:col-span-8 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row h-full">
              {/* Image */}
              <div className="w-full lg:w-[42%] bg-[#F4F6F9] p-5 flex flex-col">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white max-w-[320px] mx-auto">
                  {saveAmount > 0 && (
                    <span className="absolute top-3 left-3 z-10 bg-[#E5484D] text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-sm">
                      SAVE Rs. {saveAmount.toLocaleString()}
                    </span>
                  )}
                  <ZoomableImage
                    src={images[selectedImage]}
                    alt={activeDeal.title}
                  />
                </div>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                  Hover to zoom
                </p>

                {images.length > 1 && (
                  <div className="flex gap-2 mt-3 justify-center">
                    {images.slice(0, 4).map((img: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
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
                          unoptimized
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col p-5 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <RatingStars rating={activeDeal.rating || 4.5} />
                  <span className="text-xs text-gray-500">
                    {(activeDeal.rating || 4.5).toFixed(1)} ·{" "}
                    {activeDeal.reviews || 0} reviews
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-[#0B1D36] leading-snug mb-3 line-clamp-2">
                  {activeDeal.title}
                </h3>

                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 mb-4">
                  <span className="text-2xl md:text-3xl font-bold text-[#0B1D36]">
                    Rs. {Number(activeDeal.price).toLocaleString()}
                  </span>
                  {activeDeal.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      Rs. {Number(activeDeal.oldPrice).toLocaleString()}
                    </span>
                  )}
                  {saveAmount > 0 && (
                    <span className="text-xs font-semibold text-[#E5484D] bg-red-50 px-2 py-0.5 rounded-full">
                      You save Rs. {saveAmount.toLocaleString()}
                    </span>
                  )}
                </div>

                {features.length > 0 ? (
                  <ul className="space-y-1.5 mb-4">
                    {features.map((f: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-[#00A8E8] mt-0.5 shrink-0"
                        />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                ) : shortDesc ? (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {shortDesc}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-2 mb-5">
                  {activeDeal.freeShipping && (
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      <Truck size={12} /> Free shipping
                    </span>
                  )}
                  {activeDeal.freeGift && (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      <Gift size={12} /> Free gift
                    </span>
                  )}
                  {discountPct > 0 && (
                    <span className="inline-flex items-center bg-red-50 text-[#E5484D] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      {discountPct}% OFF
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2.5">
                    <Clock size={13} className="text-[#E5484D]" />
                    Hurry up, offer ends in
                  </div>

                  <div className="flex gap-2 mb-4">
                    <TimeUnit value={timeLeft.days} label="days" />
                    <TimeUnit value={timeLeft.hours} label="hrs" />
                    <TimeUnit value={timeLeft.minutes} label="min" />
                    <TimeUnit value={timeLeft.seconds} label="sec" />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>
                        {sold} sold of {total}
                      </span>
                      <span>Only {remaining} left</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00A8E8] rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/products/${activeDeal._id}`}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors"
                  >
                    Buy now
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ========== SIDE DEALS (more deals, no View all card) ========== */}
          <div className="xl:col-span-4 flex flex-col gap-3 max-h-[560px] overflow-y-auto pr-1">
            {sideDeals.map((deal) => {
              const disc =
                deal.oldPrice && deal.oldPrice > deal.price
                  ? Math.round(
                      ((deal.oldPrice - deal.price) / deal.oldPrice) * 100
                    )
                  : 0;
              const img =
                deal.images?.[0] || "https://via.placeholder.com/300";

              return (
                <button
                  key={deal._id}
                  onClick={() => setActiveDeal(deal)}
                  className="group flex gap-3 bg-white rounded-2xl border border-gray-100 p-3 text-left hover:border-[#00A8E8]/50 hover:shadow-md transition-all shrink-0"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    {disc > 0 && (
                      <span className="absolute top-1.5 left-1.5 bg-[#E5484D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        -{disc}%
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-1 py-0.5">
                    <p className="text-sm font-semibold text-[#0B1D36] line-clamp-2 leading-snug mb-1 group-hover:text-[#00A8E8] transition-colors">
                      {deal.title}
                    </p>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-sm font-bold text-[#0B1D36]">
                        Rs. {Number(deal.price).toLocaleString()}
                      </span>
                      {deal.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          Rs. {Number(deal.oldPrice).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <RatingStars rating={deal.rating || 4.5} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;