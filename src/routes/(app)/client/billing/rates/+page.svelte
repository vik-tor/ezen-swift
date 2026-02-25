<script lang="ts">
	import { mdiPencil } from '@mdi/js';

	import { Card, CardContent, Page } from '$lib/components';
	import type { PageConfig } from '$lib/shared/types';

	let { data } = $props();

	let config: PageConfig = {
		title: 'My Billing Rates',
		tableTitle: 'My Rate History',
		columns: [
			{ label: 'Safaricom', key: 'newRateSafaricom' },
			{ label: 'Airtel', key: 'newRateAirtel' },
			{ label: 'Triggering Amt', key: 'triggeringTopupAmount' },
			{ label: 'Change Type', key: 'changeType' },
			{ label: 'Change Reason', key: 'changeReason' },
			{ label: 'Changed At', key: 'changedAt' }
		],
		dataKey: 'history',
		rowActions: [
			{
				name: 'Edit',
				icon: mdiPencil,
				iconClass: 'btn-ghost',
				onClick: () => {}
			}
		]
	};
</script>

<Page {config} {data}>
	<div class="mt-2 mb-4 px-6">Current Billing Rates</div>

	<div class="flex w-full items-center gap-4">
		<Card class="flex w-full items-center gap-4 bg-base-200 p-4">
			<Card class="w-1/4 bg-base-100 pt-4">
				<CardContent class="space-y-2">
					<div class="text-sm text-gray-500">
						<img src="/logos/safaricom.png" alt="Safaricom" class="-mt-2 h-8" />
					</div>
					<div class="text-lg font-medium">{data.rates.currentRateSafaricom ?? 0}</div>
				</CardContent>
			</Card>
			<Card class="w-1/4 bg-base-100 pt-4">
				<CardContent class="space-y-2">
					<div class="text-sm text-gray-500">
						<img src="/logos/airtel.png" alt="Airtel" class="inline h-8" />
					</div>
					<div class="text-lg font-medium">{data.rates.currentRateAirtel ?? 0}</div>
				</CardContent>
			</Card>
			<Card class="w-1/4 bg-base-100 pt-4">
				<CardContent class="space-y-2">
					<div class="text-sm text-gray-500">Best Rate Unlocked At</div>
					<div class="text-lg font-medium">{data.rates.bestRateUnlockedAt ?? 0}</div>
				</CardContent>
			</Card>
			<Card class="w-1/4 bg-base-100 pt-4">
				<CardContent class="space-y-2">
					<div class="text-sm text-gray-500">Highest Top Up</div>
					<div class="text-lg font-medium">{data.rates.highestSingleTopup ?? 0}</div>
				</CardContent>
			</Card>
		</Card>
	</div>
</Page>
