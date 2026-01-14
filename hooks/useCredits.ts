"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./useAuth"

export function useCredits() {
  const { user } = useAuth()
  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchCredits = async () => {
    if (!user) {
      setCredits(0)
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single()

    if (!error && data) {
      setCredits(data.credits)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCredits()
  }, [user])

  const deductCredits = async (amount: number) => {
    if (!user) return false

    const newCredits = credits - amount
    if (newCredits < 0) return false

    const { error } = await supabase
      .from("profiles")
      .update({ credits: newCredits })
      .eq("id", user.id)

    if (!error) {
      setCredits(newCredits)
      return true
    }
    return false
  }

  return { credits, loading, refetch: fetchCredits, deductCredits }
}
