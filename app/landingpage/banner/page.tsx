"use client";

import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

const Banner = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-[#00A8E8] shadow-sm">
          {/* Soft shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 pointer-events-none" />

          <div className="relative flex items-center justify-center gap-3 sm:gap-4 px-5 py-3.5 sm:py-4">
            {/* Star icon */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Star
                  size={18}
                  className="fill-amber-300 text-amber-300 drop-shadow-sm"
                />
              </div>
            </div>

            {/* Text */}
            <p className="text-center text-sm sm:text-base font-medium text-white leading-snug">
              Members get{" "}
              <span className="font-bold text-amber-200">FREE SHIPPING*</span>{" "}
              with no order restriction.{" "}
              <Link
                href="/membership"
                className="underline underline-offset-2 font-semibold hover:text-amber-100 transition-colors"
              >
                Free 30 days trial!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;