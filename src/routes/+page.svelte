<script lang="ts">
	import config from '$lib/config';
	import Heading from '$components/Heading.svelte';
	import PostsList from '$components/PostsList.svelte';

	export let data;
	let { posts } = data;

	$: posts = posts.slice(0, 3);
</script>

<svelte:head>
	<title>{config.titlePrefix}Home</title>
	<meta name="description" content="Lucas' landing page" />
</svelte:head>

<Heading title="Lucas Vienna" subtitle="Software Engineer | Product Manager" />

<section role="main">
	My resumé, portfolio, and development blog. This is where I talk about code, tech, my projects,
	and anything related to my professional life. You'll see posts about tools, languages, frameworks,
	apps, websites and more. Mostly I'll talk about my current project, the tooling I'm using and
	how/why I'm doing things this way or that.
</section>

<section role="feed">
	<PostsList {posts} />

	<div>
		<a href="/blog">See all posts</a>
	</div>
</section>

<style>
	section[role='feed'] div:last-of-type {
		text-align: center;
	}
</style>
