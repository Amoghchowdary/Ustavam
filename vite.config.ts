import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/Ustavam/",
  server: {
    port: 3000,
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        failOnError: true,
      },
      pages: [
        { path: "/" },
        { path: "/about" },
        { path: "/services" },
        { path: "/venues" },
        { path: "/gallery" },
        { path: "/contact" },
        { path: "/book" },
      ],
    }),
    viteReact(),
  ],
});
