<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<td class={['p-4 align-middle [&:has([role=checkbox])]:pr-0', className]} {...rest}>
	{@render children?.()}
</td>
