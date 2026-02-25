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
				icon: mdiPlus,
				iconClass: 'btn-primary',
				label: 'Add',
				onClick: () => {
					dialogOpen = true;
				}
			},
			{
				icon: mdiUploadOutline,
				iconClass: 'btn-secondary',
				label: 'Import',
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
				name: 'Edit',
				icon: mdiPencil,
				iconClass: 'btn-ghost',
				onClick: () => {}
			},
			{
				name: 'Delete',
				icon: mdiTrashCanOutline,
				iconClass: 'btn-error btn-soft',
				onClick: () => {}
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
