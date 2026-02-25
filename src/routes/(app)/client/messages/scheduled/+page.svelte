<script lang="ts">
	import {
		Button,
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		Header,
		Icon,
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components';
	import { mdiPlus } from '@mdi/js';

	let { data } = $props();
</script>

<Header title="Scheduled Messages"></Header>

<!-- <Filters /> -->

<div class="">
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead>Name</TableHead>
				<TableHead>Sender ID</TableHead>
				<TableHead>Message</TableHead>
				<TableHead>Recipients</TableHead>
				<TableHead>Status</TableHead>
				<TableHead>Scheduled</TableHead>
				<TableHead>Delivered/Failed</TableHead>
				<TableHead>Cost</TableHead>
				<TableHead>Actions</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each data.campaigns as campaign}
				<TableRow>
					<TableCell>{campaign.name}</TableCell>
					<TableCell>{campaign.senderIdName}</TableCell>
					<TableCell>{campaign.message}</TableCell>
					<TableCell>{campaign.recipients}</TableCell>
					<TableCell>{campaign.status}</TableCell>
					<TableCell>{campaign.scheduledTime}</TableCell>
					<TableCell>{campaign.successfulDeliveries}/{campaign.failedDeliveries}</TableCell>
					<TableCell>{campaign.totalCost}</TableCell>
					<TableCell><Button variant="ghost">Edit</Button></TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div>
