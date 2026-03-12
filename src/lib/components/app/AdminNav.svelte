<script lang="ts">
	import {
		mdiAccountCogOutline,
		mdiAccountDetailsOutline,
		mdiAccountGroup,
		mdiBellRingOutline,
		mdiCashClock,
		mdiCog,
		mdiEmailCheckOutline,
		mdiHistory,
		mdiLayersTripleOutline,
		mdiPercentOutline,
		mdiShieldAccountOutline,
		mdiViewDashboard,
		mdiWallet
	} from '@mdi/js';

	import type { NavLink } from '$lib/shared/types/ui';
	import type { Snippet } from 'svelte';

	let { navLink }: { navLink: (link: NavLink) => ReturnType<Snippet> } = $props();

	const nav: NavLink[] = [
		{
			href: '/admin/dashboard',
			label: 'Dashboard',
			icon: mdiViewDashboard
		},
		{
			label: 'User Management',
			icon: mdiAccountGroup,
			children: [
				{ href: '/admin/users/list', label: 'All Users', icon: mdiAccountDetailsOutline },
				{
					href: '/admin/users/roles',
					label: 'Roles',
					icon: mdiShieldAccountOutline,
					role: 'ADMIN'
				}
			]
		},
		{
			label: 'Requests',
			icon: mdiBellRingOutline,
			children: [
				{ href: '/admin/requests/sender-ids', label: 'Sender IDs', icon: mdiEmailCheckOutline },
				{ href: '/admin/requests/topups', label: 'Manual Top-ups', icon: mdiCashClock }
			]
		},
		{
			label: 'Finance & Billing',
			icon: mdiWallet,
			children: [
				{
					href: '/admin/billing/pricing',
					label: 'Pricing Tiers',
					icon: mdiLayersTripleOutline,
					role: 'ADMIN'
				},
				{ href: '/admin/billing/rates', label: 'Client Rates', icon: mdiPercentOutline },
				{ href: '/admin/billing/transactions', label: 'Transaction History', icon: mdiHistory }
			]
		},
		{ spacer: true },
		{
			label: 'Account & Settings',
			children: [
				{ href: '/admin/settings/system', label: 'System Config', icon: mdiCog, role: 'ADMIN' },
				{ href: '/admin/settings/account', label: 'Account Settings', icon: mdiAccountCogOutline }
			]
		}
	];
</script>

<nav class="h-full space-y-2 px-4">
	{#each nav as link (link.href || link.label)}
		{@render navLink(link)}
	{/each}
</nav>
