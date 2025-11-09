<script lang="ts">
	interface Props {
		/** Heading title. */
		title: string;
		/** Heading subtitle. */
		subtitle: string;
	}

	let { title, subtitle }: Props = $props();
</script>

<!--
@component
## Hero Header

Displays a header group with a title and subtitle.
-->
<header class="hero">
	<hgroup class="container">
		<h1>{title}</h1>
		<h2>{subtitle}</h2>
	</hgroup>
</header>

<style>
	/* Header */
	.hero {
		background-position: center;
		background-size: cover;
	}

	header {
		padding: var(--spacing-hero) 0;
	}

	header hgroup > :last-child {
		color: var(--h3-color);
	}

	header hgroup {
		margin-bottom: var(--spacing-hero);
	}
</style>
