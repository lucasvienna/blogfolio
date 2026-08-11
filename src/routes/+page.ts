import { dev } from "$app/environment";
import type { Post } from "$lib/types";
import type { PageLoad } from "./$types";

// enable hmr in dev mode
export const csr = dev;

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch("api/posts");
	const posts: Post[] = await response.json();
	return { posts };
};
