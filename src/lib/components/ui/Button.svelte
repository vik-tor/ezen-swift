<script lang="ts">
	interface Props {
		size?: 'default' | 'sm' | 'lg' | 'icon';
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { size = 'default', class: className, children, ...rest }: Props = $props();

	const sizes = {
		default: 'btn-md px-4 py-2',
		sm: 'btn-sm px-3',
		lg: 'btn-lg px-8',
		icon: 'btn-xs'
	};
</script>

<button class={['btn', sizes[size], className]} {...rest}>
	{@render children?.()}
</button>
