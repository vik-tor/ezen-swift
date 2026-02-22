<script lang="ts">
	import Header from '$lib/components/app/Header.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import Table from '$lib/components/ui/Table.svelte';
	import TableBody from '$lib/components/ui/TableBody.svelte';
	import TableCell from '$lib/components/ui/TableCell.svelte';
	import TableHead from '$lib/components/ui/TableHead.svelte';
	import TableHeader from '$lib/components/ui/TableHeader.svelte';
	import TableRow from '$lib/components/ui/TableRow.svelte';

	let { data } = $props();
</script>

<Header title="My Billing Rates"></Header>

{#if data.apiError}
	<Card class="mt-6 border-error bg-error/50">
		<CardHeader>
			<CardTitle>Error Loading Billing History</CardTitle>
		</CardHeader>
		<CardContent>
			<p>{data.apiError.message}</p>
		</CardContent>
	</Card>
{/if}

<!-- <Filters /> -->

<Card class="mt-6">
	<CardContent>
		<CardTitle>Current Rates</CardTitle>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Safaricom</TableHead>
					<TableHead>Airtel</TableHead>
					<TableHead>Highest Single TopUp</TableHead>
					<TableHead>Overrides Enabled</TableHead>
					<TableHead>Manually Overridden</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each data.rates as rate}
					<TableRow>
						<TableCell>{rate.country}</TableCell>
						<TableCell>{rate.operator}</TableCell>
						<TableCell>{rate.rate}</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</CardContent>
	<CardContent>
		<CardTitle>Rate History</CardTitle>
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
	</CardContent>
</Card>
