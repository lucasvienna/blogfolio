<script lang="ts">
	import * as config from '$lib/config';
	import { formatDate } from '$lib/utils';

	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{config.titlePrefix}{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<header>
		<!-- Title -->
		<hgroup>
			<h1>{data.meta.title}</h1>
			<p>Published on {formatDate(data.meta.date)}</p>
		</hgroup>
		<!-- Tags -->
		<div class="tags">
			{#each data.meta.categories as category}
				<span>&num;{category}</span>
			{/each}
		</div>
	</header>

	<!-- Post -->
	<main>
		<svelte:component this={data.content} />
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
