<script lang="ts">
	interface Props {
		name?: string;
		class?: string;
		value?: string | number;
		onSelect?: (value: string | number) => void;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		name,
		class: className,
		value = $bindable(),
		onSelect,
		children,
		...rest
	}: Props = $props();

	function handleChange(event: Event) {
		console.log('Select changed:', event);
		const target = event.target as HTMLSelectElement;
		const selectedValue = target.value;
		value = selectedValue;
		onSelect?.(selectedValue);
	}
</script>

<select
	{name}
	bind:value
	onchange={handleChange}
	class="bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border border-base-300 px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
	{...rest}
>
	{@render children?.()}
</select>
