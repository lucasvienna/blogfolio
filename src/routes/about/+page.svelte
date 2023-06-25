<script lang="ts">
	import Heading from '$components/Heading.svelte';
	import * as config from '$lib/config';
</script>

<svelte:head>
	<title>{config.titlePrefix} About</title>
	<meta name="description" content="A few words about me" />
</svelte:head>

<Heading title="About" subtitle="A few words about me" />

<section>
	<p>
		I am a software developer originally from São Paulo, Brazil and currently live in Karlsruhe,
		Germany. I studied Business Informatics at the Karlsruhe University of Applied Sciences (HKA),
		and work for <a href="https://dscsag.com">DSC Software AG</a> as a
		<em>"Developer | Product Manager"</em>.
	</p>

	<p>
		My areas of focus are web and mobile development, with experience in edge devices and IoT. I
		also have experience as a translator and editor with a background in AAA videogames and mobile
		applications. I'm an enthusiat for automation and continuous delivery.
	</p>

	<p>
		At the moment, my interests are <em>SvelteKit</em>, <em>Spring Boot</em>, and <em>Flutter</em>.
	</p>
</section>
