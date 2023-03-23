import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/openmrs": {
        target: "https://dev3.openmrs.org",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  // test: {
  //   globals:true,
  //   environment: 'jsdom',
  //   setupFiles: './tests/setup.ts',
  // },
});
