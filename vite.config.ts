import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import GithubActionsReporter from 'vitest-github-actions-reporter';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		reporters: process.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default',
		coverage: {
			include: ['src/**/*.{ts,svelte}'],
			all: true
		}
	}
});
