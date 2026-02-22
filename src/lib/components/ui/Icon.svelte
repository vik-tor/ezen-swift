<script lang="ts">
	interface Props {
		path: string;
		size?: string | number;
		color?: string;
		class?: string;
		viewBox?: string;
	}

	let {
		path,
		size = 20,
		color = 'currentColor',
		class: className = '',
		viewBox = '0 0 24 24'
	}: Props = $props();
</script>

<svg
	class={className}
	width={size}
	height={size}
	{viewBox}
	fill={color}
	xmlns="http://www.w3.org/2000/svg"
>
	<path d={path} />
</svg>
