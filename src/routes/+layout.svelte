<script lang="ts">
	import '@picocss/pico';
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<Header />

<main class="container">
	<slot />
</main>

<Footer />
