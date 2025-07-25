"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import {
  Filter,
  Grid3X3,
  List,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";

export default function HomePage() {
  // State for all products
  const [products, setProducts] = useState<Product[]>([]);
  // State for filtered products (after applying filters/sort)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // State for available categories
  const [categories, setCategories] = useState<string[]>([]);
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    // Fetch products and categories on mount
    async function fetchData() {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter and sort products whenever filters or sort change
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price range
    if (selectedPriceRange) {
      switch (selectedPriceRange) {
        case "0-99":
          filtered = filtered.filter(
            (product) => product.price >= 0 && product.price <= 99.99
          );
          break;
        case "100-199":
          filtered = filtered.filter(
            (product) => product.price >= 100 && product.price <= 199.99
          );
          break;
        case "200-299":
          filtered = filtered.filter(
            (product) => product.price >= 200 && product.price <= 299.99
          );
          break;
        case "300-399":
          filtered = filtered.filter(
            (product) => product.price >= 300 && product.price <= 399.99
          );
          break;
        case "400+":
          filtered = filtered.filter((product) => product.price >= 400);
          break;
      }
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedPriceRange, sortBy]);

  // Show error message if data failed to load
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-red-600 text-lg font-medium mb-2">
            Oops! Something went wrong
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Furniture Background */}
      <div
        className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=400&fit=crop&crop=center')`,
          backgroundPosition: "center center",
        }}
      >
        <div className="text-center max-w-2xl px-4">
          <nav className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
            <span>Home</span>
            <span>{">"}</span>
            <span className="text-gray-900">Shop</span>
          </nav>
          <h1 className="text-5xl font-medium text-gray-900 mb-4">Shop Page</h1>
          <p className="text-lg text-gray-600">
            Let's shop from the place you always imagined.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="space-y-8">
              {/* Filter Header */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">Filter</span>
              </div>

              {/* Categories Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">CATEGORIES</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === ""}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="sr-only"
                    />
                    <span
                      className={`text-sm ${
                        selectedCategory === ""
                          ? "text-gray-900 font-medium border-l-2 border-gray-900 pl-4"
                          : "text-gray-600"
                      }`}
                    >
                      All Products
                    </span>
                  </label>
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="sr-only"
                      />
                      <span
                        className={`text-sm capitalize ${
                          selectedCategory === category
                            ? "text-gray-900 font-medium border-l-2 border-gray-900 pl-4"
                            : "text-gray-600"
                        }`}
                      >
                        {category.replace("'", "")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">PRICE</h3>
                <div className="space-y-3">
                  {[
                    { label: "All Price", value: "" },
                    { label: "$0.00 - $99.99", value: "0-99" },
                    { label: "$100.00 - $199.99", value: "100-199" },
                    { label: "$200.00 - $299.99", value: "200-299" },
                    { label: "$300.00 - $399.99", value: "300-399" },
                    { label: "$400.00+", value: "400+" },
                  ].map((range) => (
                    <label
                      key={range.value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPriceRange === range.value}
                        onChange={(e) =>
                          setSelectedPriceRange(
                            e.target.checked ? range.value : ""
                          )
                        }
                        className="rounded border-gray-300 mr-2"
                      />
                      <span className="text-sm text-gray-600">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with Sort and View Options */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedCategory
                  ? selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
                  : "All Products"}
              </h2>

              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer"
                  >
                    <option value="featured">Sort by</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Toggle Grid */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  {/* 3x3 Grid View */}
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-white shadow-sm"
                        : "hover:bg-gray-200"
                    }`}
                    title="Grid View (3 columns)"
                  >
                    <div className="grid grid-cols-3 gap-0.5 w-4 h-4">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 bg-gray-600 rounded-sm"
                        ></div>
                      ))}
                    </div>
                  </button>

                  {/* 2x2 Grid View */}
                  <button
                    onClick={() => setViewMode("grid")}
                    className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                    title="Grid View (2 columns)"
                  >
                    <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-sm"
                        ></div>
                      ))}
                    </div>
                  </button>

                  {/* List View (Vertical Lines) */}
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-white shadow-sm"
                        : "hover:bg-gray-200"
                    }`}
                    title="List View"
                  >
                    <div className="flex flex-col space-y-0.5 w-4 h-4">
                      <div className="w-full h-1 bg-gray-600 rounded-sm"></div>
                      <div className="w-full h-1 bg-gray-600 rounded-sm"></div>
                      <div className="w-full h-1 bg-gray-600 rounded-sm"></div>
                    </div>
                  </button>

                  {/* Menu View (Hamburger) */}
                  <button
                    className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                    title="Menu View"
                  >
                    <div className="flex flex-col space-y-0.5 w-4 h-4">
                      <div className="w-full h-0.5 bg-gray-400 rounded-sm"></div>
                      <div className="w-full h-0.5 bg-gray-400 rounded-sm"></div>
                      <div className="w-full h-0.5 bg-gray-400 rounded-sm"></div>
                      <div className="w-full h-0.5 bg-gray-400 rounded-sm"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-500 mb-6">
              {loading
                ? "Loading..."
                : `Showing ${filteredProducts.length} of ${products.length} products`}
            </div>

            {/* Products Grid or List */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* No Results Message */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedPriceRange("");
                    setSortBy("featured");
                  }}
                  className="text-black hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load More Button (static for demo) */}
            {!loading && filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="border border-gray-300 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Show more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
