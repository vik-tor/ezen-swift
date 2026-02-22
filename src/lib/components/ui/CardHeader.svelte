<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<div class={['flex flex-col space-y-1.5 p-3', className]} {...rest}>
	{@render children?.()}
</div>
