<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<legend class={['fieldset-legend text-sm font-medium', className]} {...rest}>
	{@render children?.()}
</legend>
