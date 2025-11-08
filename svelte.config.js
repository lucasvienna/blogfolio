import adapterStatic from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import remarkUnwrapImages from "rehype-unwrap-images";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";

const dev = process.argv.includes("dev");

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md"],
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".svx", ".md"],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapterStatic({
			precompress: true,
			fallback: "404.html"
		}),
		paths: {
			base: dev ? "" : process.env.BASE_PATH
		},
		alias: {
			$data: "./src/data",
			$components: "./src/lib/components"
		}
	}
};

export default config;
