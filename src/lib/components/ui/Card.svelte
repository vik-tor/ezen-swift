<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<div
	class={['bg-card text-card-foreground rounded-md border border-base-300 shadow', className]}
	{...rest}
>
	{@render children?.()}
</div>
