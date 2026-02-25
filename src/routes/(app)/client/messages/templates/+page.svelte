<script lang="ts">
	import { mdiPencil, mdiPlus, mdiSend } from '@mdi/js';

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
				label: 'Add Template',
				icon: mdiPlus,
				iconClass: 'btn-primary',
				onClick: () => (dialogOpen = true)
			}
		],
		rowActions: [
			{
				name: 'Edit',
				icon: mdiPencil,
				action: 'edit'
			},
			{
				name: 'Use Template',
				icon: mdiSend,
				onClick: () => {}
			}
		],
		form: {
			title: 'Add Template',
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
			action: 'default'
		}
	};
</script>

<Page {config} {data} bind:dialogOpen />
