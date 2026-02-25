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
		'border-b border-base-300 transition-colors hover:bg-base-200/50 data-[state=selected]:bg-base-200',
		className
	]}
	{...rest}
>
	{@render children?.()}
</tr>
