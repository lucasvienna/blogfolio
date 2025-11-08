<script lang="ts">
	import { resolve } from "$app/paths";
	import Heading from "$components/Heading.svelte";
	import PostsList from "$components/PostsList.svelte";
	import config from "$lib/config";

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
	<p>
		I'm a cloud engineer with a passion for creating innovative solutions and exploring the latest
		technologies. Whether it's diving into the world of containers, automating repetitive tasks,
		leveraging the power of Rust, or building dynamic web applications with Svelte and React, I'm
		constantly seeking new avenues to expand my skills.
	</p>

	<p>
		On this site, you'll find a collection of blog posts where I share insights into my current
		projects, my programming methodologies, and intriguing pieces of software that have caught my
		attention. I believe in the power of knowledge sharing and aim to provide valuable resources for
		fellow developers, enthusiasts, and anyone curious about the tech world.
	</p>

	<p>
		Additionally, my portfolio section showcases a range of personal projects I've worked on. These
		projects reflect my dedication to innovation, problem-solving, and craftsmanship in software
		development. Feel free to explore and get a glimpse into the projects that have shaped my
		journey.
	</p>

	<p>
		If you're interested in collaborating on exciting ventures or discussing opportunities, I'm
		always open to new connections. Don't hesitate to reach out!
	</p>

	<p>Thank you for visiting, and I hope you find inspiration and insights within these pages.</p>
</section>

<section role="feed">
	<h3>Recent Posts</h3>

	<PostsList {posts} />

	{#if data.posts.length > 3}
		<div>
			<a href={resolve("/blog")}>See all posts</a>
		</div>
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
