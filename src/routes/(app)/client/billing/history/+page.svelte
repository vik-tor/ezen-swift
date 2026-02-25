<script lang="ts">
	import { mdiAlertCircleOutline } from '@mdi/js';

	import {
		Alert,
		Button,
		Header,
		Icon,
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
		Page
	} from '$lib/components';
	import type { PageConfig } from '$lib/shared/types';

	let { data } = $props();
	let dialogOpen = $state(false);

	let config: PageConfig = {
		title: 'Billing History',
		columns: [
			{ label: 'Type', key: 'type' },
			{ label: 'Description', key: 'description' },
			{ label: 'Amount', key: 'amount' },
			{ label: 'Reference', key: 'reference' }
		],
		dataKey: 'transactions'
	};
</script>

<Page {config} {data} />

<!-- <Header title="Billing History"></Header> -->

<!-- <Filters /> -->

<!-- {#if data.apiError}
	<Alert class="alert-soft alert-error">
		<Icon path={mdiAlertCircleOutline} size={18} class="text-error" />
		<span class="text-error">
			{data.apiError.message ??
				'An error occurred while fetching billing rates. Please try again later.'}
		</span>
		<Button variant="ghost" on:click={() => window.location.reload()}>Reload</Button>
	</Alert>
{/if}

<div class="">
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead>Type</TableHead>
				<TableHead>Description</TableHead>
				<TableHead>Amount</TableHead>
				<TableHead>Reference</TableHead>
				<TableHead>Actions</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each data.transactions as item}
				<TableRow>
					<TableCell>{item.type}</TableCell>
					<TableCell>{item.description}</TableCell>
					<TableCell>{item.amount}</TableCell>
					<TableCell>{item.reference}</TableCell>
					<TableCell><Button variant="ghost">Edit</Button></TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div> -->
