import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import siteStrings from "./src/site.json";
import npmPackage from "./package.json";

export default defineConfig({
	base: `/${npmPackage.name}`, //	match github repo name, starts with a slash
	plugins: [
		react(),
		createHtmlPlugin({
			inject: {
				data: {
					siteStrings,
					npmPackage,
				},
			},
		}),
	],
	build: {
		outDir: "docs", //	required for simple GitHub Pages setup
		emptyOutDir: true,
	},
	server: {
		strictPort: true,
	},
});
