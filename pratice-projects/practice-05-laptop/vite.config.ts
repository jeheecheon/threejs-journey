import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import glsl from "vite-plugin-glsl";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/threejs-journey/practice-05-laptop/",
  root: "./", // Sources files (typically where index.html is)
  publicDir: "./public/", // Path from "root" to static assets (files that are served as they are)
  build: {
    outDir: "./dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },
  plugins: [react(), glsl()],
});
