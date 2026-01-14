"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { supabase } from "@/lib/supabase"

export default function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
        },
      },
    })

    setLoading(false)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Account created successfully")
    router.refresh()
    router.push("/imagine")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-gray-600 mt-2">Start your creative journey</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2 text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 gradient-button text-white rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {loading ? "Creating account..." : "Register"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
          Login
        </Link>
      </p>
    </form>
  )
}
