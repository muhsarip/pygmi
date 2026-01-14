"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { supabase } from "@/lib/supabase"

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    setLoading(false)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Logged in successfully")
    router.refresh()
    router.push("/imagine")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-gray-600 mt-2">Sign in to continue creating</p>
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

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 gradient-button text-white rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {loading ? "Signing in..." : "Login"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-purple-600 hover:text-purple-700 font-semibold">
          Register
        </Link>
      </p>
    </form>
  )
}
