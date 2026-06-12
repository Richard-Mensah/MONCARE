import { redirect } from "next/navigation"
import { getUserProfile } from "@/lib/auth"
import AppHeader from "@/components/layout/AppHeader"
import BottomNav from "@/components/layout/BottomNav"
import SideNav from "@/components/layout/SideNav"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const res = await getUserProfile()
  if (!res) redirect("/login")
  const { profile } = res

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader profile={profile} />
      <div className="mx-auto flex w-full max-w-5xl flex-1">
        <SideNav role={profile.role} />
        <main className="flex-1 px-4 py-5 pb-20 md:px-6 md:pb-8">{children}</main>
      </div>
      <BottomNav role={profile.role} />
    </div>
  )
}
