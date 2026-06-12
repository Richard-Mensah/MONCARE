import { redirect } from "next/navigation"
import { getUserProfile } from "@/lib/auth"
import { ROLE_HOME } from "@/constants"

// Entry point — send each user to their role's home, or to login.
export default async function Home() {
  const res = await getUserProfile()
  if (!res) redirect("/login")
  redirect(ROLE_HOME[res.profile.role])
}
