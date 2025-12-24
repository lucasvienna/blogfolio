<script lang="ts">
	import * as config from "$lib/config";
	import { formatDate } from "$lib/utils";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
	const { meta, content: Content } = $derived(data);
</script>

<!-- SEO -->
<svelte:head>
	<title>{config.titlePrefix}{meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={meta.title} />
</svelte:head>

<article>
	<header>
		<!-- Title -->
		<hgroup>
			<h1>{meta.title}</h1>
			<p>Published on {formatDate(meta.date)}</p>
		</hgroup>
		<!-- Tags -->
		<div class="tags">
			{#each meta.categories as category (category)}
				<span>&num;{category}</span>
			{/each}
		</div>
	</header>

	<!-- Post -->
	<main>
		<Content />
	</main>
</article>

<style>
	article {
		margin-inline: auto;
	}

	h1 {
		text-transform: capitalize;
	}

	.tags {
		display: flex;
		gap: 1em;
	}

	.tags > * {
		padding: 0.4em 0.6em;
	}
</style>
