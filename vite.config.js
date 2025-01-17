import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import siteStrings from "./src/site.json";

export default defineConfig({
	base: "/battol-directory-namer",
	plugins: [
		react(),
		createHtmlPlugin({
			inject: {
				data: {
					...siteStrings,
				},
			},
		}),
	],
	build: {
		outDir: "docs",
		emptyOutDir: true,
	},
});
