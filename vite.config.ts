import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

/**
 * GeoVerity 2026 Vite configuration
 * - React used ONLY as isolated islands under src/apps/*
 * - Vendor chunk split for React + ReactDOM
 * - Performance budget: ≤ 250 KB compressed per island bundle
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": resolve(__dirname, "./src") }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"]
        }
      }
    },
    chunkSizeWarningLimit: 250,
    sourcemap: true,
    minify: "terser"
  }
});
