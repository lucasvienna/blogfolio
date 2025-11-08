import { dev } from "$app/environment";
import type { Post } from "$lib/types";

// enable hmr in dev mode
export const csr = dev;

export async function load({ fetch }) {
	const response = await fetch("api/posts");
	const posts: Post[] = await response.json();
	return { posts };
}
