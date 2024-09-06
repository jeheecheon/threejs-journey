import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/threejs-journey/practice-06-marble-race/",
  plugins: [react()],
});
