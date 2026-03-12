<script lang="ts">
	import type { Action, ActionContext, PageConfig } from '$lib/shared/types';
	import {
		Button,
		CardContent,
		CardHeader,
		CardTitle,
		Confirm,
		DataTable,
		Dialog,
		Header,
		Icon
	} from '..';
	import Form from './Form.svelte';

	interface Props {
		config: PageConfig;
		data?: unknown;
		children?: import('svelte').Snippet;
		dialogOpen?: boolean;
	}

	let { config, data, children, dialogOpen = $bindable(false) }: Props = $props();

	let confirmDialogOpen = $state(false);
	let confirmMessage = $state('');
	let pendingAction: Action | null = $state(null);

	function openConfirmDialog(action: Action) {
		pendingAction = action;
		confirmMessage = action.confirmationMessage ?? 'Are you sure?';
		confirmDialogOpen = true;
	}

	function handleConfirmation(confirmed: boolean) {
		if (confirmed && pendingAction) {
			performAction(pendingAction);
		}
		pendingAction = null;
		confirmDialogOpen = false;
	}

	let dialogContext: ActionContext = $state({
		title: '',
		formAction: '',
		loadEntity: false
	});

	function openFormDialog(context: ActionContext) {
		dialogContext = context;
		dialogOpen = true;
	}

	function handleActionClick(action: Action) {
		if (action.confirmed) {
			openConfirmDialog(action);
		} else {
			performAction(action);
		}
	}

	function performAction(action: Action) {
		/*
		 * An action can either be a server action, or a local one
		 * In both cases, it can be confirmed or not
		 * If it has context, that has to be changed as it's performed
		 * If it is batch, all selected items are passed to the runner
		 */

		// Create/Edit actions, with context, open the dialog
		if ((action.name == 'create' || action.name == 'edit') && action.context) {
			openFormDialog(action.context);
		}

		// Server action (with context)
		if (action.serverAction) {
			console.log('Handling server action', action.serverAction);
		}

		// Local action
		if (action.onClick) {
			action.onClick();
		}
	}
</script>

<div class="flex h-full flex-1 flex-col">
	<Header title={config.title}>
		{#if config.headerActions}
			{#each config.headerActions as action (action.name)}
				{@render renderAction(action)}
			{/each}
		{/if}
	</Header>

	<div class="flex h-full flex-col gap-2">
		<div class="">
			{@render children?.()}
		</div>
		<div class="h-full grow overflow-hidden rounded-lg border border-base-300">
			{#if config.columns}
				{#if config.tableTitle}
					<div class="mt-2 mb-4 px-6">{config.tableTitle}</div>
				{/if}
				<DataTable {config} {data} {renderAction} />
			{/if}
		</div>
	</div>
</div>

{#if config.form}
	{@const context = {
		title: dialogContext.title ?? config.form.title,
		formAction: dialogContext.formAction ?? config.form.action
	}}
	<Dialog bind:open={dialogOpen} class="bg-base-100">
		<CardHeader>
			<CardTitle>{context.title}</CardTitle>
		</CardHeader>
		<CardContent>
			<Form form={config.form} action={context.formAction} />
		</CardContent>
	</Dialog>
{/if}

<Confirm bind:open={confirmDialogOpen} onConfirm={(confirmed) => handleConfirmation(confirmed)}>
	<div class="p-4">{confirmMessage}</div>
</Confirm>

{#snippet renderAction(action: Action)}
	{#if action.href}
		<a class={`btn text-sm btn-sm ${action.iconClass}`} href={action.href}>
			{#if action.icon}
				<Icon path={action.icon} size={16} />
			{/if}
			{#if action.label}
				{action.label}
			{/if}
		</a>
	{:else}
		<Button class={`text-sm btn-sm ${action.iconClass}`} onclick={() => handleActionClick(action)}>
			{#if action.icon}
				<Icon path={action.icon} size={16} />
			{/if}
			{#if action.label}
				{action.label}
			{/if}
		</Button>
	{/if}
{/snippet}
