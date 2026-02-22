<script lang="ts">
	interface Props {
		class?: string;
		type?: string;
		value?: any;
		files?: FileList | null;
		[key: string]: any;
	}

	let {
		class: className,
		type = 'text',
		value = $bindable(),
		files = $bindable(),
		...rest
	}: Props = $props();
</script>

<input
	{...{ type }}
	bind:value
	class={[
		'bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border border-base-300 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
		className
	]}
	{...rest}
/>
