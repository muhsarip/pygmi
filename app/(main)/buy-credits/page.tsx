"use client"

import { useState } from "react"
import { Check, Coins, Sparkles, Zap } from "lucide-react"
import toast from "react-hot-toast"

interface CreditPackage {
  id: string
  credits: number
  price: number
  pricePerCredit: number
  popular?: boolean
  badge?: string
  features: string[]
}

const packages: CreditPackage[] = [
  {
    id: "starter",
    credits: 25,
    price: 10,
    pricePerCredit: 0.4,
    features: ["25 image generations", "All models available", "HD quality"],
  },
  {
    id: "popular",
    credits: 100,
    price: 30,
    pricePerCredit: 0.3,
    popular: true,
    badge: "Most Popular",
    features: [
      "100 image generations",
      "All models available",
      "HD quality",
      "Priority support",
    ],
  },
  {
    id: "pro",
    credits: 250,
    price: 60,
    pricePerCredit: 0.24,
    badge: "Best Value",
    features: [
      "250 image generations",
      "All models available",
      "HD quality",
      "Priority support",
      "Early access to new features",
    ],
  },
  {
    id: "enterprise",
    credits: 1000,
    price: 200,
    pricePerCredit: 0.2,
    badge: "Enterprise",
    features: [
      "1000 image generations",
      "All models available",
      "HD quality",
      "Priority support",
      "Early access to new features",
      "Dedicated account manager",
    ],
  },
]

export default function BuyCreditsPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const handleBuyCredits = (pkg: CreditPackage) => {
    setSelectedPackage(pkg.id)
    // Dummy action - just show toast
    toast.success("This is a demo. Payment integration coming soon!")
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Coins className="text-purple-600" size={40} />
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            Buy Credits
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Choose the perfect plan for your creative needs. All plans include access to our latest AI models.
        </p>
      </div>

      {/* Credit Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`gradient-card rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl hover:scale-105 relative ${
              pkg.popular ? "ring-2 ring-purple-500" : ""
            }`}
          >
            {/* Badge */}
            {pkg.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 gradient-button text-white text-xs font-bold rounded-full shadow-lg inline-flex items-center gap-1">
                  {pkg.popular && <Sparkles size={12} />}
                  {pkg.badge}
                </span>
              </div>
            )}

            {/* Credits Amount */}
            <div className="text-center mb-4 mt-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-3">
                <Coins className="text-purple-600" size={32} />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-1">
                {pkg.credits}
              </h3>
              <p className="text-sm text-gray-500 font-medium">Credits</p>
            </div>

            {/* Price */}
            <div className="text-center mb-4 pb-4 border-b border-gray-200">
              <div className="text-3xl font-bold text-gray-800 mb-1">
                ${pkg.price}
              </div>
              <div className="text-xs text-gray-500">
                ${pkg.pricePerCredit.toFixed(2)} per credit
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-6">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check
                    className="text-green-500 flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Buy Button */}
            <button
              onClick={() => handleBuyCredits(pkg)}
              className={`w-full py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl ${
                pkg.popular
                  ? "gradient-button text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="gradient-card rounded-2xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 mb-3">
            <Zap className="text-blue-600" size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Instant Delivery</h3>
          <p className="text-sm text-gray-600">
            Credits are added to your account immediately after purchase
          </p>
        </div>

        <div className="gradient-card rounded-2xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 mb-3">
            <Check className="text-green-600" size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">No Expiration</h3>
          <p className="text-sm text-gray-600">
            Your credits never expire. Use them whenever you want
          </p>
        </div>

        <div className="gradient-card rounded-2xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 mb-3">
            <Sparkles className="text-purple-600" size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">All Models</h3>
          <p className="text-sm text-gray-600">
            Access to all AI models including latest releases
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 gradient-card rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">
              How do credits work?
            </h3>
            <p className="text-sm text-gray-600">
              Each image generation costs 1 credit, regardless of the number of outputs or model used.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Do credits expire?
            </h3>
            <p className="text-sm text-gray-600">
              No, your credits never expire. You can use them at any time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Can I get a refund?
            </h3>
            <p className="text-sm text-gray-600">
              Unused credits can be refunded within 30 days of purchase. Please contact support for assistance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">
              What payment methods do you accept?
            </h3>
            <p className="text-sm text-gray-600">
              We accept all major credit cards, PayPal, and cryptocurrency payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
