import Logo from "@/components/layout/Logo"
import LoginForm from "@/components/features/auth/LoginForm"

export const metadata = {
  title: "Sign in — MONCARE",
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-brand-50/50 to-surface px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo width={170} height={68} />
          <p className="mt-4 text-sm text-muted">
            Live shifts and instant cancellation alerts for care staff.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <LoginForm />
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">
          Care Management · Moncare &amp; Medygg Care
        </p>
      </div>
    </main>
  )
}
