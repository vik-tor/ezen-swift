<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<div class={['p-6 pt-0', className]} {...rest}>
	{@render children?.()}
</div>
