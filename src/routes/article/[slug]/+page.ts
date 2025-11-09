import type { Metadata } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { Component } from "svelte";

export async function load({ params }) {
	try {
		const post = await import(`../../../data/posts/${params.slug}.md`);

		return {
			content: post.default as Component,
			meta: post.metadata as Metadata
		};
	} catch (e) {
		error(404, new Error(`Could not find ${params.slug}`, { cause: e }));
	}
}
