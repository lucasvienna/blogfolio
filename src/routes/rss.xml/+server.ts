import { fetchPosts } from "#lib/api.js";
import { description, titlePrefix, url } from "#lib/config.js";

import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const posts = await fetchPosts(fetch);

	const headers = { "Content-Type": "application/xml" };

	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${titlePrefix}Blog</title>
				<description>${description}</description>
				<link>${url}</link>
				<atom:link href="${url}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
					.map(
						(post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>${url}/article/${post.slug}</link>
							<guid isPermaLink="true">${url}/article/${post.slug}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`
					)
					.join("")}
			</channel>
		</rss>
	`.trim();

	return new Response(xml, { headers });
};
