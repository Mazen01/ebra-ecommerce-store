"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  // Mock discount for some products
  const hasDiscount = product.id % 3 === 0;
  const discountPercentage = hasDiscount ? 50 : 0;
  const originalPrice = hasDiscount ? product.price * 2 : product.price;

  return (
    <div className="group relative bg-white">
      <Link href={`/product/${product.id}`}>
        {/* Product Image Container */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-lg mb-4">
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Heart
              className={`h-4 w-4 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>

          {/* Product Image */}
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Add to Cart Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add to cart
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(product.rating.rate)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            {product.rating.rate} ({product.rating.count} reviews)
          </span>
        </div>

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-gray-900 font-medium text-sm line-clamp-2 hover:text-gray-700 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
