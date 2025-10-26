import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// GeoVerity 2026 Astro config
// Astro is the static-first layer. React islands mount only under src/apps/*.
// Vite config is handled separately in vite.config.ts
export default defineConfig({
  integrations: [react()]
});
