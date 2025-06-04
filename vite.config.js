import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import flowbitePlugin from "flowbite/plugin";

import tailwindcss from "@tailwindcss/vite";
import { flowbiteReact } from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [tailwindcss(), react(), flowbitePlugin, flowbiteReact()],
  base: "/noteApp/",
});
