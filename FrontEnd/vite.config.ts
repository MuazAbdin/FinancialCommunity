import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/CommunityBank/",
    plugins: [react()],
    define: {
      "process.env.GOOGLE_CLIENT_ID": JSON.stringify(env.GOOGLE_CLIENT_ID),
    },
  };
});
