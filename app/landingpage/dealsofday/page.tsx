"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Truck, Gift } from "lucide-react";

const deals = [
  {
    id: 1,
    title: "Xiaomi Redmi Note 11 Pro 256GB 2023, Black Smartphone",
    price: "Rs. 42,999",
    oldPrice: "Rs. 60,999",
    save: "Rs. 18,000",
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

  return (
    <section className="py-10 lg:py-14 bg-white">
      
      {/* ===== FULL WIDTH BADGE ===== */}
      <div className="w-full bg-[#00A8E8] py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-white font-bold text-sm tracking-[0.15em]">
            DEALS OF THE DAY
          </h2>
        </div>
      </div>

      {/* ===== CONTENT (max-w-7xl) ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Deal */}
          <div className="lg:col-span-9 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              
              {/* Image Gallery */}
              <div className="relative w-full lg:w-[45%] bg-gray-50 p-6 flex flex-col items-center">
                <div className="absolute top-5 left-5 z-10 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow">
                  SAVE<br />
                  <span className="text-sm">{activeDeal.save}</span>
                </div>

                <div className="relative w-full h-[300px] mb-4">
                  <Image
                    src={activeDeal.images[selectedImage]}
                    alt={activeDeal.title}
                    fill
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3">
                  {activeDeal.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-[#00A8E8]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumb ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">(12 reviews)</p>
                  <h3 className="text-lg md:text-xl font-bold text-[#0B1D36] leading-snug mb-3">
                    {activeDeal.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-[#00A8E8]">
                      {activeDeal.price}
                    </span>
                    <span className="text-base text-gray-400 line-through">
                      {activeDeal.oldPrice}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-sm text-gray-600 mb-5">
                    {activeDeal.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                      <Truck size={13} /> FREE SHIPPING
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                      <Gift size={13} /> FREE GIFT
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0B1D36] mb-3">
                    <Clock size={15} className="text-[#00A8E8]" />
                    HURRY UP! OFFER ENDS IN
                  </div>

                  <div className="flex gap-2 mb-5">
                    {[
                      { value: timeLeft.days, label: "d" },
                      { value: timeLeft.hours, label: "h" },
                      { value: timeLeft.minutes, label: "m" },
                      { value: timeLeft.seconds, label: "s" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center"
                      >
                        <span className="text-lg font-bold text-[#0B1D36]">
                          {String(item.value).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>Sold: {activeDeal.sold}/{activeDeal.total}</span>
                      <span>{progress}% claimed</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00A8E8] to-green-400 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/products/${activeDeal.id}`}
                    className="inline-flex items-center justify-center bg-[#0B1D36] hover:bg-[#00A8E8] text-white font-semibold text-sm px-8 py-3 rounded-full transition-all"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Side Images with Zoom on Hover */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {deals.map((deal) => (
              <button
                key={deal.id}
                onClick={() => setActiveDeal(deal)}
                className={`relative h-[148px] rounded-2xl overflow-hidden group transition-all ${
                  activeDeal.id === deal.id
                    ? "ring-2 ring-[#00A8E8] ring-offset-2"
                    : ""
                }`}
              >
                <Image
                  src={deal.images[0]}
                  alt={deal.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {deal.id === 2 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    50% OFF
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;