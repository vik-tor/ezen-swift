<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<th
	class={[
		'h-12 px-4 text-left align-middle font-semibold text-black [&:has([role=checkbox])]:pr-0',
		className
	]}
	{...rest}
>
	{@render children?.()}
</th>
