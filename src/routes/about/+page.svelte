<script lang="ts">
	import Heading from "$components/Heading.svelte";
	import * as config from "$lib/config";
</script>

<svelte:head>
	<title>{config.titlePrefix} About</title>
	<meta name="description" content="A few words about me" />
</svelte:head>

<Heading title="About" subtitle="A few words about me" />

<section>
	<p>
		I'm a cloud engineer originally from São Paulo, Brazil, now residing in Karlsruhe, Germany. With
		a strong educational background in Business Informatics from the Karlsruhe University of Applied
		Sciences (HKA), I currently work at <a href="https://dscsag.com">DSC Software AG</a> as a
		<em>Senior Software Engineer</em>, where I combine my technical expertise with my passion for
		building exceptional software solutions.
	</p>

	<p>
		My areas of focus lie primarily in web development and cloud platforms, with a special interest
		in Infrastructure-as-Code (IaC) and automation. Alongside my development skills, I also possess
		valuable experience as a translator and editor, gained through my involvement with AAA video
		games and mobile applications as a volunteer before and during university.
	</p>

	<p>
		Automation and continuous delivery are two of my key passions. I firmly believe in streamlining
		processes and harnessing the power of automation to achieve efficiency and superior results.
		This mindset permeates my work, enabling me to deliver high-quality solutions with a focus on
		scalability and reliability.
	</p>

	<p>
		Currently, my areas of exploration revolve around SvelteKit, Spring Boot, Rust, and AWS. I am
		continually delving into these technologies, leveraging their capabilities to create interesting
		web and mobile applications.
	</p>
</section>
