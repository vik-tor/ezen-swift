<script lang="ts">
	import { Checkbox, FormGroup, Input, Label, Radio, Select, Textarea } from '$lib/components';
	import type { Field } from '$lib/shared/types';

	interface Props {
		field: Field;
	}

	let { field }: Props = $props();
</script>

{#if !field.hidden}
	<FormGroup>
		<Label for={field.name}>{field.label}</Label>

		{#if field.type == 'text' || field.type == 'email' || field.type == 'password'}
			<Input
				id={field.name}
				name={field.name}
				type={field.type}
				placeholder={field.placeholder}
				required={field.required}
			/>
		{:else if field.type == 'number'}
			<Input
				id={field.name}
				name={field.name}
				type="number"
				min={field.min}
				max={field.max}
				placeholder={field.placeholder}
				required={field.required}
			/>
		{:else if field.type == 'date' || field.type == 'time'}
			<Input
				id={field.name}
				name={field.name}
				type="date"
				min={field.min}
				max={field.max}
				placeholder={field.placeholder}
				required={field.required}
			/>
		{:else if field.type == 'select'}
			<Select name={field.name}>
				{#each field.options as option}
					<option value={option.value}>{option.name}</option>
				{/each}
			</Select>
		{:else if field.type == 'textarea'}
			<Textarea
				name={field.name}
				rows={field.rows}
				max={field.maxLength}
				required={field.required}
			/>
		{:else if field.type == 'checkbox'}
			<Checkbox></Checkbox>
		{:else if field.type == 'radio'}
			{#each field.options as option}
				<Radio name={field.name} value={option.value as string} bind:group={field.name}>
					{option.name}
				</Radio>
			{/each}
		{:else if field.type == 'file'}
			<Input
				id={field.name}
				name={field.name}
				type="file"
				multiple={field.multiple}
				required={field.required}
			/>
		{/if}
	</FormGroup>
{/if}
