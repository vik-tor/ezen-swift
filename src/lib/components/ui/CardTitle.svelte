<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<h3 class={['leading-none font-semibold tracking-tight', className]} {...rest}>
	{@render children?.()}
</h3>
