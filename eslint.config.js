import svelte from "eslint-plugin-svelte";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";
import { includeIgnoreFile, defineConfig } from "eslint/config";
import svelteConfig from "./svelte.config.js";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

// Everything outside Svelte templates is linted by oxlint (see .oxlintrc.json).
// ESLint is kept solely for eslint-plugin-svelte, whose rules need the Svelte
// template AST that oxlint cannot produce.
export default defineConfig(includeIgnoreFile(gitignorePath), ...svelte.configs.recommended, {
	name: "svelte:personal",
	files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
	languageOptions: {
		parserOptions: {
			projectService: true,
			extraFileExtensions: [".svelte"],
			parser: ts.parser,
			svelteConfig
		}
	}
});
