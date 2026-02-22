<script lang="ts">
	import Header from '$lib/components/app/Header.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Ezen Swift Admin</title>
	<meta name="description" content="Ezen Swift Communications Platform Admin Dashboard" />
</svelte:head>

<Header title="Admin" />
