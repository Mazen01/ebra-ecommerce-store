"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";

export default function ProductDetailPage() {
  // Get the dynamic route parameter (product id)
  const params = useParams();
  // Access cart context to add products to cart
  const { addToCart } = useCart();
  // State for product data
  const [product, setProduct] = useState<Product | null>(null);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState<string | null>(null);
  // State for currently selected image index in gallery
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // State for product quantity to add to cart
  const [quantity, setQuantity] = useState(1);
  // State for selected color
  const [selectedColor, setSelectedColor] = useState("Black");
  // State for wishlist toggle
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Available color options
  const colors = [
    { name: "Black", color: "#000000" },
    { name: "Gray", color: "#6B7280" },
    { name: "Red", color: "#EF4444" },
    { name: "White", color: "#FFFFFF" },
  ];

  useEffect(() => {
    // Fetch product data when component mounts or id changes
    async function fetchProduct() {
      try {
        setLoading(true);
        const productData = await api.getProduct(Number(params.id));
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError("Failed to load product. Please try again later.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  // Add product to cart with selected quantity
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  // Show loading skeleton while fetching product
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error message or fallback if product not found
  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-600 text-lg font-medium mb-2">
            {error || "Product not found"}
          </div>
          <Link
            href="/"
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Mock additional images for demo (using the same image)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];
  // Determine if product has a discount (mock logic)
  const hasDiscount = product.id % 3 === 0;
  const discountPercentage = hasDiscount ? 50 : 0;
  const originalPrice = hasDiscount ? product.price * 2 : product.price;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span>{">"}</span>
        <Link href="/" className="hover:text-gray-900">
          Shop
        </Link>
        <span>{">"}</span>
        <span className="capitalize">{product.category}</span>
        <span>{">"}</span>
        <span className="text-gray-900">Product</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images Section */}
        <div className="space-y-4">
          {/* Main Product Image with navigation arrows and discount badges */}
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-4 left-4 z-10 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded">
                NEW
              </div>
            )}
            {hasDiscount && (
              <div className="absolute top-4 left-16 z-10 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded">
                -{discountPercentage}%
              </div>
            )}

            <Image
              src={productImages[selectedImageIndex]}
              alt={product.title}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Navigation Arrows for image gallery */}
            <button
              onClick={() =>
                setSelectedImageIndex((prev) =>
                  prev === 0 ? productImages.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() =>
                setSelectedImageIndex((prev) =>
                  prev === productImages.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Thumbnail Images for quick selection */}
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 ${
                  selectedImageIndex === index
                    ? "border-black"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          {/* Product Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating.rate)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating.count} Reviews
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-3xl font-semibold text-gray-900">Tray Table</h1>

          {/* Product Description */}
          <p className="text-gray-600 leading-relaxed">
            Buy one or buy a few and make every space where you sit more
            convenient. Light and easy to move around with removable tray top,
            handy for serving snacks.
          </p>

          {/* Product Price and Discount */}
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xl text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Offer Timer (static for demo) */}
          <div className="border border-gray-200 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Offer expires in:</p>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">02</div>
                <div className="text-xs text-gray-500">Days</div>
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-gray-500">Hours</div>
              </div>
              <div>
                <div className="text-2xl font-bold">45</div>
                <div className="text-xs text-gray-500">Minutes</div>
              </div>
              <div>
                <div className="text-2xl font-bold">05</div>
                <div className="text-xs text-gray-500">Seconds</div>
              </div>
            </div>
          </div>

          {/* Measurements (static for demo) */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Measurements</h3>
            <p className="text-gray-600">17 1/2×20 5/8 </p>
          </div>

          {/* Color Selection Buttons */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Choose Color</h3>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-3">{selectedColor}</p>
            <div className="flex space-x-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-12 h-12 rounded-lg border-2 ${
                    selectedColor === color.name
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                >
                  {/* Add border for white color for visibility */}
                  {color.name === "White" && (
                    <div className="w-full h-full border border-gray-200 rounded-lg"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector, Wishlist, and Add to Cart Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
              <span>Wishlist</span>
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          {/* Product Details (SKU, Category) */}
          <div className="pt-6 border-t space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">SKU</span>
              <span className="font-medium">1117</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">CATEGORY</span>
              <span className="font-medium capitalize">Casual, Office</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs (static for demo) */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
              Additional Info
            </button>
            <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
              Questions
            </button>
            <button className="border-b-2 border-black py-4 px-1 text-sm font-medium text-gray-900">
              Reviews
            </button>
          </nav>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-medium">11 Reviews</span>
            <span className="text-gray-600">Tray Table</span>
          </div>

          {/* Example Customer Review (static for demo) */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">MB</span>
              </div>
              <div>
                <h4 className="font-semibold">Mazen Ebra</h4>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">رهييبببببه انصحكم فيها 😁⭐️</p>
          </div>
        </div>
      </div>
    </div>
  );
}
