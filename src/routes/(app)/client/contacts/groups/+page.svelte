<script lang="ts">
	import { mdiPencil, mdiPlus, mdiTrashCanOutline } from '@mdi/js';

	import { Page } from '$lib/components';
	import type { PageConfig } from '$lib/shared/types';

	let { data } = $props();
	let dialogOpen = $state(false);

	let config: PageConfig = {
		title: 'Contact Groups',
		headerActions: [
			{
				name: 'create',
				label: 'Add Contact Group',
				icon: mdiPlus,
				iconClass: 'btn-primary',
				onClick: () => (dialogOpen = true),
				context: {
					title: 'Add Contact Group',
					formAction: 'create'
				}
			}
		],
		columns: [
			{ label: 'Name', key: 'name' },
			{ label: 'Description', key: 'description' }
		],
		dataKey: 'contactGroups',
		rowActions: [
			{
				name: 'edit',
				icon: mdiPencil,
				iconClass: 'btn-ghost',
				onClick: () => (dialogOpen = true),
				context: {
					title: 'Edit Contact Group',
					formAction: 'update'
				}
			},
			{
				name: 'delete',
				icon: mdiTrashCanOutline,
				iconClass: 'btn-error btn-soft',
				serverAction: 'delete'
			}
		],
		form: {
			title: 'Add Contact Group',
			action: 'default',
			fields: [
				{
					name: 'name',
					label: 'Name',
					type: 'text',
					required: true
				},
				{
					name: 'description',
					label: 'Description',
					type: 'textarea'
				}
			],
			onCancel: () => {
				dialogOpen = false;
			}
		}
	};
</script>

<Page {data} {config} {dialogOpen} />
