import Link from "next/link"
import Logo from "@/components/layout/Logo"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <Logo width={150} height={60} />
      <p className="text-lg font-semibold text-gray-800">Page not found</p>
      <p className="max-w-xs text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
      >
        Back to home
      </Link>
    </main>
  )
}
