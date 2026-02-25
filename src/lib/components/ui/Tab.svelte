<script lang="ts">
	interface Props {
		id?: string;
		name?: string;
		title: string;
		checked?: boolean;
		class?: string;
		[key: string]: any;
	}

	let { id, name, title, checked, class: className, ...rest }: Props = $props();
</script>

<a role="tab" {id} class={['tab', checked && 'tab-active', className]} {...rest}>{title}</a>

<!-- <input type="radio" {id} {name} {checked} class={['tab', className]} aria-label={title} {...rest} />
 -->
