<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<thead class={['border-base-300 [&_tr]:border-b', className]} {...rest}>
	{@render children?.()}
</thead>
