<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Ezen Swift</title>
	<meta name="description" content="Ezen Swift Communications Platform" />
</svelte:head>

<main class="h-screen w-screen">{@render children?.()}</main>
