<script lang="ts">
	import type { PageConfig } from '$lib/shared/types';
	import { mdiAlertCircleOutline } from '@mdi/js';
	import {
		Button,
		CardContent,
		CardHeader,
		CardTitle,
		Checkbox,
		Dialog,
		Header,
		Icon,
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '..';
	import Form from './Form.svelte';

	interface Props {
		config: PageConfig;
		data?: any;
		children?: import('svelte').Snippet;
		dialogOpen?: boolean;
	}

	let { config, data, children, dialogOpen = $bindable(false) }: Props = $props();
</script>

<Header title={config.title}>
	{#if config.headerActions}
		{#each config.headerActions as action}
			{#if action.href}
				<a class={`btn btn-sm ${action.iconClass}`} href={action.href}>
					{#if action.icon}
						<Icon path={action.icon} size={16} />
					{/if}
					{action.label}
				</a>
			{:else}
				<Button class={`btn-sm ${action.iconClass}`} onclick={() => action.onClick?.()}>
					{#if action.icon}
						<Icon path={action.icon} size={16} />
					{/if}
					{action.label}
				</Button>
			{/if}
		{/each}
	{/if}
</Header>

<div class="flex flex-col gap-2">
	<div class="">
		{@render children?.()}
	</div>
	<div class="">
		{#if config.columns}
			{#if config.tableTitle}
				<div class="mt-2 mb-4 px-6">{config.tableTitle}</div>
			{/if}
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead class="w-12">
							<Checkbox></Checkbox>
						</TableHead>
						{#each config.columns as column}
							<TableHead>{column.label}</TableHead>
						{/each}
						{#if config.rowActions}
							<TableHead class="w-20"></TableHead>
						{/if}
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#if data.apiError}
						<TableRow>
							<TableCell class="col-span-8" colspan={6}>
								<div class="my-4 flex items-center justify-center gap-2">
									<Icon path={mdiAlertCircleOutline} size={18} class="text-error" />
									<div class="flex flex-col">
										<div class="font-semibold text-error">Error While Loading Data</div>
										<div class="">{data.apiError.status} {data.apiError.message}</div>
									</div>
								</div>
							</TableCell>
						</TableRow>
					{:else if config.dataKey}
						{#each data[config.dataKey] as row}
							<TableRow>
								<TableCell>
									<Checkbox></Checkbox>
								</TableCell>
								{#each config.columns as column}
									<TableCell>{row[column.key]}</TableCell>
								{/each}
								<TableCell class="">
									{#if config.rowActions}
										<div class="flex items-center gap-2">
											{#each config.rowActions as action}
												<Button
													class={`px-1 text-sm btn-xs ${action.iconClass}`}
													onclick={() => action.onClick?.()}
												>
													{#if action.icon}
														<Icon path={action.icon} size={12} />
													{/if}
													{#if action.showName}
														{action.name}
													{/if}
												</Button>
											{/each}
										</div>
									{/if}
								</TableCell>
							</TableRow>
						{/each}
					{/if}
				</TableBody>
			</Table>
		{/if}
	</div>
</div>

{#if config.form}
	{@const form = config.form}
	<Dialog bind:open={dialogOpen} class="bg-base-100">
		<CardHeader>
			<CardTitle>{form.title}</CardTitle>
		</CardHeader>
		<CardContent>
			<Form {form} />
		</CardContent>
	</Dialog>
{/if}
