<script lang="ts">
	import { mdiPencil, mdiPlus, mdiTrashCanOutline, mdiUploadOutline } from '@mdi/js';

	import { Page } from '$lib/components';
	import type { PageConfig } from '$lib/shared/types';

	let { data } = $props();

	let dialogOpen = $state(false);

	let config: PageConfig = {
		title: 'Contacts',
		headerActions: [
			{
				name: 'create',
				label: 'Add Contact',
				icon: mdiPlus,
				iconClass: 'btn-primary',
				onClick: () => (dialogOpen = true),
				context: {
					title: 'Add Contact',
					formAction: 'create'
				}
			},
			{
				name: 'import',
				label: 'Import',
				icon: mdiUploadOutline,
				iconClass: 'btn-secondary',
				href: '/client/contacts/import'
			}
		],
		columns: [
			{ label: 'Name', key: 'name' },
			{ label: 'Phone Number', key: 'phone' },
			{ label: 'Groups', key: 'groups' }
		],
		dataKey: 'contacts',
		rowActions: [
			{
				name: 'edit',
				label: 'Edit Contact',
				icon: mdiPencil,
				iconClass: 'btn-ghost',
				onClick: () => (dialogOpen = true),
				context: {
					title: 'Edit Contact',
					formAction: 'edit'
				}
			},
			{
				name: 'delete',
				label: 'Delete',
				icon: mdiTrashCanOutline,
				iconClass: 'btn-error btn-soft',
				serverAction: 'delete'
			}
		],
		form: {
			title: 'Add Contact',
			action: 'default',
			fields: [
				{
					name: 'name',
					label: 'Name',
					type: 'text',
					required: true
				},
				{
					name: 'phone',
					label: 'Phone Number',
					type: 'text',
					required: true
				}
			],
			onCancel: () => {
				dialogOpen = false;
			}
		}
	};
</script>

<Page {config} {data} {dialogOpen} />
