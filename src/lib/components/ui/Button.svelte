<script lang="ts">
	interface Props {
		variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
		size?: 'default' | 'sm' | 'lg' | 'icon';
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		variant = 'default',
		size = 'default',
		class: className,
		children,
		...rest
	}: Props = $props();

	const variants = {
		default: 'bg-primary text-primary-content hover:bg-primary/90',
		secondary: 'bg-secondary text-secondary-content hover:bg-secondary/80',
		destructive: 'bg-destructive text-destructive-content hover:bg-destructive/90',
		outline: 'border border-input bg-background hover:bg-accent hover:text-accent-content',
		ghost: 'hover:bg-accent hover:text-accent-content',
		link: 'text-primary underline-offset-4 hover:underline'
	};

	const sizes = {
		default: 'h-10 px-4 py-2',
		sm: 'h-9 rounded-md px-3',
		lg: 'h-11 rounded-md px-8',
		icon: 'h-10 w-10'
	};
</script>

<button
	class={[
		'ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
		variants[variant],
		sizes[size],
		className
	]}
	{...rest}
>
	{@render children?.()}
</button>
