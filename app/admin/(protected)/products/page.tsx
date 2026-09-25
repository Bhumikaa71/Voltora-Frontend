"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Package,
  Filter,
  ImagePlus,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Product {
  _id: string;
  title: string;
  price: number;
  oldPrice?: number;
  category: string;
  brand?: string;
  stock: "In Stock" | "Low Stock" | "Out of Stock";
  images: string[];
  rating: number;
  description?: string;
  features?: string[];
  freeShipping?: boolean;
  freeGift?: boolean;
  isActive?: boolean;
  dealEndsAt?: string | null;
}

const MAX_IMAGES = 5;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    oldPrice: "",
    category: "",
    brand: "",
    stock: "In Stock" as Product["stock"],
    images: [""] as string[],
    description: "",
    freeShipping: false,
    freeGift: false,
    dealEndsAt: "", // NEW
  });

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/api/products/admin/all`),
        fetch(`${API_URL}/api/products/categories`),
      ]);
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      setProducts(Array.isArray(productsData) ? productsData : []);
      setExistingCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({
      title: "",
      price: "",
      oldPrice: "",
      category: "",
      brand: "",
      stock: "In Stock",
      images: [""],
      description: "",
      freeShipping: false,
      freeGift: false,
      dealEndsAt: "",
    });
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      title: product.title,
      price: String(product.price),
      oldPrice: product.oldPrice ? String(product.oldPrice) : "",
      category: product.category || "",
      brand: product.brand || "",
      stock: product.stock,
      images: product.images?.length ? [...product.images] : [""],
      description: product.description || "",
      freeShipping: product.freeShipping || false,
      freeGift: product.freeGift || false,
      // datetime-local needs "YYYY-MM-DDTHH:mm"
      dealEndsAt: product.dealEndsAt
        ? new Date(product.dealEndsAt).toISOString().slice(0, 16)
        : "",
    });
    setShowModal(true);
  };

  const updateImage = (index: number, value: string) => {
    setForm((f) => {
      const next = [...f.images];
      next[index] = value;
      return { ...f, images: next };
    });
  };

  const addImageField = () => {
    if (form.images.length >= MAX_IMAGES) return;
    setForm((f) => ({ ...f, images: [...f.images, ""] }));
  };

  const removeImageField = (index: number) => {
    if (form.images.length <= 1) return;
    setForm((f) => ({
      ...f,
      images: f.images.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cleanImages = form.images
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    if (cleanImages.length === 0) {
      alert("Please add at least one image URL");
      setLoading(false);
      return;
    }
    if (!form.category.trim()) {
      alert("Please enter a category");
      setLoading(false);
      return;
    }

    const payload = {
      title: form.title,
      price: parseFloat(form.price) || 0,
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : undefined,
      category: form.category.trim(),
      brand: form.brand,
      stock: form.stock,
      images: cleanImages,
      description: form.description,
      freeShipping: form.freeShipping,
      freeGift: form.freeGift,
      dealEndsAt: form.dealEndsAt
        ? new Date(form.dealEndsAt).toISOString()
        : null,
    };

    try {
      const url = editing
        ? `${API_URL}/api/products/${editing._id}`
        : `${API_URL}/api/products`;
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to save");
      }

      setShowModal(false);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });
    fetchData();
  };

  const stockColor = (stock: Product["stock"]) => {
    if (stock === "In Stock") return "bg-emerald-50 text-emerald-600";
    if (stock === "Low Stock") return "bg-amber-50 text-amber-600";
    return "bg-red-50 text-red-500";
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Products</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 h-10 px-4 bg-[#0B1D36] hover:bg-[#00A8E8] text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
          />
        </div>
        <div className="relative">
          <Filter
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700 bg-white appearance-none min-w-[160px]"
          >
            <option value="All">All</option>
            {existingCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                  Stock
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                  Deal ends
                </th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <Package size={32} className="mx-auto text-slate-200 mb-2" />
                    <p className="text-slate-400 text-sm">No products found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-slate-50 hover:bg-slate-50/50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-slate-50 overflow-hidden shrink-0">
                          <Image
                            src={product.images[0] || "/placeholder.png"}
                            alt={product.title}
                            fill
                            className="object-contain p-1"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 line-clamp-1">
                            {product.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            ID: {product._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-slate-500">
                      {product.category}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        ${product.price.toFixed(2)}
                      </p>
                      {product.oldPrice && (
                        <p className="text-xs text-slate-400 line-through">
                          ${product.oldPrice.toFixed(2)}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${stockColor(
                          product.stock
                        )}`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-xs text-slate-500">
                      {product.dealEndsAt
                        ? new Date(product.dealEndsAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(product)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-[#00A8E8]"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-800">
                {editing ? "Edit Product" : "Add Product"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Product name *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Old price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.oldPrice}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, oldPrice: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                  />
                </div>
              </div>

              {/* NEW – Deal ends at */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Deal ends at (optional)
                </label>
                <input
                  type="datetime-local"
                  value={form.dealEndsAt}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dealEndsAt: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Shows countdown on “Deals of the Day” when old price is set
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    list="category-list"
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    placeholder="Type or select category"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                  />
                  <datalist id="category-list">
                    {existingCategories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Stock
                  </label>
                  <select
                    value={form.stock}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        stock: e.target.value as Product["stock"],
                      }))
                    }
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700 bg-white"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Brand
                </label>
                <input
                  type="text"
                  value={form.brand}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, brand: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    Images (1 main + up to 4)
                  </label>
                  <span className="text-xs text-slate-400">
                    {form.images.length}/{MAX_IMAGES}
                  </span>
                </div>
                <div className="space-y-3">
                  {form.images.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => updateImage(index, e.target.value)}
                        placeholder={
                          index === 0 ? "Main image URL *" : "Sub image URL"
                        }
                        className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#00A8E8] text-slate-700"
                      />
                      {url.trim() && (
                        <div className="relative w-11 h-11 rounded-xl bg-slate-50 overflow-hidden shrink-0 border">
                          <Image
                            src={url}
                            alt=""
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      {form.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {form.images.length < MAX_IMAGES && (
                  <button
                    type="button"
                    onClick={addImageField}
                    className="mt-3 w-full h-10 flex items-center justify-center gap-2 border border-dashed border-slate-200 rounded-xl text-sm text-slate-500 hover:border-[#00A8E8] hover:text-[#00A8E8]"
                  >
                    <ImagePlus size={16} />
                    Add another image
                  </button>
                )}
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.freeShipping}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        freeShipping: e.target.checked,
                      }))
                    }
                  />
                  Free Shipping
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.freeGift}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, freeGift: e.target.checked }))
                    }
                  />
                  Free Gift
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 h-11 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-11 text-sm font-semibold text-white bg-[#0B1D36] hover:bg-[#00A8E8] rounded-xl disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editing
                    ? "Save Changes"
                    : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}