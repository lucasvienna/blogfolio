<script lang="ts">
	import { resolve } from "$app/paths";

	import type { Post } from "#lib/types.js";
	import { formatDate } from "#lib/utils.js";

	interface Props {
		posts: Post[];
	}

	let { posts }: Props = $props();
</script>

<ul id="posts">
	{#each posts as post (post.slug)}
		<li>
			<small>{formatDate(post.date)}</small>
			<h3><a href={resolve("/article/[slug]", { slug: post.slug })}>{post.title}</a></h3>
			<p>{post.description}</p>
		</li>
	{/each}
</ul>

<style>
	ul {
		padding-left: 0;
	}
	ul li {
		list-style: none;
	}

	small {
		color: var(--secondary);
	}

	h3 {
		margin-bottom: 0;
	}
</style>
