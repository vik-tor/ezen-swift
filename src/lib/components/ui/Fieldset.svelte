<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<fieldset
	class={['fieldset flex flex-col gap-3 rounded-md border border-base-300 p-4', className]}
	{...rest}
>
	{@render children?.()}
</fieldset>
