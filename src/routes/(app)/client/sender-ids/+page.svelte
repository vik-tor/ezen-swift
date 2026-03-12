<script lang="ts">
	import { mdiPlus } from '@mdi/js';

	import { Page } from '$lib/components';
	import type { PageConfig } from '$lib/shared/types';

	let { data } = $props();
	let dialogOpen = $state(false);

	let config: PageConfig = {
		title: 'Sender IDs',
		columns: [
			{ label: 'Name', key: 'name' },
			{ label: 'Category', key: 'category' },
			{ label: 'Description', key: 'description' },
			{ label: 'Status', key: 'status' }
		],
		dataKey: 'senderIds',
		headerActions: [
			{
				name: 'create',
				label: 'Request New Sender ID',
				icon: mdiPlus,
				iconClass: 'btn-primary',
				onClick: () => (dialogOpen = true)
			}
		],
		form: {
			title: 'Request New Sender ID',
			fields: [
				{
					name: 'name',
					label: 'Proposed Name',
					type: 'text',
					required: true
				},
				{
					name: 'description',
					label: 'Description',
					type: 'text'
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
				},
				{
					name: 'sampleMessage',
					label: 'Sample Message',
					type: 'textarea'
				}
			],
			action: 'default'
		}
	};
</script>

<Page {config} {data} bind:dialogOpen />
