import { NextResponse } from "next/server"
import { getUserProfile } from "@/lib/auth"
import { getApprovedTimesheets } from "@/lib/data/timesheets"

function csvCell(value: string | number | null): string {
  const s = value == null ? "" : String(value)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

// GET /api/payroll/export — CSV of approved timesheets (coordinator only).
export async function GET() {
  const res = await getUserProfile()
  if (!res || res.profile.role !== "coordinator") {
    return NextResponse.json({ error: "Not authorised" }, { status: 403 })
  }

  const rows = await getApprovedTimesheets()
  const header = [
    "Worker",
    "Care home",
    "Date",
    "Start",
    "End",
    "Hours",
    "Pay rate (£/hr)",
    "Total pay (£)",
  ]

  const lines = rows.map((t) => {
    const rate = t.shift?.pay_rate ?? null
    const hours = t.hours ?? 0
    const total = rate != null ? (Number(rate) * hours).toFixed(2) : ""
    return [
      t.worker?.full_name ?? "",
      t.shift?.care_home?.name ?? "",
      t.shift?.shift_date ?? "",
      t.shift?.start_time?.slice(0, 5) ?? "",
      t.shift?.end_time?.slice(0, 5) ?? "",
      hours,
      rate ?? "",
      total,
    ]
      .map(csvCell)
      .join(",")
  })

  const csv = [header.join(","), ...lines].join("\n")
  const date = new Date().toISOString().slice(0, 10)

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="moncare-payroll-${date}.csv"`,
    },
  })
}
