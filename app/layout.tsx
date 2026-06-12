import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "MONCARE — Healthcare agency",
  description:
    "MONCARE shift platform: live shift allocation and instant cancellation alerts for care staff.",
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#1b9fdd",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--background)]">
        {children}
      </body>
    </html>
  )
}
