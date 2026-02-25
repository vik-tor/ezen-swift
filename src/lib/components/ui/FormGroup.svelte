<script lang="ts">
	interface Props {
		variant?: 'vertical' | 'horizontal';
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { variant = 'vertical', class: className, children, ...rest }: Props = $props();

	const variants = {
		vertical: 'flex flex-col gap-2',
		horizontal: 'flex flex-row gap-2 items-center'
	};
</script>

<div class={['child:', variants[variant], className]} {...rest}>
	{@render children?.()}
</div>
