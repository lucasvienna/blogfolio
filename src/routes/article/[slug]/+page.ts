import type { Metadata } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { Component } from "svelte";

import type { PageLoad } from "./$types";

const posts = import.meta.glob<{ default: Component; metadata: Metadata }>("/src/data/posts/*.md");

export const load: PageLoad = async ({ params }) => {
	const post = posts[`/src/data/posts/${params.slug}.md`];
	if (!post) error(404, `Could not find ${params.slug}`);

	const { default: content, metadata: meta } = await post();
	return { content, meta };
};
