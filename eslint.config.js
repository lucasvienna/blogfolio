import js from "@eslint/js";
import oxlint from "eslint-plugin-oxlint";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";
import { includeIgnoreFile, defineConfig } from "eslint/config";
import svelteConfig from "./svelte.config.js";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	{
		name: "globals",
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: { "no-undef": "off" }
	},
	{
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
	},
	...oxlint.configs["flat/recommended"]
);
