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
  Flame,
  Zap,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-w-[52px] h-[52px] rounded-2xl bg-gradient-to-b from-[#0B1D36] to-[#132B4A] text-white shadow-lg shadow-[#0B1D36]/20">
      <span className="text-lg font-bold leading-none tabular-nums tracking-tight">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] text-white/50 mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

function getTimeLeft(endsAt: string | Date | null | undefined) {
  if (!endsAt) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const end = new Date(endsAt).getTime();
  const diff = Math.max(0, end - Date.now());
  if (diff === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

const DealsOfTheDay = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [activeDeal, setActiveDeal] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: true,
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

  // Live countdown from activeDeal.dealEndsAt
  useEffect(() => {
    if (!activeDeal?.dealEndsAt) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
      return;
    }
    const tick = () => setTimeLeft(getTimeLeft(activeDeal.dealEndsAt));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [activeDeal]);

  useEffect(() => {
    setSelectedImage(0);
  }, [activeDeal]);

  if (loading) {
    return (
      <section className="py-14 bg-gradient-to-b from-white to-[#F0F7FF]">
        <div className="max-w-7xl mx-auto px-4 h-72 flex items-center justify-center">
          <div className="w-10 h-10 border-[3px] border-[#00A8E8] border-t-transparent rounded-full animate-spin" />
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
      ? activeDeal.features.slice(0, 3)
      : [];

  const shortDesc = activeDeal.description
    ? activeDeal.description.slice(0, 100) +
      (activeDeal.description.length > 100 ? "..." : "")
    : null;

  const sold = 32;
  const total = 75;
  const progress = Math.round((sold / total) * 100);
  const sideDeals = deals.filter((d) => d._id !== activeDeal._id).slice(0, 5);

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-white via-[#F8FBFF] to-[#F0F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00A8E8] to-[#00C2F0] flex items-center justify-center shadow-lg shadow-[#00A8E8]/25">
              <Flame size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1D36]">
                Deals of the Day
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Limited time offers — grab them before they’re gone
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!timeLeft.expired && activeDeal.dealEndsAt && (
              <div className="hidden md:flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-2 shadow-sm">
                <Zap size={14} className="text-[#00A8E8]" />
                <span className="text-xs font-medium text-slate-500">
                  Ends in {String(timeLeft.hours).padStart(2, "0")}:
                  {String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            )}
            <Link
              href="/deals"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-[#0B1D36] hover:bg-[#00A8E8] px-5 py-2.5 rounded-full transition-all shadow-md"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-[44%] relative bg-gradient-to-br from-slate-50 to-slate-100 p-6 lg:p-8">
                {discountPct > 0 && (
                  <div className="absolute top-5 left-5 z-10">
                    <div className="bg-gradient-to-r from-[#E5484D] to-[#FF6B6B] text-white text-xs font-bold px-3 py-2 rounded-2xl shadow-lg flex flex-col items-center leading-tight">
                      <span className="text-[10px] opacity-80">SAVE</span>
                      <span className="text-sm">
                        Rs. {saveAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
                <div className="relative w-full aspect-square max-w-[300px] mx-auto">
                  <Image
                    src={images[selectedImage]}
                    alt={activeDeal.title}
                    fill
                    className="object-contain drop-shadow-lg"
                    unoptimized
                    priority
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2.5 mt-5 justify-center">
                    {images.slice(0, 4).map((img: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === i
                            ? "border-[#00A8E8] shadow-md scale-105"
                            : "border-white hover:border-slate-200 shadow-sm"
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

              <div className="flex-1 p-6 lg:p-8 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <RatingStars rating={activeDeal.rating || 4.5} />
                  <span className="text-xs text-slate-400 font-medium">
                    {(activeDeal.rating || 4.5).toFixed(1)} (
                    {activeDeal.reviews || 0})
                  </span>
                  {discountPct > 0 && (
                    <span className="ml-auto text-[11px] font-bold text-[#E5484D] bg-red-50 px-2.5 py-1 rounded-full">
                      {discountPct}% OFF
                    </span>
                  )}
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-[#0B1D36] leading-snug mb-4 line-clamp-2">
                  {activeDeal.title}
                </h3>

                <div className="flex flex-wrap items-end gap-2.5 mb-5">
                  <span className="text-3xl lg:text-4xl font-extrabold text-[#0B1D36]">
                    Rs. {Number(activeDeal.price).toLocaleString()}
                  </span>
                  {activeDeal.oldPrice && (
                    <span className="text-base text-slate-400 line-through mb-1">
                      Rs. {Number(activeDeal.oldPrice).toLocaleString()}
                    </span>
                  )}
                </div>

                {features.length > 0 ? (
                  <ul className="space-y-2 mb-5">
                    {features.map((f: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-slate-600"
                      >
                        <CheckCircle2
                          size={15}
                          className="text-[#00A8E8] mt-0.5 shrink-0"
                        />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                ) : shortDesc ? (
                  <p className="text-sm text-slate-500 mb-5 line-clamp-2">
                    {shortDesc}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-2 mb-6">
                  {activeDeal.freeShipping && (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-3 py-1.5 rounded-full">
                      <Truck size={12} /> Free shipping
                    </span>
                  )}
                  {activeDeal.freeGift && (
                    <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[11px] font-semibold px-3 py-1.5 rounded-full">
                      <Gift size={12} /> Free gift
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-5 border-t border-slate-100">
                  {!timeLeft.expired && activeDeal.dealEndsAt ? (
                    <>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                        <Clock size={13} className="text-[#E5484D]" />
                        Hurry up, offer ends in
                      </div>
                      <div className="flex gap-2.5 mb-5">
                        <TimeUnit value={timeLeft.days} label="days" />
                        <TimeUnit value={timeLeft.hours} label="hrs" />
                        <TimeUnit value={timeLeft.minutes} label="min" />
                        <TimeUnit value={timeLeft.seconds} label="sec" />
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-slate-400 mb-5">
                      {activeDeal.dealEndsAt
                        ? "This offer has ended"
                        : "Set “Deal ends at” in Admin to show countdown"}
                    </p>
                  )}

                  <div className="mb-5">
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                      <span className="font-medium">{sold} sold</span>
                      <span className="font-medium text-[#E5484D]">
                        Only {total - sold} left!
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00A8E8] to-[#00D4FF] rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/products/${activeDeal._id}`}
                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gradient-to-r from-[#0B1D36] to-[#132B4A] hover:from-[#00A8E8] hover:to-[#00C2F0] text-white font-semibold text-sm px-10 py-3.5 rounded-2xl transition-all shadow-lg"
                  >
                    Buy now
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 flex flex-col gap-3.5 max-h-[620px] overflow-y-auto pr-1">
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
                  className="group flex gap-3.5 bg-white rounded-2xl border border-slate-100 p-3.5 text-left hover:border-[#00A8E8]/40 hover:shadow-lg transition-all shrink-0"
                >
                  <div className="relative w-[88px] h-[88px] rounded-xl overflow-hidden bg-slate-50 shrink-0">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    {disc > 0 && (
                      <span className="absolute top-1.5 left-1.5 bg-gradient-to-r from-[#E5484D] to-[#FF6B6B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                        -{disc}%
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-[#0B1D36] line-clamp-2 mb-1.5 group-hover:text-[#00A8E8]">
                      {deal.title}
                    </p>
                    <div className="flex items-baseline gap-1.5 mb-1.5">
                      <span className="text-sm font-bold text-[#0B1D36]">
                        Rs. {Number(deal.price).toLocaleString()}
                      </span>
                      {deal.oldPrice && (
                        <span className="text-[11px] text-slate-400 line-through">
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