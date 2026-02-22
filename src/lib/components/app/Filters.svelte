<script lang="ts">
	import type { Snippet } from 'svelte';
	import Input from '../ui/Input.svelte';

	let { children, onSearch }: { children?: Snippet; onSearch?: (query: string) => void } = $props();
</script>

<div class="sticky top-14 z-30 mb-8 flex h-10 items-center gap-4 bg-base-200 px-6 lg:h-10">
	{#if onSearch}
		<Input
			placeholder="Search..."
			class="max-w-xs"
			on:input={(e) => onSearch?.(e.currentTarget.value)}
		/>
	{/if}

	<div class="flex items-center gap-4">
		{@render children?.()}
	</div>
</div>
