import adapterStatic from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";
import { mdsvex, type MdsvexOptions } from "mdsvex";
import rehypeCallouts from "rehype-callouts";
import rehypeSlug from "rehype-slug";
import remarkUnwrapImages from "rehype-unwrap-images";
import remarkToc from "remark-toc";
import { defineConfig } from "vitest/config";

const mdsvexOptions: MdsvexOptions = {
	extensions: [".md", ".mdx"],
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug, rehypeCallouts]
};

export default defineConfig({
	plugins: [
		sveltekit({
			extensions: [".svelte", ".svx", ".md"],
			preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
			adapter: adapterStatic({
				precompress: true,
				fallback: "404.html"
			}),
			alias: {
				$data: "./src/data",
				$components: "./src/lib/components"
			},
			compilerOptions: {
				runes: true,
				// ignore MDsveX deprecation warnings, just noise
				warningFilter: (warning) => warning.code !== "script_context_deprecated"
			},
			experimental: {
				explicitEnvironmentVariables: true,
				sendWarningsToBrowser: true
			}
		})
	],
	test: {
		coverage: {
			include: ["src/**/*.{ts,svelte}"]
		},
		projects: [
			{
				extends: "./vite.config.ts",
				plugins: [svelteTesting()],
				test: {
					name: "client",
					environment: "jsdom",
					clearMocks: true,
					include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
					exclude: ["src/lib/server/**"],
					setupFiles: ["./vitest-setup-client.ts"]
				}
			},
			{
				extends: "./vite.config.ts",
				test: {
					name: "server",
					environment: "node",
					include: ["src/**/*.{test,spec}.{js,ts}"],
					exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"]
				}
			}
		]
	}
});
