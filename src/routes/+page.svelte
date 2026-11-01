<script lang="ts">
	import { resolve } from "$app/paths";

	import Heading from "#lib/components/Heading.svelte";
	import PostsList from "#lib/components/PostsList.svelte";
	import config from "#lib/config.js";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
	let posts = $derived(data.posts);
	let short_posts = $derived(posts.slice(0, 3));
</script>

<svelte:head>
	<title>{config.titlePrefix}Home</title>
	<meta
		name="description"
		content="Lucas Vienna, full-stack software architect in Karlsruhe. Backend services, web frontends, infrastructure as code and CI/CD platforms."
	/>
</svelte:head>

<Heading title="Lucas Vienna" subtitle="Software architect · Full-stack, cloud and DevOps" />

<section role="main">
	<p>
		I design and build cloud-native systems end to end: backend services, web frontends,
		infrastructure as code and CI/CD platforms, with a specialisation in large frontend codebases.
		On the side I build
		<a href="https://uppity.cloud">Uppity</a>, open-source uptime monitoring and status pages, under
		NeonRook, and maintain
		<a href="https://github.com/AvyAddons">AvyAddons</a>, World of Warcraft add-ons with over 1.5
		million downloads. Based in Karlsruhe.
	</p>
</section>

<section>
	<h3>Selected work</h3>
	<ul>
		<li>
			<a href="https://uppity.cloud">Uppity</a>: open-source uptime monitoring and status pages,
			built under NeonRook.
		</li>
		<li>
			<a href="https://github.com/AvyAddons">AvyAddons</a>: open-source World of Warcraft add-ons,
			1.5M+ downloads, maintained in my spare time since 2019.
		</li>
		<li>
			Empire: an empire-building game server in Rust, described in
			<a href={resolve("/article/[slug]", { slug: "empire-pt1" })}>the blog series</a>.
		</li>
	</ul>
</section>

<section role="feed">
	<h3>Recent Posts</h3>

	<PostsList posts={short_posts} />

	{#if posts.length > 3}
		<div><a href={resolve("blog")}>See all posts</a></div>
	{/if}
</section>

<style>
	section[role="feed"] div:last-of-type {
		text-align: center;
	}

	h3 {
		margin-bottom: 1rem;
	}
</style>
