<script>
	import { page } from '$app/stores';
</script>

<div data-theme="auto">
	<nav class="container-fluid">
		<ul>
			<li><a href="/"><strong>Lucas Vienna</strong></a></li>
		</ul>
		<ul>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname === '/blog' ? 'page' : undefined}>
				<a href="/blog">Blog</a>
			</li>
			<li>
				<!-- See theme-switcher.js for how this works -->
				<details role="list" dir="rtl">
					<summary aria-haspopup="listbox" role="link">Theme</summary>
					<ul role="listbox">
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
	summary[role='link']:is([aria-current], :hover, :active, :focus) {
		background-color: transparent;
	}

	nav li:is([aria-current]) > a {
		color: var(--secondary);
	}
</style>
