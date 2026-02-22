<script lang="ts">
	import Header from '$lib/components/app/Header.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
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
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import { mdiSend } from '@mdi/js';

	let { data } = $props();

	let showKey = $state(false);
</script>

<Header title="Api Keys"></Header>

<!-- <Filters /> -->

{#if data.apiError}
	<Card class="mt-6 border-error bg-error/50">
		<CardHeader>
			<CardTitle>Error Loading</CardTitle>
		</CardHeader>
		<CardContent>
			<p>{data.apiError.message}</p>
			<p>{data.apiError.status}</p>
		</CardContent>
	</Card>
{/if}

<Card>
	<CardHeader>
		<CardTitle>API Configuration</CardTitle>
		<CardDescription>Manage your API keys for integration.</CardDescription>
	</CardHeader>
	<CardContent class="space-y-4">
		<div class="space-y-2">
			<Label>Live API Key</Label>
			<div class="flex gap-2">
				<Input
					readonly
					value={showKey ? data.currentKey?.apiKey : '•'.repeat(24)}
					class="bg-muted font-mono"
				/>
				<Button variant="outline" onclick={() => (showKey = !showKey)}>
					{showKey ? 'Hide' : 'Show'}
				</Button>
				<Button
					variant="outline"
					onclick={() => navigator.clipboard.writeText(data.currentKey?.apiKey ?? '')}
				>
					Copy
				</Button>
			</div>
			<p class="text-muted-foreground text-xs">
				Keep this key secret. Do not share it in client-side code.
			</p>
		</div>
		<div class="space-y-2">
			<form method="POST" action="?/updateWebhook">
				<Label for="webhook">Webhook URL</Label>
				<Input id="webhook" name="webhookUrl" placeholder="https://..." />
				<p class="text-muted-foreground text-xs">
					URL to receive delivery reports and incoming messages.
				</p>
				<Button type="submit">Save</Button>
			</form>
		</div>
		<div class="pt-2">
			<Button variant="destructive">Regenerate Key</Button>
		</div>
	</CardContent>
</Card>

<Card class="mt-6">
	<CardHeader>
		<CardTitle>API Key History</CardTitle>
		<CardDescription>View your previous keys</CardDescription>
	</CardHeader>
	<CardContent>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>API Key</TableHead>
					<TableHead>Secret</TableHead>
					<TableHead>Active</TableHead>
					<TableHead>Webhook URL</TableHead>
					<TableHead>Created</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each data.apiKeys as item}
					<TableRow>
						<TableCell>{item.id}</TableCell>
						<TableCell>{item.apiKey}</TableCell>
						<TableCell>{item.secret}</TableCell>
						<TableCell>{item.active}</TableCell>
						<TableCell>{item.dlrWebhookUrl}</TableCell>
						<TableCell>{item.createdAt}</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</CardContent>
</Card>
