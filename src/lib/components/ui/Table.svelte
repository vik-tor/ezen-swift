<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<div class="relative w-full overflow-auto">
	<table
		class={['table w-full caption-bottom border border-base-300 text-sm', className]}
		{...rest}
	>
		{@render children?.()}
	</table>
</div>
