<script lang="ts">
	import type { Post } from '$lib/types';
	import { formatDate } from '$lib/utils';

	export let posts: Post[];
</script>

<ul id="posts">
	{#each posts as post}
		<li>
			<small>{formatDate(post.date)}</small>
			<h3><a href={'/article/' + post.slug}>{post.title}</a></h3>
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
