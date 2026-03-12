<script lang="ts">
	import {
		mdiAccountKey,
		mdiAccountLockOpenOutline,
		mdiAccountLockOutline,
		mdiDownloadBoxOutline,
		mdiFilePdfBox,
		mdiPlus,
		mdiShieldAccountOutline
	} from '@mdi/js';

	import { Page } from '$lib/components';
	import type { PageConfig } from '$lib/shared/types';

	let { data } = $props();
	let dialogOpen = $state(false);

	let roleOptions = $derived(
		data.roles
			? data.roles.map((role) => {
					return {
						name: role.name,
						value: role.name
					};
				})
			: []
	);

	let config: PageConfig = {
		title: 'Users',
		headerActions: [
			{
				name: 'create',
				label: 'Add User',
				icon: mdiPlus,
				iconClass: 'btn-primary',
				onClick: () => (dialogOpen = true),
				context: {
					title: 'Add User',
					formAction: 'create'
				}
			},
			{
				label: 'Export',
				icon: mdiDownloadBoxOutline,
				iconClass: 'btn-neutral',
				children: [
					{
						name: 'pdf',
						label: 'PDF',
						icon: mdiFilePdfBox,
						serverAction: 'exportPdf'
					},
					{
						name: 'excel',
						label: 'Excel',
						icon: mdiFilePdfBox,
						serverAction: 'exportExcel'
					}
				]
			}
		],
		columns: [
			{ label: 'Name', key: 'username' },
			{ label: 'Email', key: 'email' },
			{ label: 'Roles', key: 'roles' },
			{ label: 'Balance', key: 'walletBalance' },
			{ label: 'Created At', key: 'createdAt' }
			// { label: 'Balance', key: 'walletBalance', formatter: formatters.number },
			// { label: 'Created At', key: 'createdAt', formatter: formatters.date }
		],
		dataKey: 'users',
		rowActions: [
			{
				icon: mdiShieldAccountOutline,
				onClick: () => (dialogOpen = true)
			},
			{
				icon: mdiAccountKey,
				condition: 'isLocked',
				onClick: () => (dialogOpen = true),
				children: [
					{
						label: 'Lock',
						name: 'lock',
						icon: mdiAccountLockOutline
					},
					{
						label: 'Unlock',
						name: 'unlock',
						icon: mdiAccountLockOpenOutline
					}
				]
			}
		],
		form: {
			title: 'Add User',
			action: 'default',
			fields: [
				{
					name: 'username',
					label: 'Username',
					type: 'text',
					required: true
				},
				{
					name: 'name',
					label: 'Name',
					type: 'text',
					required: true
				},
				{
					name: 'email',
					label: 'Email',
					type: 'email',
					required: true
				},
				{
					name: 'password',
					label: 'Password',
					type: 'password'
				},
				{
					name: 'role',
					label: 'Role',
					type: 'select',
					get options() {
						return roleOptions;
					},
					required: true
				}
			],
			onCancel: () => {
				dialogOpen = false;
			}
		}
	};
</script>

<Page {data} {config} {dialogOpen} />
