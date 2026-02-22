<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<tr
	class={[
		'hover:bg-muted/50 data-[state=selected]:bg-muted border-b border-base-300 transition-colors',
		className
	]}
	{...rest}
>
	{@render children?.()}
</tr>
