<script lang="ts">
	import { mdiPencil, mdiPlus, mdiTrashCanOutline } from '@mdi/js';

	import { Page } from '$lib/components';
	import type { PageConfig } from '$lib/shared/types';

	let { data } = $props();
	let dialogOpen = $state(false);

	let config: PageConfig = {
		title: 'Message Templates',
		columns: [
			{ label: 'Name', key: 'name' },
			{ label: 'Category', key: 'category' },
			{ label: 'Content', key: 'content' },
			{ label: 'Default', key: 'default' }
		],
		dataKey: 'templates',
		headerActions: [
			{
				name: 'create',
				label: 'Add Template',
				icon: mdiPlus,
				iconClass: 'btn-primary',
				onClick: () => (dialogOpen = true),
				context: {
					title: 'Add Template',
					formAction: 'create'
				}
			}
		],
		rowActions: [
			{
				name: 'edit',
				icon: mdiPencil,
				onClick: () => (dialogOpen = true),
				context: {
					title: 'Edit Template',
					formAction: 'edit',
					loadEntity: true
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
			fields: [
				{
					name: 'name',
					label: 'Name',
					type: 'text',
					required: true
				},
				{
					name: 'content',
					label: 'Content',
					type: 'textarea',
					required: true
				},
				{
					name: 'category',
					label: 'Category',
					type: 'select',
					options: [
						{ name: 'Promotional', value: 'PROMOTIONAL' },
						{ name: 'Transactional', value: 'TRANSACTIONAL' }
					],
					required: true
				}
			],
			onCancel: () => (dialogOpen = false)
		}
	};
</script>

<Page {config} {data} bind:dialogOpen />
