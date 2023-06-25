import type { Metadata } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../../data/posts/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata as Metadata
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
