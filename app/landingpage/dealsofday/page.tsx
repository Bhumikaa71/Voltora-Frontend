"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Truck, Gift, Star, ArrowRight, CheckCircle2 } from "lucide-react";

const deals = [
  {
    id: 1,
    title: "Xiaomi Redmi Note 11 Pro 256GB 2023, Black Smartphone",
    price: "Rs. 42,999",
    oldPrice: "Rs. 60,999",
    save: "Rs. 18,000",
    rating: 4.6,
    reviews: 12,
    features: [
      '6.67" AMOLED Display, 120Hz',
      "108MP Triple Camera + 16MP Front",
      "5000mAh Battery with 67W Fast Charging",
      "8GB RAM + 256GB Storage",
    ],
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80",
    ],
    sold: 26,
    total: 75,
  },
  {
    id: 2,
    title: "Xbox Wireless Controller – Carbon Black",
    price: "Rs. 4,999",
    oldPrice: "Rs. 9,999",
    save: "Rs. 5,000",
    rating: 4.8,
    reviews: 31,
    features: [
      "Textured grip for enhanced comfort",
      "Bluetooth technology for free wireless play",
      "Compatible with Xbox Series X|S, Xbox One & Windows",
      "Share button for easy capture & share",
    ],
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80",
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&q=80",
    ],
    sold: 48,
    total: 100,
  },
  {
    id: 3,
    title: "iPad Air 5th Gen 64GB Wi-Fi – Space Gray",
    price: "Rs. 78,999",
    oldPrice: "Rs. 94,999",
    save: "Rs. 16,000",
    rating: 4.7,
    reviews: 20,
    features: [
      "10.9-inch Liquid Retina display",
      "M1 chip for next-level performance",
      "12MP Ultra Wide front camera with Center Stage",
      "Up to 10 hours of battery life",
    ],
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
      "https://images.unsplash.com/photo-1585790050230-5dd28404f065?w=600&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80",
    ],
    sold: 19,
    total: 50,
  },
  {
    id: 4,
    title: "Samsung Galaxy S23 Ultra 256GB – Phantom Black",
    price: "Rs. 1,34,999",
    oldPrice: "Rs. 1,59,999",
    save: "Rs. 25,000",
    rating: 4.9,
    reviews: 44,
    features: [
      "6.8-inch Dynamic AMOLED 2X, 120Hz",
      "200MP main camera with 100x Space Zoom",
      "5000mAh battery with 45W fast charging",
      "Snapdragon 8 Gen 2 • 12GB RAM",
    ],
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff93?w=600&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    ],
    sold: 33,
    total: 60,
  },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(rating);
        return (
          <Star
            key={i}
            size={13}
            className={filled ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
          />
        );
      })}
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
        className="object-contain p-4 transition-transform duration-300 ease-out"
        style={{
          transformOrigin: origin,
          transform: zoomed ? "scale(2)" : "scale(1)",
        }}
        priority
      />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-[#0B1D36] text-white">
      <span className="text-lg font-bold leading-none tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] text-white/60 mt-1">{label}</span>
    </div>
  );
}

