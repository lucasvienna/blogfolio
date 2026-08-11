import { dev } from "$app/environment";
import { fetchPosts } from "$lib/api";

import type { PageLoad } from "./$types";

// enable hmr in dev mode
export const csr = dev;

export const load: PageLoad = async ({ fetch }) => {
	const posts = await fetchPosts(fetch);
	return { posts };
};
