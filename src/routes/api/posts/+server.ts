import { dev } from "$app/environment";
import type { Metadata, Post } from "$lib/types";
import { json } from "@sveltejs/kit";

function getPosts() {
	const posts: Post[] = [];

	const paths = import.meta.glob<{ metadata: Metadata }>("/src/data/posts/*.md", {
		eager: true
	});

	for (const [path, file] of Object.entries(paths)) {
		const slug = path.split("/").at(-1)?.replace(".md", "");

		if (slug) {
			const post = { ...file.metadata, slug } satisfies Post;
			if (dev || post.published) posts.push(post);
		}
	}

	return posts.toSorted(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);
}

export function GET() {
	return json(getPosts());
}
