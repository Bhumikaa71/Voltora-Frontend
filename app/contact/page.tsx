"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ChevronRight,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can later connect to an API / email service
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-[#F4F6F9] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#00A8E8] transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#0B1D36] font-medium">Contact</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1D36] mb-3">
            Get in Touch
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Have a question about a product, order, or partnership?  
            We’d love to hear from you. Our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ========== LEFT: Contact Info ========== */}
          <div className="space-y-5">
            {/* Phone */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0B1D36] text-white flex items-center justify-center flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1D36] mb-0.5">Call Us</h3>
                <p className="text-sm text-gray-500 mb-1">Mon–Sat, 9am – 8pm</p>
                <a
                  href="tel:+02538862516"
                  className="text-[#00A8E8] font-medium text-sm hover:underline"
                >
                  (025) 3886 25 16
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00A8E8] text-white flex items-center justify-center flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1D36] mb-0.5">Email Us</h3>
                <p className="text-sm text-gray-500 mb-1">We reply within 24 hours</p>
                <a
                  href="mailto:support@voltora.com"
                  className="text-[#00A8E8] font-medium text-sm hover:underline"
                >
                  support@voltora.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0B1D36] text-white flex items-center justify-center flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1D36] mb-0.5">Visit Us</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Kathmandu, Nepal<br />
                  New Baneshwor, Ward 10
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00A8E8] text-white flex items-center justify-center flex-shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1D36] mb-0.5">Working Hours</h3>
                <p className="text-sm text-gray-500">
                  Sunday – Friday: 9:00 AM – 8:00 PM<br />
                  Saturday: 10:00 AM – 5:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* ========== RIGHT: Contact Form ========== */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0B1D36]/5 text-[#0B1D36] flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0B1D36]">
                    Send us a Message
                  </h2>
                  <p className="text-sm text-gray-400">
                    Fill out the form and we’ll get back to you shortly
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Send size={20} />
                  </div>
                  <h3 className="font-semibold text-emerald-800 mb-1">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-emerald-600">
                    Thank you for contacting us. We’ll reply as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#0B1D36] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 focus:border-[#00A8E8] text-[#0B1D36] placeholder:text-gray-400"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-[#0B1D36] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 focus:border-[#00A8E8] text-[#0B1D36] placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-[#0B1D36] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+977 98XXXXXXXX"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 focus:border-[#00A8E8] text-[#0B1D36] placeholder:text-gray-400"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-[#0B1D36] mb-1.5">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 focus:border-[#00A8E8] text-[#0B1D36] bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[#0B1D36] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/30 focus:border-[#00A8E8] text-[#0B1D36] placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0B1D36] hover:bg-[#00A8E8] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Optional: Map placeholder */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-64 sm:h-80 bg-gradient-to-br from-[#0B1D36] to-[#132B4A] flex items-center justify-center relative">
            <div className="text-center text-white/80">
              <MapPin size={36} className="mx-auto mb-3 opacity-60" />
              <p className="font-medium">Kathmandu, Nepal</p>
              <p className="text-sm text-white/50 mt-1">
                New Baneshwor, Ward 10
              </p>
            </div>
            {/* You can later replace this with a real Google Maps iframe */}
          </div>
        </div>
      </div>
    </div>
  );
}