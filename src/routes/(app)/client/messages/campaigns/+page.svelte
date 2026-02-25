<script lang="ts">
	import { mdiEye, mdiPlus, mdiTrashCanOutline } from '@mdi/js';

	import { Page } from '$lib/components';
	import type { PageConfig } from '$lib/shared/types';

	let { data } = $props();

	let config: PageConfig = {
		title: 'SMS Campaigns',
		headerActions: [
			{
				icon: mdiPlus,
				iconClass: 'btn-primary',
				label: 'New Campaign',
				href: '/client/messages/create'
			}
		],
		columns: [
			{ label: 'Name', key: 'name' },
			{ label: 'Sender ID', key: 'senderIdName' },
			{ label: 'Message', key: 'message' },
			{ label: 'Recipients', key: 'recipients' },
			{ label: 'Status', key: 'status' },
			{ label: 'Scheduled', key: 'scheduledTime' },
			{ label: 'Delivered/Failed', key: 'successfulDeliveries' },
			{ label: 'Cost', key: 'totalCost' }
		],
		dataKey: 'campaigns',
		rowActions: [
			{
				name: 'View',
				icon: mdiEye,
				iconClass: 'btn-ghost',
				onClick: () => {}
			},
			{
				name: 'Delete',
				icon: mdiTrashCanOutline,
				iconClass: 'btn-error btn-soft',
				onClick: () => {}
			}
		]
	};
</script>

<Page {data} {config} />
