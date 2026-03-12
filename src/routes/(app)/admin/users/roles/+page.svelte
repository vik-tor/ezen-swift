<script lang="ts">
	import { mdiTrashCanOutline } from '@mdi/js';

	import { Page } from '$lib/components';
	import type { PageConfig } from '$lib/shared/types';

	let { data } = $props();
	let dialogOpen = $state(false);

	let config: PageConfig = {
		title: 'Roles Management',
		columns: [
			{ label: 'ID', key: 'id' },
			{ label: 'Name', key: 'name' }
		],
		dataKey: 'roles',
		rowActions: [
			{
				name: 'delete',
				icon: mdiTrashCanOutline,
				iconClass: 'btn-error btn-soft',
				confirmed: true,
				confirmationMessage: 'Are you sure you want to delete this role?',
				serverAction: 'delete'
			}
		]
	};
</script>

<Page {data} {config} {dialogOpen} />
