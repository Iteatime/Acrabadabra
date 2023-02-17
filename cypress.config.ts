import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    chromeWebSecurity: false,
  },
  env: {
    authUrl: "https://www.acrabadabra.com",
  },
});
