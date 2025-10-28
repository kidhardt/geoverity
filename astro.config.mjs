import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// GeoVerity 2026 Astro config
// Astro is the static-first layer. React islands mount only under src/apps/*.
// Vite config is handled separately in vite.config.ts
export default defineConfig({
  integrations: [react()],

  build: {
    // Inline only critical CSS, external files preferred for caching
    inlineStylesheets: 'never',

    // Optimize CSS extraction for HTTP/2
    assetsPrefix: undefined,

    // Split CSS by page for better caching (disable global bundle)
    // Each page gets its own CSS file for optimal cache hits
    format: 'directory'
  },

  vite: {
    build: {
      // CSS code splitting per page
      cssCodeSplit: true,

      // Optimize chunk size for HTTP/2
      rollupOptions: {
        output: {
          // Manual chunks for shared dependencies
          manualChunks: undefined
        }
      }
    }
  }
});
