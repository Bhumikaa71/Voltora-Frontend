"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#0B1D36] via-[#0E2544] to-[#132B4A] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A8E8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00A8E8]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-20">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-10">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/80">Contact</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              We’d love to{" "}
              <span className="text-[#00A8E8]">hear from you</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed">
              Whether you have a question about products, orders, or anything
              else — our team is ready to help you.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B1D36] to-[#132B4A] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                  Phone
                </p>
                <a
                  href="tel:+02538862516"
                  className="text-[15px] font-semibold text-[#0B1D36] hover:text-[#00A8E8] transition-colors"
                >
                  (025) 3886 25 16
                </a>
                <p className="text-xs text-gray-400 mt-0.5">
                  Mon – Sat, 9:00 AM – 8:00 PM
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00A8E8] to-[#00C2F0] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                  Email
                </p>
                <a
                  href="mailto:support@voltora.com"
                  className="text-[15px] font-semibold text-[#0B1D36] hover:text-[#00A8E8] transition-colors"
                >
                  support@voltora.com
                </a>
                <p className="text-xs text-gray-400 mt-0.5">
                  We reply within 24 hours
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B1D36] to-[#132B4A] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                  Address
                </p>
                <p className="text-[15px] font-semibold text-[#0B1D36]">
                  New Baneshwor, Kathmandu
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Ward 10, Nepal</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00A8E8] to-[#00C2F0] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                  Working Hours
                </p>
                <p className="text-[13px] text-[#0B1D36] leading-relaxed">
                  Sun – Fri: 9:00 AM – 8:00 PM
                  <br />
                  Saturday: 10:00 AM – 5:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1D36] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Thank you for reaching out. Our team will get back to you as
                    soon as possible.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <h2 className="text-xl font-bold text-[#0B1D36]">
                      Send a Message
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      Fill in the form below and we’ll respond shortly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                          Full Name <span className="text-[#E5484D]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 text-sm bg-[#F8FAFC] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/25 focus:border-[#00A8E8] focus:bg-white transition-all text-[#0B1D36] placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                          Email <span className="text-[#E5484D]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 text-sm bg-[#F8FAFC] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/25 focus:border-[#00A8E8] focus:bg-white transition-all text-[#0B1D36] placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+977 98XXXXXXXX"
                          className="w-full px-4 py-3 text-sm bg-[#F8FAFC] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/25 focus:border-[#00A8E8] focus:bg-white transition-all text-[#0B1D36] placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                          Subject <span className="text-[#E5484D]">*</span>
                        </label>
                        <select
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm bg-[#F8FAFC] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/25 focus:border-[#00A8E8] focus:bg-white transition-all text-[#0B1D36]"
                        >
                          <option value="">Choose a subject</option>
                          <option value="order">Order Inquiry</option>
                          <option value="product">Product Question</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-[#0B1D36] mb-1.5">
                        Message <span className="text-[#E5484D]">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        className="w-full px-4 py-3 text-sm bg-[#F8FAFC] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/25 focus:border-[#00A8E8] focus:bg-white transition-all text-[#0B1D36] placeholder:text-gray-400 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#0B1D36] to-[#132B4A] hover:from-[#00A8E8] hover:to-[#00C2F0] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#0B1D36]/20 hover:shadow-[#00A8E8]/30"
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Real Map - New Baneshwor */}
        <div className="mt-10 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <iframe
            title="New Baneshwor, Kathmandu"
            src="https://maps.google.com/maps?q=New%20Baneshwor%2C%20Kathmandu%2C%20Nepal&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-64 sm:h-80"
          />
        </div>
      </div>
    </div>
  );
}