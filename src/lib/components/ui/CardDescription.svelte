<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<p class={['text-muted-foreground text-sm', className]} {...rest}>
	{@render children?.()}
</p>
