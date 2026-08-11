import { fetchPosts } from "$lib/api";

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const posts = await fetchPosts(fetch);
	return { posts };
};
