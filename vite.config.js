import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import flowbitePlugin from "flowbite/plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react(), flowbitePlugin],
  base: "/noteApp/",
});
