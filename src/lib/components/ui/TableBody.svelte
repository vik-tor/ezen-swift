<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<tbody class={['[&_tr:last-child]:border-0', className]} {...rest}>
	{@render children?.()}
</tbody>
