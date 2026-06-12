import { Building2, HeartHandshake } from "lucide-react"

// Presentational header strip for the care-home portal: shows the live link
// between the care home (Medygg) and MONCARE staffing.
export default function SyncBridge({ homeName }: { homeName: string }) {
  return (
    <div className="mb-5 rounded-xl border border-line bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-brand-700">Communication Bridge</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/60">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live sync
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex flex-1 flex-col items-center gap-1 rounded-lg bg-surface px-3 py-3 text-center">
          <Building2 className="h-5 w-5 text-brand-600" />
          <span className="text-xs font-semibold text-ink">{homeName}</span>
          <span className="text-[10px] uppercase tracking-wide text-muted">
            Care home
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />
        <div className="flex flex-1 flex-col items-center gap-1 rounded-lg bg-surface px-3 py-3 text-center">
          <HeartHandshake className="h-5 w-5 text-brand-600" />
          <span className="text-xs font-semibold text-ink">MONCARE</span>
          <span className="text-[10px] uppercase tracking-wide text-muted">
            Staffing
          </span>
        </div>
      </div>
    </div>
  )
}
