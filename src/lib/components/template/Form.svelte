<script lang="ts">
	import { mdiCancel, mdiClose, mdiContentSaveOutline } from '@mdi/js';

	import type { Form } from '$lib/shared/types';
	import { Button, Icon } from '..';

	import Field from './Field.svelte';

	interface Props {
		form: Form;
	}

	let { form }: Props = $props();
</script>

<form method="POST" action={form.action} class="flex flex-col gap-2.5">
	{#each form.fields as field}
		<Field {field} />
	{/each}

	<div class="mt-4 flex justify-end gap-4">
		<Button class="text-sm btn-sm" type="button" onclick={() => form.onCancel?.()}>
			<Icon path={mdiCancel} size={16} class="mr-2" />
			Cancel
		</Button>
		<Button type="submit" class="text-sm btn-sm btn-primary">
			<Icon path={mdiContentSaveOutline} size={16} class="mr-2" />
			Submit
		</Button>
	</div>
</form>
