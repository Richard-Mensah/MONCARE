import Logo from "@/components/layout/Logo"
import LoginForm from "@/components/features/auth/LoginForm"

export const metadata = {
  title: "Sign in — MONCARE",
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo width={170} height={68} />
          <p className="mt-4 text-sm text-gray-500">
            Live shifts and instant cancellation alerts for care staff.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
