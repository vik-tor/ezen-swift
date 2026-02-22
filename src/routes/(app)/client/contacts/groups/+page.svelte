<script lang="ts">
	import Header from '$lib/components/app/Header.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Label from '$lib/components/ui/Label.svelte';
	import Table from '$lib/components/ui/Table.svelte';
	import TableBody from '$lib/components/ui/TableBody.svelte';
	import TableCell from '$lib/components/ui/TableCell.svelte';
	import TableHead from '$lib/components/ui/TableHead.svelte';
	import TableHeader from '$lib/components/ui/TableHeader.svelte';
	import TableRow from '$lib/components/ui/TableRow.svelte';
	import { mdiSend } from '@mdi/js';

	let { data } = $props();
	let dialogOpen = $state(false);
</script>

<Header title="Contact Groups">
	<Button onclick={() => (dialogOpen = true)}>Create Contact Group</Button>
</Header>

<!-- <Filters /> -->

<Card class="mt-6">
	<CardContent>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each data.contactGroups as group}
					<TableRow>
						<TableCell>{group.name}</TableCell>
						<TableCell>{group.description}</TableCell>
						<TableCell><Button variant="ghost">Edit</Button></TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</CardContent>
</Card>

<Dialog bind:open={dialogOpen}>
	<CardHeader>
		<CardTitle>Create Contact Group</CardTitle>
	</CardHeader>
	<CardContent>
		<form class="space-y-6" method="POST">
			<div class="space-y-2">
				<Label for="sender_id">Name</Label>
				<Input name="name" required />
			</div>

			<div class="space-y-2">
				<Label for="description">Description</Label>
				<Input name="description" />
			</div>

			<div class="flex justify-end gap-4">
				<Button variant="destructive" type="button" onclick={() => (dialogOpen = false)}>
					<!-- <Icon path={mdiClose} class="mr-2" /> -->
					Cancel
				</Button>
				<Button type="submit">
					<Icon path={mdiSend} size={16} class="mr-2" />
					Submit Request
				</Button>
			</div>
		</form>
	</CardContent>
</Dialog>
