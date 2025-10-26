import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// GeoVerity 2026 Astro config
// Astro is the static-first layer. React islands mount only under src/apps/*.
export default defineConfig({
  integrations: [react()],
  vite: "./vite.config.ts"
});
