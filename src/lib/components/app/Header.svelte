<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<header class="bg-background sticky top-0 z-30 flex items-center gap-4 px-6">
	<div class="flex-1">
		<h1 class="text-foreground text-xl">{title}</h1>
	</div>
	<div class="flex items-center gap-4">
		{@render children?.()}
	</div>
</header>
