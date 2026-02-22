<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...rest }: Props = $props();
</script>

<select
	name="contactGroupIds"
	class="bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border border-base-300 px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
	{...rest}
>
	{@render children?.()}
</select>
