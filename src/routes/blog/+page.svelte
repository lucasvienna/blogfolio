<script lang="ts">
	import Heading from "#lib/components/Heading.svelte";
	import PostsList from "#lib/components/PostsList.svelte";
	import * as config from "#lib/config.js";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{config.titlePrefix} Blog</title>
</svelte:head>

<Heading title="Blog" subtitle="My thoughts on code, tech, and my projects" />

<!-- Posts -->
<section>
	<PostsList posts={data.posts} />
</section>
