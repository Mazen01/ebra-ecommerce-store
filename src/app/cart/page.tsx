"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  // Access cart context for cart operations and data
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  // State for coupon code input
  const [couponCode, setCouponCode] = useState("");
  // State for selected shipping option
  const [selectedShipping, setSelectedShipping] = useState("free");

  // Available shipping options (note: pickup has a negative price for discount)
  const shippingOptions = [
    { id: "free", label: "Free shipping", price: 0 },
    { id: "express", label: "Express shipping", price: 15 },
    { id: "pickup", label: "Pick Up", price: -21 }, // Discount for pickup
  ];

  // Get the price of the selected shipping option
  const selectedShippingCost =
    shippingOptions.find((option) => option.id === selectedShipping)?.price ||
    0;
  // Calculate subtotal and total
  const subtotal = getTotalPrice();
  const total = subtotal + selectedShippingCost;

  // Show empty cart message if no items
  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/"
            className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-center mb-8">Cart</h1>

      {/* Progress Steps (static for demo) */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="ml-2 font-medium text-gray-900">
              Shopping cart
            </span>
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="ml-2 text-gray-500">Checkout details</span>
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="ml-2 text-gray-500">Order complete</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Table */}
        <div className="lg:col-span-2">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 py-4 border-b border-gray-200 text-sm font-medium text-gray-600">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Subtotal</div>
          </div>

          {/* Cart Items List */}
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.product.title}`}
                className="grid grid-cols-12 gap-4 py-6"
              >
                {/* Product Info */}
                <div className="col-span-6 flex items-center space-x-4">
                  <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 line-clamp-2">
                      {item.product.title}
                    </h3>
                    {/* Color is static for demo */}
                    <p className="text-sm text-gray-500 mt-1">Color: Black</p>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 mt-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-gray-50 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Price per item */}
                <div className="col-span-2 flex items-center justify-center">
                  <span className="font-medium">
                    ${item.product.price.toFixed(2)}
                  </span>
                </div>

                {/* Subtotal for this item */}
                <div className="col-span-2 flex items-center justify-center">
                  <span className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary and Coupon Section */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Cart summary</h3>

            {/* Shipping Options */}
            <div className="space-y-3 mb-6">
              {shippingOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value={option.id}
                      checked={selectedShipping === option.id}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-sm">{option.label}</span>
                  </div>
                  {/* Show + for positive, $0.00 for free, and - for discount */}
                  <span className="text-sm font-medium">
                    {option.price === 0
                      ? "$0.00"
                      : option.price > 0
                      ? `+${option.price.toFixed(2)}`
                      : `-${Math.abs(option.price).toFixed(2)}`}
                  </span>
                </label>
              ))}
            </div>

            {/* Summary (Subtotal and Total) */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Checkout
            </button>
          </div>

          {/* Coupon Section */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Have a coupon?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Add your code for an instant cart discount
            </p>
            <div className="flex">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
