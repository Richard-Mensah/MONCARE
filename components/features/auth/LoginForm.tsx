"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { CheckCircle2 } from "lucide-react"

type Mode = "password" | "magic"

export default function LoginForm() {
  const [mode, setMode] = useState<Mode>("password")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "busy" | "sent" | "error">("idle")
  const [error, setError] = useState("")

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setStatus("busy")
    setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setStatus("error")
    } else {
      // Full reload so the server picks up the new session cookie.
      window.location.assign("/")
    }
  }

  async function handleMagic(e: React.FormEvent) {
    e.preventDefault()
    setStatus("busy")
    setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    })
    if (error) {
      setError(error.message)
      setStatus("error")
    } else {
      setStatus("sent")
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
        <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-600" />
        <p className="font-medium text-emerald-900">Check your email</p>
        <p className="mt-1 text-sm text-emerald-700">
          We sent a secure sign-in link to <strong>{email}</strong>.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={mode === "password" ? handlePassword : handleMagic}
      className="flex flex-col gap-4"
    >
      <Input
        id="email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {mode === "password" && (
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Your password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

      {status === "error" && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" loading={status === "busy"} className="w-full">
        {mode === "password" ? "Sign in" : "Send sign-in link"}
      </Button>

      <button
        type="button"
        onClick={() => {
          setMode((m) => (m === "password" ? "magic" : "password"))
          setStatus("idle")
          setError("")
        }}
        className="text-center text-xs text-brand-600 hover:underline"
      >
        {mode === "password"
          ? "Prefer a one-tap email link instead?"
          : "Sign in with a password instead"}
      </button>
    </form>
  )
}
