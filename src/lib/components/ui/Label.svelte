<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<label
	class={[
		'text-sm leading-none font-medium whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className
	]}
	{...rest}
>
	{@render children?.()}
</label>
