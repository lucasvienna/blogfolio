<script lang="ts">
	import "@picocss/pico/css/pico.min.css";
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
	import "./styles.css";

	let { children } = $props();
</script>

<Header />

<main class="container">
	{@render children()}
</main>

<Footer />
