<script lang="ts">
	import type { NavLink } from '$lib/shared/types/ui';
	import {
		mdiAccountCogOutline,
		mdiAccountMultipleOutline,
		mdiBadgeAccountHorizontalOutline,
		mdiBookAccountOutline,
		mdiCreditCardOutline,
		mdiFormatListBulleted,
		mdiKeyOutline,
		mdiMessageText,
		mdiSwapVertical,
		mdiTagTextOutline,
		mdiViewQuiltOutline
	} from '@mdi/js';
	import type { Snippet } from 'svelte';

	let { navLink }: { navLink: (link: NavLink) => ReturnType<Snippet> } = $props();

	const nav: NavLink[] = [
		{ href: '/client/dashboard', label: 'Overview', icon: mdiViewQuiltOutline },
		{
			label: 'SMS Management',
			children: [
				{ href: '/client/messages/create', label: 'Send Message', icon: mdiMessageText },
				{ spacer: true },
				{ href: '/client/messages/campaigns', label: 'All Campaigns', icon: mdiFormatListBulleted },
				{
					href: '/client/messages/history',
					label: 'Sent Messages (Log)',
					icon: mdiFormatListBulleted
				},
				{ href: '/client/messages/scheduled', label: 'Scheduled', icon: mdiFormatListBulleted },
				{ spacer: true },
				{ href: '/client/messages/templates', label: 'Message Templates', icon: mdiMessageText }
			]
		},
		{
			label: 'Contacts',
			children: [
				{
					href: '/client/contacts/groups',
					label: 'Contact Groups',
					icon: mdiAccountMultipleOutline
				},
				{
					href: '/client/contacts/import',
					label: 'Import Contacts',
					icon: mdiAccountMultipleOutline
				}
			]
		},

		{
			label: 'Billing',
			children: [
				{ href: '/client/billing/topup', label: 'Top Up', icon: mdiSwapVertical },
				{ href: '/client/billing/history', label: 'Transactions', icon: mdiSwapVertical },
				{ href: '/client/billing/rates', label: 'My Rates', icon: mdiTagTextOutline }
			]
		},
		{ spacer: true },
		{
			label: 'Account & Settings',
			children: [
				{
					href: '/client/sender-ids',
					label: 'Sender IDs',
					icon: mdiBadgeAccountHorizontalOutline
				},
				{ href: '/client/settings/api', label: 'API Keys', icon: mdiKeyOutline },
				{ href: '/client/settings/account', label: 'Account Settings', icon: mdiAccountCogOutline }
			]
		}
	];
</script>

<nav class="h-full space-y-2 px-4">
	{#each nav as link}
		{@render navLink(link)}
	{/each}
</nav>
