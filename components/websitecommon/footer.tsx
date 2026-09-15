"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#0B1D36] text-white relative overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A8E8]/40 to-transparent" />

      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Top Section: Brand + Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-5">
                <div className="relative w-40 h-12">
                  <Image
                    src="/images/logo.jpg"
                    alt="Logo"
                    fill
                    className="object-contain object-left"
                    sizes="160px"
                  />
                </div>
              </Link>
              <p className="text-sm text-white/65 leading-relaxed mb-6 max-w-sm">
                Your trusted destination for the latest smartphones, laptops,
                gaming gear, and premium tech accessories. Quality products,
                fast delivery, and expert support.
              </p>

              {/* Contact Highlights */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-[#00A8E8] shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/40">
                      Hotline 24/7
                    </p>
                    <a
                      href="tel:+9779800000000"
                      className="text-sm font-medium text-white hover:text-[#00A8E8] transition-colors"
                    >
                      +977 980-000-0000
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-[#00A8E8] mt-0.5 shrink-0" />
                  <span className="text-sm text-white/60">
                    123 Tech Street, Kathmandu, Nepal
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-[#00A8E8] shrink-0" />
                  <a
                    href="mailto:support@example.com"
                    className="text-sm text-white/60 hover:text-[#00A8E8] transition-colors"
                  >
                    support@example.com
                  </a>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5">
                {[
                  { icon: FaTwitter, label: "Twitter", href: "#" },
                  { icon: FaFacebookF, label: "Facebook", href: "#" },
                  { icon: FaInstagram, label: "Instagram", href: "#" },
                  { icon: FaYoutube, label: "YouTube", href: "#" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#00A8E8] hover:border-[#00A8E8] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter / Subscribe */}
            <div className="lg:col-span-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                      Subscribe & Get{" "}
                      <span className="text-[#00A8E8]">10% OFF</span> Your
                      First Order
                    </h3>
                    <p className="text-sm text-white/55 mt-1">
                      Be the first to know about new arrivals, exclusive deals,
                      and tech tips.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="relative flex-1">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/8 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00A8E8]/60 focus:ring-1 focus:ring-[#00A8E8]/30 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-12 px-6 rounded-xl bg-[#00A8E8] hover:bg-[#0090c8] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight size={16} />
                  </button>
                </form>
                <p className="text-xs text-white/40 mt-3">
                  By subscribing, you agree to our{" "}
                  <Link
                    href="/privacy"
                    className="underline hover:text-[#00A8E8] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 border-t border-white/10 pt-12">
            {/* Top Categories */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-5">
                Top Categories
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Laptops", href: "/products/laptops" },
                  { label: "Smartphones", href: "/products/cell-phones" },
                  { label: "Tablets", href: "/products/tablets" },
                  { label: "Gaming & VR", href: "/products/gaming" },
                  { label: "Accessories", href: "/products/accessories" },
                  { label: "Audio & Speakers", href: "/products/audio" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-[#00A8E8] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-5">
                Company
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "Careers", href: "/careers" },
                  { label: "Blog", href: "/blog" },
                  { label: "Store Locator", href: "/stores" },
                  { label: "Sitemap", href: "/sitemap" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-[#00A8E8] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Center */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-5">
                Help Center
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Customer Service", href: "/support" },
                  { label: "Track Order", href: "/orders" },
                  { label: "Returns & Refunds", href: "/returns" },
                  { label: "Shipping Info", href: "/shipping" },
                  { label: "FAQs", href: "/faq" },
                  { label: "My Account", href: "/account" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-[#00A8E8] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partner */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-5">
                Partner
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Become a Seller", href: "/seller" },
                  { label: "Affiliate Program", href: "/affiliate" },
                  { label: "Advertise With Us", href: "/advertise" },
                  { label: "Partnerships", href: "/partnerships" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-[#00A8E8] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-5">
                Why Shop With Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00A8E8]/15 flex items-center justify-center shrink-0">
                    <Truck size={15} className="text-[#00A8E8]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      Fast Delivery
                    </p>
                    <p className="text-xs text-white/45">
                      Free shipping over Rs. 5,000
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00A8E8]/15 flex items-center justify-center shrink-0">
                    <ShieldCheck size={15} className="text-[#00A8E8]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      Secure Payment
                    </p>
                    <p className="text-xs text-white/45">
                      100% protected checkout
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00A8E8]/15 flex items-center justify-center shrink-0">
                    <Headphones size={15} className="text-[#00A8E8]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90">
                      24/7 Support
                    </p>
                    <p className="text-xs text-white/45">
                      Expert help whenever you need
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#081526]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/45 text-center md:text-left">
              © {new Date().getFullYear()} Your Store Name. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3 opacity-70">
              <span className="text-[10px] uppercase tracking-wider text-white/40 mr-1">
                We Accept
              </span>
              <div className="flex items-center gap-2">
                {["Visa", "Mastercard", "eSewa", "Khalti"].map((method) => (
                  <span
                    key={method}
                    className="px-2.5 py-1 rounded bg-white/10 text-[10px] font-medium text-white/70"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-5 text-xs text-white/45">
              <Link
                href="/privacy"
                className="hover:text-[#00A8E8] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#00A8E8] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;