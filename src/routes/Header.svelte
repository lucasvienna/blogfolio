<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
</script>

<div data-theme="auto">
	<nav class="container-fluid">
		<ul>
			<li><a href="{base}/"><strong>Lucas Vienna</strong></a></li>
		</ul>
		<ul>
			<li aria-current={$page.url.pathname === `${base}/about` ? 'page' : undefined}>
				<a href="{base}/about">About</a>
			</li>
			<li aria-current={$page.url.pathname === `${base}/blog` ? 'page' : undefined}>
				<a href="{base}/blog">Blog</a>
			</li>
			<li>
				<!-- See theme-switcher.js for how this works -->
				<details class="dropdown">
					<summary>Theme</summary>
					<ul>
						<!-- svelte-ignore a11y-invalid-attribute -->
						<li><a href="#" data-theme-switcher="auto">Auto</a></li>
						<!-- svelte-ignore a11y-invalid-attribute -->
						<li><a href="#" data-theme-switcher="light">Light</a></li>
						<!-- svelte-ignore a11y-invalid-attribute -->
						<li><a href="#" data-theme-switcher="dark">Dark</a></li>
					</ul>
				</details>
			</li>
		</ul>
	</nav>
</div>

<style>
	/* Nav */
	summary:is(:hover, :active, :focus) {
		background-color: transparent;
	}

	nav li:is([aria-current]) > a {
		color: var(--secondary);
	}
</style>
