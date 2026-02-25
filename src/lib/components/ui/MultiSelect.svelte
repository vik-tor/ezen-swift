<script lang="ts">
	import type { SelectOptions } from '$lib/shared/types';
	import { Checkbox } from '..';

	interface Props {
		name?: string;
		class?: string;
		options: SelectOptions[];
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { name, class: className, options, children, ...rest }: Props = $props();
</script>

<select
	name="contactGroupIds"
	class="bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border border-base-300 px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
	{...rest}
>
	{@render children?.()}
</select>

<ul role="list" class="overflow-auto">
	{#each options as option}
		<li class="">
			<Checkbox checked={option.selected} {name} value={option.value} />
		</li>
	{/each}
</ul>
