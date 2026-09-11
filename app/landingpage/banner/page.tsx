"use client";

import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

const Banner = () => {
  return (
    <div className="w-full bg-[#00A8E8]">
      <div className="relative overflow-hidden">
        {/* Subtle shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 pointer-events-none" />

        <div className="relative flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5">
          {/* Star */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Star
                size={16}
                className="fill-amber-300 text-amber-300"
              />
            </div>
          </div>

          {/* Text */}
          <p className="text-center text-sm sm:text-[15px] font-medium text-white tracking-wide">
            Members get{" "}
            <span className="font-bold text-amber-200 uppercase tracking-wider">
              Free Shipping*
            </span>{" "}
            with no order restriction.{" "}
            <Link
              href="/membership"
              className="font-semibold underline underline-offset-4 decoration-white/70 hover:decoration-white hover:text-amber-100 transition-all"
            >
              Free 30 days trial!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;