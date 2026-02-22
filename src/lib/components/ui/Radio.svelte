<script lang="ts">
	import Label from './Label.svelte';

	interface RadioProps {
		id?: string;
		name?: string;
		value: string;
		group?: any;
		disabled?: boolean;
		required?: boolean;
		inputClass?: string;
		labelClass?: string;
		class?: string;
		ariaLabel?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		id = '',
		name,
		value,
		group = $bindable(),
		disabled = false,
		required = false,
		inputClass = '',
		labelClass = '',
		class: className = '',
		ariaLabel,
		children,
		...rest
	}: RadioProps = $props();

	function handleChange(e: Event) {}

	const isActive = $derived(group === value);
</script>

<div class={'flex items-center gap-2 ' + className}>
	<input
		type="radio"
		{id}
		{name}
		{value}
		class={['peer radio radio-sm', isActive && 'radio-primary', inputClass]}
		bind:group
		{disabled}
		{required}
		aria-label={ariaLabel}
		onchange={handleChange}
		{...rest}
	/>

	<Label
		for={id}
		class={'cursor-pointer font-normal peer-data-[state=checked]:text-primary ' + labelClass}
	>
		{@render children?.()}
	</Label>
</div>
