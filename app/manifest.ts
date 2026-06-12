import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MONCARE — Healthcare agency",
    short_name: "MONCARE",
    description:
      "Live shift allocation and instant cancellation alerts for care staff.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7fafc",
    theme_color: "#1b9fdd",
    icons: [
      {
        src: "/moncare-logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  }
}
