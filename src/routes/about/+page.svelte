<script lang="ts">
	import { resolve } from "$app/paths";

	import Heading from "#lib/components/Heading.svelte";
	import * as config from "#lib/config.js";
</script>

<svelte:head>
	<title>{config.titlePrefix} About</title>
	<meta
		name="description"
		content="Lucas Vienna, full-stack software architect in Karlsruhe. Backend services, web frontends, infrastructure as code and CI/CD platforms."
	/>
</svelte:head>

<Heading title="About" subtitle="Software architect" />

<section>
	<p>
		I design and build cloud-native systems end to end: backend services, web frontends,
		infrastructure as code and CI/CD platforms. I live in Karlsruhe, Germany, and studied Business
		Informatics at the Karlsruhe University of Applied Sciences (HKA).
	</p>

	<p>
		Architecture for large frontend codebases is a specialisation. I favour automation and
		continuous delivery because they make systems easier to scale and to keep reliable.
	</p>

	<p>
		On the side I build <a href="https://uppity.cloud">Uppity</a>, open-source uptime monitoring and
		status pages, under NeonRook. I also maintain
		<a href="https://github.com/AvyAddons">AvyAddons</a>, open-source World of Warcraft add-ons with
		1.5M+ downloads, in my spare time since 2019. Empire, a game server in Rust, is documented in
		the <a href={resolve("blog")}>blog</a>.
	</p>

	<p>I am currently exploring SvelteKit, Spring Boot, Rust and cloud infrastructure.</p>
</section>

<section>
	<h3>Contact</h3>
	<p>
		Email me at <a href="mailto:biz@lucasvienna.dev">biz@lucasvienna.dev</a>, or find me on
		<a href="https://github.com/lucasvienna" rel="me">GitHub</a> and
		<a href="https://www.linkedin.com/in/lucasvienna/" rel="me">LinkedIn</a>.
	</p>
</section>
