"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminHeroSection() {
  const [slides, setSlides] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    buttonText: "Shop Now",
    buttonLink: "",
    price: "",
    bg: "bg-gradient-to-br from-[#0B1D36] to-[#132B4A]",
    order: 0,
    isActive: true,
    imageUrl: "", // for pasting link
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload"); // toggle

  const fetchSlides = async () => {
    try {
      const res = await fetch(`${API_URL}/api/hero/admin`);
      const data = await res.json();
      setSlides(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setForm((prev) => ({ ...prev, imageUrl: "" })); // clear url when file is chosen
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setForm((prev) => ({ ...prev, imageUrl: url }));
    setPreview(url);
    setImageFile(null); // clear file when url is used
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("description", form.description);
      formData.append("buttonText", form.buttonText);
      formData.append("buttonLink", form.buttonLink);
      formData.append("price", form.price);
      formData.append("bg", form.bg);
      formData.append("order", String(form.order));
      formData.append("isActive", String(form.isActive));

      // Priority: file upload > image URL
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (form.imageUrl) {
        formData.append("image", form.imageUrl); // send URL as string
      }

      const url = editingId
        ? `${API_URL}/api/hero/${editingId}`
        : `${API_URL}/api/hero`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Something went wrong");
      }

      // Reset
      setForm({
        title: "",
        subtitle: "",
        description: "",
        buttonText: "Shop Now",
        buttonLink: "",
        price: "",
        bg: "bg-gradient-to-br from-[#0B1D36] to-[#132B4A]",
        order: 0,
        isActive: true,
        imageUrl: "",
      });
      setImageFile(null);
      setPreview("");
      setEditingId(null);
      setImageMode("upload");
      fetchSlides();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (slide: any) => {
    setForm({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      price: slide.price,
      bg: slide.bg || "bg-gradient-to-br from-[#0B1D36] to-[#132B4A]",
      order: slide.order || 0,
      isActive: slide.isActive,
      imageUrl: slide.image?.startsWith("http") ? slide.image : "",
    });

    const imgSrc = slide.image?.startsWith("http")
      ? slide.image
      : `${API_URL}${slide.image}`;

    setPreview(imgSrc);
    setImageFile(null);
    setEditingId(slide._id);
    setImageMode(slide.image?.startsWith("http") ? "url" : "upload");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this slide?")) return;
    await fetch(`${API_URL}/api/hero/${id}`, { method: "DELETE" });
    fetchSlides();
  };

  // Helper for image URL
  const getImageUrl = (image: string) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${API_URL}${image}`;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Manage Hero Section
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow border border-slate-200 mb-8 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Premium Sound"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Subtitle *
            </label>
            <input
              type="text"
              placeholder="e.g. WIRELESS HEADPHONES"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description * (use new lines)
            </label>
            <textarea
              placeholder="Immersive Noise Cancellation&#10;40-Hour Battery • Hi-Res Audio"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
              rows={3}
              required
            />
          </div>

          {/* Button Text */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Button Text
            </label>
            <input
              type="text"
              placeholder="Shop Now"
              value={form.buttonText}
              onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
            />
          </div>

          {/* Button Link */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Button Link *
            </label>
            <input
              type="text"
              placeholder="/products/laptops"
              value={form.buttonLink}
              onChange={(e) => setForm({ ...form, buttonLink: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Price *
            </label>
            <input
              type="text"
              placeholder="Rs. 12,499"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
              required
            />
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Order
            </label>
            <input
              type="number"
              placeholder="0"
              value={form.order}
              onChange={(e) =>
                setForm({ ...form, order: Number(e.target.value) })
              }
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
            />
          </div>
        </div>

        {/* ===== IMAGE SECTION ===== */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Hero Image *
          </label>

          {/* Toggle buttons */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setImageMode("upload")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                imageMode === "upload"
                  ? "bg-[#00A8E8] text-white"
                  : "bg-white text-slate-600 border border-slate-300"
              }`}
            >
              Upload from Gallery
            </button>
            <button
              type="button"
              onClick={() => setImageMode("url")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                imageMode === "url"
                  ? "bg-[#00A8E8] text-white"
                  : "bg-white text-slate-600 border border-slate-300"
              }`}
            >
              Paste Image Link
            </button>
          </div>

          {imageMode === "upload" ? (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-700 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
              />
              <p className="text-xs text-slate-500 mt-1">
                Supported: JPG, PNG, WEBP (max 5MB)
              </p>
            </div>
          ) : (
            <div>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-xxxx or any image URL"
                value={form.imageUrl}
                onChange={handleUrlChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
              />
              <p className="text-xs text-slate-500 mt-1">
                Paste any direct image link (Unsplash, Cloudinary, etc.)
              </p>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-sm text-slate-600 mb-2">Preview:</p>
              <div className="relative w-56 h-32 rounded-lg overflow-hidden border border-slate-200 bg-white">
                {/* Using regular img for reliability in admin */}
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/300x150?text=Image+Error";
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Active + Buttons */}
        <div className="flex items-center gap-4 pt-2">
          <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
              className="w-4 h-4 rounded border-slate-300 text-[#00A8E8] focus:ring-[#00A8E8]"
            />
            <span className="text-sm font-medium">Active</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#00A8E8] hover:bg-[#0090c8] text-white font-medium px-6 py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Saving..." : editingId ? "Update Slide" : "Add Slide"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({
                  title: "",
                  subtitle: "",
                  description: "",
                  buttonText: "Shop Now",
                  buttonLink: "",
                  price: "",
                  bg: "bg-gradient-to-br from-[#0B1D36] to-[#132B4A]",
                  order: 0,
                  isActive: true,
                  imageUrl: "",
                });
                setPreview("");
                setImageFile(null);
                setImageMode("upload");
              }}
              className="text-slate-500 hover:text-slate-700 text-sm font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Current Slides List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Current Slides ({slides.length})
        </h2>

        {slides.length === 0 ? (
          <p className="text-slate-500 text-sm">No slides yet. Add one above.</p>
        ) : (
          slides.map((slide) => (
            <div
              key={slide._id}
              className="bg-white p-4 rounded-xl shadow border border-slate-200 flex items-center gap-4"
            >
              {/* Thumbnail - using regular img for reliability */}
              <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 bg-slate-100">
                <img
                  src={getImageUrl(slide.image)}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/128x80?text=No+Image";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 truncate">
                  {slide.title}
                </h3>
                <p className="text-sm text-slate-500 truncate">
                  {slide.subtitle}
                </p>
                <p className="text-sm font-medium text-slate-700 mt-0.5">
                  {slide.price}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Order: {slide.order} •{" "}
                  {slide.isActive ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-500">Inactive</span>
                  )}
                </p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(slide)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(slide._id)}
                  className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}