const DealsOfTheDay = () => {
  const [activeDeal, setActiveDeal] = useState(deals[0]);
  const [selectedImage, setSelectedImage] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

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
    setSelectedImage(0);
  }, [activeDeal]);

  const progress = Math.round((activeDeal.sold / activeDeal.total) * 100);
  const remaining = activeDeal.total - activeDeal.sold;

  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-[#0B1D36]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-8 rounded-full bg-[#00A8E8]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1D36] tracking-tight">
              Deals of the Day
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <Clock size={15} className="text-[#E5484D]" />
            Refreshes in {String(timeLeft.hours).padStart(2, "0")}h{" "}
            {String(timeLeft.minutes).padStart(2, "0")}m
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ===== Main Deal ===== */}
          <div className="lg:col-span-9 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Gallery */}
              <div className="w-full lg:w-[42%] bg-gray-50 p-6 flex flex-col">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white">
                  <span className="absolute top-3 left-3 z-10 flex flex-col items-center justify-center leading-none bg-[#E5484D] text-white text-[11px] font-bold px-3 py-2 rounded-lg shadow-sm">
                    SAVE
                    <span className="text-sm mt-0.5">{activeDeal.save}</span>
                  </span>
                  <ZoomableImage
                    src={activeDeal.images[selectedImage]}
                    alt={activeDeal.title}
                  />
                </div>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                  Hover the image to zoom in
                </p>

                <div className="flex gap-3 mt-4 justify-center">
                  {activeDeal.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      aria-label={`Show image ${index + 1} of ${activeDeal.title}`}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
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

              {/* Details */}
              <div className="flex-1 flex flex-col">
                {/* Title & price */}
                <div className="p-6 md:p-8 pb-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <RatingStars rating={activeDeal.rating} />
                    <span className="text-xs text-gray-500">
                      {activeDeal.rating} · {activeDeal.reviews} reviews
                    </span>
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-[#0B1D36] leading-snug mb-4">
                    {activeDeal.title}
                  </h3>

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-3xl md:text-4xl font-bold text-[#0B1D36] tracking-tight">
                      {activeDeal.price}
                    </span>
                    <span className="text-base text-gray-400 line-through">
                      {activeDeal.oldPrice}
                    </span>
                    <span className="text-sm font-semibold text-[#E5484D]">
                      You save {activeDeal.save}
                    </span>
                  </div>
                </div>

                {/* Specs */}
                <div className="px-6 md:px-8 py-5 border-t border-gray-100">
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-gray-600">
                    {activeDeal.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#00A8E8] mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                      <Truck size={13} /> Free shipping
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                      <Gift size={13} /> Free gift
                    </span>
                  </div>
                </div>

                {/* Urgency & CTA */}
                <div className="px-6 md:px-8 py-5 border-t border-gray-100 mt-auto bg-gray-50/60">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0B1D36] mb-3">
                    <Clock size={15} className="text-[#E5484D]" />
                    Hurry up, offer ends in
                  </div>

                  <div className="flex gap-2 mb-5">
                    <TimeUnit value={timeLeft.days} label="days" />
                    <TimeUnit value={timeLeft.hours} label="hrs" />
                    <TimeUnit value={timeLeft.minutes} label="min" />
                    <TimeUnit value={timeLeft.seconds} label="sec" />
                  </div>

                  <div className="mb-5">
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>
                        {activeDeal.sold} sold of {activeDeal.total}
                      </span>
                      <span>Only {remaining} left</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00A8E8] rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/products/${activeDeal.id}`}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-colors"
                  >
                    Buy now
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Side Deals ===== */}
          <div className="lg:col-span-3 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
            {deals.map((deal) => {
              const discountPct = Math.round(
                (1 -
                  Number(deal.price.replace(/[^0-9]/g, "")) /
                    Number(deal.oldPrice.replace(/[^0-9]/g, ""))) *
                  100
              );
              const isActive = activeDeal.id === deal.id;
              return (
                <button
                  key={deal.id}
                  onClick={() => setActiveDeal(deal)}
                  aria-pressed={isActive}
                  className={`relative shrink-0 w-[220px] lg:w-full h-[148px] rounded-2xl overflow-hidden text-left transition-shadow ${
                    isActive
                      ? "ring-2 ring-[#00A8E8] ring-offset-2"
                      : "ring-1 ring-gray-100 hover:ring-gray-200"
                  }`}
                >
                  <Image
                    src={deal.images[0]}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  <span className="absolute top-3 right-3 bg-[#E5484D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {discountPct}% OFF
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs font-semibold leading-tight line-clamp-2 mb-1">
                      {deal.title}
                    </p>
                    <p className="text-white/90 text-xs font-bold">{deal.price}</p>
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