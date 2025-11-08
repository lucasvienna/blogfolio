<script lang="ts">
	import "@picocss/pico";
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
	import "./styles.css";
</script>

<Header />

<main class="container">
	<slot />
</main>

<Footer />
