<script lang="ts">
	interface Props {
		orientation?: 'vertical' | 'horizontal';
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		size = 'default',
		orientation = 'horizontal',
		class: className,
		children,
		...rest
	}: Props = $props();

	const orientations = {
		vertical: 'alert-vertical',
		horizontal: 'alert-horizontal'
	};
</script>

<div role="alert" class={[`alert`, orientations[orientation], className]} {...rest}>
	{@render children?.()}
</div>
