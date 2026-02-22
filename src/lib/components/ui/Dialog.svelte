<script lang="ts">
	import { mdiClose } from '@mdi/js';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';

	interface Props {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		class?: string;
		size?: 'sm' | 'md' | 'lg';
		children?: import('svelte').Snippet;
	}

	let {
		open = $bindable(false),
		onOpenChange,
		class: className,
		children,
		size = 'md'
	}: Props = $props();

	const sizeMap: Record<string, string> = {
		sm: 'max-w-md p-4',
		md: 'max-w-lg p-2',
		lg: 'max-w-2xl p-4'
	};

	let sizeClass: string = $derived(sizeMap[size] ?? sizeMap.md);

	function close() {
		open = false;
		onOpenChange?.(false);
	}
</script>

{#if open}
	<div class="fixed inset-0 z-30 bg-black/5" onclick={close} role="presentation"></div>
	<div
		class={[
			'fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 bg-base-100 shadow-lg duration-200 sm:rounded-lg md:w-full',
			sizeClass,
			className
		]}
		role="dialog"
	>
		{@render children?.()}
		<Button variant="destructive" size="icon" onclick={close} class="absolute top-4 right-4">
			<span class="sr-only">Close</span>
			<Icon path={mdiClose} size={16} />
		</Button>
	</div>
{/if}
