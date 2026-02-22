<script lang="ts">
	interface Props {
		class?: string;
		value?: string;
		[key: string]: any;
	}

	let { class: className, value = $bindable(), ...rest }: Props = $props();
</script>

<textarea
	bind:value
	class={[
		'ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-20 w-full rounded-md border border-base-300 px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
		className
	]}
	{...rest}
>
</textarea>
