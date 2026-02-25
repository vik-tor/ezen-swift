<script lang="ts">
	import Label from './Label.svelte';

	interface CheckboxProps {
		id?: string;
		name?: string;
		checked?: boolean;
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
		checked = $bindable(false),
		group = $bindable(),
		disabled = false,
		required = false,
		inputClass = '',
		labelClass = '',
		class: className = '',
		ariaLabel,
		children,
		...rest
	}: CheckboxProps = $props();

	function handleChange(e: Event) {}
</script>

<div class={'flex items-center gap-2 ' + className}>
	<input
		type="checkbox"
		{id}
		{name}
		bind:checked
		class={['peer checkbox checkbox-xs', checked && 'checkbox-primary', inputClass]}
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
