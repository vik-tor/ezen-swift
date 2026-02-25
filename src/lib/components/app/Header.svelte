<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<header
	class="sticky top-0 z-30 flex items-center gap-2 rounded-lg border-b border-base-300 bg-base-100/10 p-6 py-2.5 backdrop-blur-lg"
>
	<div class="flex-1">
		<h1 class="text-xl">{title}</h1>
	</div>
	<div class="flex items-center gap-2">
		{@render children?.()}
	</div>
</header>
