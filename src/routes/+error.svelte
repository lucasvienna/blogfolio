<script>
	import { page } from "$app/stores";
</script>

<section class="grid error">
	<h1>{$page.status}: {$page.error?.message}</h1>
</section>

<style>
	.error {
		height: 100%;
		place-content: center;
	}
</style>
