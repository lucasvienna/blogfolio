<script lang="ts">
	import * as config from '$lib/config';
	import PostsList from '$components/PostsList.svelte';
	import Heading from '$components/Heading.svelte';

	export let data;

	const { posts } = data;
</script>

<svelte:head>
	<title>{config.titlePrefix} Blog</title>
</svelte:head>

<Heading title="Blog" subtitle="My thoughts on code, tech, and my projects" />

<!-- Posts -->
<section>
	<PostsList {posts} />
</section>
