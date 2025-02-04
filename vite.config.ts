import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import siteStrings from "./src/site.json";
import npmPackage from "./package.json";
import { configDefaults } from "vitest/config";

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
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/test/setup.ts",
		exclude: [...configDefaults.exclude], // Ensures defaults are respected
	},
	build: {
		outDir: "docs", //	required for simple GitHub Pages setup
		emptyOutDir: true,
	},
	server: {
		strictPort: true,
	},
});
