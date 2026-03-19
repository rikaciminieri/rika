import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { letterboxdPlugin } from "./scripts/vite-letterboxd-plugin.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), letterboxdPlugin()],
});
