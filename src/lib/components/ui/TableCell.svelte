<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<td class={['px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0', className]} {...rest}>
	{@render children?.()}
</td>
