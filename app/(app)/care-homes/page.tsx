import { requireRole } from "@/lib/auth"
import { listCareHomes } from "@/lib/data/directory"
import PageHeader from "@/components/layout/PageHeader"
import Card from "@/components/ui/Card"
import EmptyState from "@/components/ui/EmptyState"
import NewCareHomeForm from "@/components/features/careHomes/NewCareHomeForm"
import { Building2, MapPin, Phone } from "lucide-react"

export const metadata = { title: "Care homes — MONCARE" }

export default async function CareHomesPage() {
  await requireRole(["coordinator"])
  const homes = await listCareHomes()

  return (
    <div>
      <PageHeader
        title="Care homes"
        subtitle="Your client sites"
        action={<NewCareHomeForm />}
      />

      {homes.length === 0 ? (
        <EmptyState
          icon={<Building2 className="h-8 w-8" />}
          title="No care homes yet"
          description="Add MEDYGG Criccieth, Porthmadog, Rhyl and any other clients."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {homes.map((home) => (
            <Card key={home.id}>
              <p className="font-semibold text-gray-900">{home.name}</p>
              {(home.region || home.postcode) && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {[home.region, home.postcode].filter(Boolean).join(" · ")}
                </p>
              )}
              {home.contact_phone && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {home.contact_name ? `${home.contact_name} · ` : ""}
                  {home.contact_phone}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
