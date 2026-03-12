<script lang="ts">
	import {
		mdiCancel,
		mdiContentCopy,
		mdiContentSave,
		mdiEyeOffOutline,
		mdiEyeOutline,
		mdiPencil,
		mdiRefresh
	} from '@mdi/js';

	import { Button, Card, CardContent, Input, Label, Page } from '$lib/components';
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { PageConfig } from '$lib/shared/types';

	let { data } = $props();

	let showKey = $state(false);
	let isEditing = $state(false);

	let config: PageConfig = {
		title: 'API Keys',
		tableTitle: 'API Key History',
		columns: [
			{ label: 'API Key', key: 'apiKey' },
			{ label: 'Secret', key: 'secret' },
			{ label: 'Active', key: 'active' },
			{ label: 'Webhook URL', key: 'dlrWebhookUrl' },
			{ label: 'Created', key: 'createdAt' }
		],
		dataKey: 'apiKeys',
		rowActions: [
			{
				name: 'Reveal',
				icon: mdiEyeOutline,
				iconClass: 'btn-ghost',
				onClick: () => {}
			}
		]
	};
</script>

<Page {data} {config}>
	<div class="mt-2 mb-4 px-6">Current API Key Configuration</div>
	<Card class="bg-base-200 pt-4">
		<CardContent class="space-y-4">
			<div class="space-y-2">
				<Label>Current API Key</Label>
				<div class="flex items-center gap-2">
					<Input
						readonly
						value={showKey ? data.currentKey?.apiKey : '•'.repeat(24)}
						class="bg-muted font-mono"
					/>
					<Button class="btn-ghost btn-sm" onclick={() => (showKey = !showKey)}>
						<Icon path={showKey ? mdiEyeOffOutline : mdiEyeOutline} size={16} />
					</Button>
					<Button
						class="btn-ghost btn-sm"
						onclick={() => navigator.clipboard.writeText(data.currentKey?.apiKey ?? '')}
					>
						<Icon path={mdiContentCopy} size={16} />
					</Button>
					|
					<Button class="text-sm btn-sm btn-warning">
						<Icon path={mdiRefresh} size={16} />
						Regenerate Key
					</Button>
				</div>
				<p class="text-xs text-base-content/60">
					Keep this key secret. Do not share it in client-side code.
				</p>
			</div>
			<div class="space-y-2">
				<form method="POST" action="?/updateWebhook" class="space-y-2">
					<Label for="webhook">Webhook URL</Label>
					<div class="flex items-center gap-2">
						<Input
							id="webhook"
							name="webhookUrl"
							value={data.currentKey?.dlrWebhookUrl ?? ''}
							placeholder="https://..."
							disabled={!isEditing}
						/>

						{#if isEditing}
							<Button type="submit" class="text-sm btn-sm btn-secondary">
								<Icon path={mdiContentSave} size={16} class="mr-2" />
								Update
							</Button>
						{/if}

						<Button
							type="button"
							class="text-sm btn-ghost btn-sm"
							onclick={() => (isEditing = !isEditing)}
						>
							<Icon path={isEditing ? mdiCancel : mdiPencil} size={16} class="mr-2" />
							{isEditing ? 'Cancel' : 'Edit'}
						</Button>
					</div>
					<p class="text-xs text-base-content/60">URL to receive delivery reports.</p>
				</form>
			</div>
			<div class="pt-2"></div>
		</CardContent>
	</Card>
</Page>
