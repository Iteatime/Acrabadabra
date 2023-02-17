import { defineConfig } from "cypress";
import * as clipboardy from "clipboardy";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    setupNodeEvents(on) {
      on("task", {
        getClipboard() {
          return clipboardy.readSync();
        },
      });
    },
  },
  env: {
    authUrl: "https://www.acrabadabra.com",
  },
  chromeWebSecurity: false,
});
