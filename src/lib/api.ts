import type { Post } from "$lib/types";

/**
 * Fetch the post index from our own `/api/posts` endpoint.
 *
 * The relative specifier is deliberate: it resolves against the current page so
 * the request keeps working under a non-empty `paths.base`.
 *
 * @param fetch The `fetch` provided to a load function or request handler
 */
export async function fetchPosts(fetch: typeof globalThis.fetch): Promise<Post[]> {
	const response = await fetch("api/posts");
	// `Response.json()` is necessarily `any`. The endpoint is ours and serialises
	// exactly `Post[]`, so this is the one place worth asserting it.
	// oxlint-disable-next-line typescript/no-unsafe-type-assertion
	return (await response.json()) as Post[];
}
