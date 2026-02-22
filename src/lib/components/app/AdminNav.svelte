<script lang="ts">
	import {
		mdiAccountDetailsOutline,
		mdiAccountGroup,
		mdiAccountKey,
		mdiBellRingOutline,
		mdiCashClock,
		mdiCashMultiple,
		mdiCog,
		mdiEmailCheckOutline,
		mdiFileDocumentEdit,
		mdiFileDocumentMultipleOutline,
		mdiHistory,
		mdiLayersTripleOutline,
		mdiPercentOutline,
		mdiShieldAccountOutline,
		mdiViewDashboard,
		mdiWallet,
		mdiWalletPlus
	} from '@mdi/js';

	import { Roles } from '$lib/shared/types/roles';
	import type { NavLink } from '$lib/shared/types/ui';
	import type { Snippet } from 'svelte';

	let { navLink }: { navLink: (link: NavLink) => ReturnType<Snippet> } = $props();

	const nav: NavLink[] = [
		{ label: 'Main Menu', separator: true },
		{
			href: '/admin/dashboard',
			label: 'Dashboard',
			icon: mdiViewDashboard,
			roles: ['ADMIN', 'USER']
		},
		{
			label: 'User Management',
			icon: mdiAccountGroup,
			roles: ['ADMIN', 'USER'],
			children: [
				{ href: '/admin/users', label: 'All Users', icon: mdiAccountDetailsOutline },
				{
					href: '/admin/roles',
					label: 'Role Permissions',
					icon: mdiShieldAccountOutline,
					roles: ['ADMIN']
				}
			]
		},
		{
			label: 'Requests',
			icon: mdiBellRingOutline,
			roles: ['ADMIN', 'USER'],
			children: [
				{ href: '/admin/sender-ids/pending', label: 'Sender IDs', icon: mdiEmailCheckOutline },
				{ href: '/admin/topups/pending', label: 'Manual Top-ups', icon: mdiCashClock }
			]
		},
		{ spacer: true },
		{ label: 'System & Billing', separator: true },
		{
			label: 'Finance',
			icon: mdiWallet,
			roles: ['ADMIN'],
			children: [
				{ href: '/admin/pricing-bands', label: 'Pricing Tiers', icon: mdiLayersTripleOutline },
				{ href: '/admin/rates', label: 'Client Rates', icon: mdiPercentOutline },
				{ href: '/admin/transactions', label: 'Global History', icon: mdiHistory }
			]
		},
		{
			href: '/admin/templates',
			label: 'Global Templates',
			icon: mdiFileDocumentMultipleOutline,
			roles: ['ADMIN', 'USER']
		},
		{ href: '/admin/settings', label: 'System Config', icon: mdiCog, roles: ['ADMIN'] }
	];

	const links: NavLink[] = [
		{
			href: '/admin',
			label: 'Dashboard',
			icon: mdiViewDashboard,
			roles: [Roles.USER, Roles.ADMIN]
		},
		{ separator: true },
		{
			href: '/admin/users',
			label: 'Users',
			icon: mdiAccountGroup,
			roles: [Roles.USER, Roles.ADMIN]
		},
		{ href: '/admin/roles', label: 'Roles', icon: mdiAccountKey, roles: [Roles.ADMIN] },
		{ separator: true },
		{ href: '/admin/pricing', label: 'Pricing Bands', icon: mdiCashMultiple, roles: [Roles.ADMIN] },
		{
			href: '/admin/reviews',
			label: 'SenderID Reviews',
			icon: mdiFileDocumentEdit,
			roles: [Roles.ADMIN]
		},
		{ href: '/admin/wallets', label: 'Wallets', icon: mdiWallet, roles: [Roles.ADMIN] },
		{
			href: '/admin/wallet-topups',
			label: 'Wallet Topups',
			icon: mdiWalletPlus,
			roles: [Roles.ADMIN]
		},
		{ spacer: true },
		{ href: '/admin/settings', label: 'Settings', icon: mdiCog, roles: [Roles.ADMIN] }
	];
</script>

<nav class="h-full space-y-2 px-4">
	{#each nav as link}
		{@render navLink(link)}
	{/each}
</nav>
