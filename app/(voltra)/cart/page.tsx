"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useStore();
  const [coupon, setCoupon] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 199 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="bg-[#F4F6F9] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-white border border-gray-100 flex items-center justify-center">
            <ShoppingBag size={32} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-[#0B1D36] mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Looks like you haven’t added anything yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F6F9] min-h-screen pb-16">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-[#00A8E8]">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#0B1D36] font-medium">Cart</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1D36]">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex gap-4"
              >
                <Link
                  href={`/products/${item.id}`}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-[#F7F8FA] rounded-xl overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#0B1D36] line-clamp-2 hover:text-[#00A8E8] transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-gray-300 hover:text-[#E5484D] transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {item.stock && (
                    <p className="text-xs text-emerald-600 font-medium mt-1">
                      {item.stock}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[#0B1D36]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-[15px] font-bold text-[#0B1D36]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.oldPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          ${(item.oldPrice * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-28">
              <h2 className="text-lg font-bold text-[#0B1D36] mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-[#0B1D36]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-[#0B1D36]">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-gray-400">
                    Free shipping on orders over $199
                  </p>
                )}
              </div>

              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <Tag
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 text-[#0B1D36]"
                  />
                </div>
                <button className="px-4 py-2.5 text-sm font-semibold text-[#0B1D36] bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                  Apply
                </button>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-5">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#0B1D36]">Total</span>
                  <span className="text-xl font-bold text-[#0B1D36]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full h-12 bg-[#0B1D36] hover:bg-[#00A8E8] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>

              <Link
                href="/products"
                className="block text-center text-sm text-[#00A8E8] font-medium mt-4 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}