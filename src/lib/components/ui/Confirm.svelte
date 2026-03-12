<script lang="ts">
	import { Button, CardContent, CardHeader, CardTitle, Dialog } from '..';

	interface Props {
		children?: import('svelte').Snippet;
		title?: string;
		open: boolean;
		onConfirm: (confirmed: boolean) => void;
	}

	let { children, title, open = $bindable(false), onConfirm }: Props = $props();
</script>

<Dialog bind:open class="bg-base-100">
	<CardHeader>
		<CardTitle>{title ?? 'Confirm'}</CardTitle>
	</CardHeader>
	<CardContent class="bg-base-300">
		{@render children?.()}
		<div class="flex justify-end gap-2 p-4">
			<Button class="text-sm btn-sm" onclick={() => (open = false)}>Cancel</Button>
			<Button
				class="text-sm btn-sm btn-primary"
				onclick={() => {
					open = false;
					onConfirm(true);
				}}
			>
				Confirm
			</Button>
		</div>
	</CardContent>
</Dialog>
