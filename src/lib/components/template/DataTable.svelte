<script lang="ts">
	import {
		mdiAlertCircleOutline,
		mdiChevronDoubleLeft,
		mdiChevronDoubleRight,
		mdiChevronLeft,
		mdiChevronRight
	} from '@mdi/js';

	import type { Action, PageConfig } from '$lib/shared/types';
	import {
		Checkbox,
		Icon,
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '..';
	import Button from '../ui/Button.svelte';

	interface Props {
		config: PageConfig;
		data?: any;
		renderAction: (action: Action) => ReturnType<import('svelte').Snippet>;
	}

	let { config, data, renderAction }: Props = $props();
</script>

<div class="flex h-full flex-col">
	<Table class="h-full grow">
		<TableHeader>
			<TableRow>
				<TableHead class="w-12">
					<Checkbox></Checkbox>
				</TableHead>
				{#each config.columns as column (column.key)}
					<TableHead>{column.label}</TableHead>
				{/each}
				{#if config.rowActions}
					<TableHead class="w-30 min-w-20">:</TableHead>
				{/if}
			</TableRow>
		</TableHeader>
		<TableBody>
			{#if config.dataKey}
				{#each data[config.dataKey] as row (row)}
					<TableRow>
						<TableCell>
							<Checkbox></Checkbox>
						</TableCell>
						{#each config.columns as column (column)}
							<TableCell>{row[column.key]}</TableCell>
						{/each}
						{#if config.rowActions}
							<TableCell class="">
								<div class="flex items-center gap-2">
									{#each config.rowActions as action (action)}
										{@render renderAction(action)}
									{/each}
								</div>
							</TableCell>
						{/if}
					</TableRow>
				{/each}
			{/if}
		</TableBody>
	</Table>

	<div class="mt-auto flex items-center justify-between bg-base-200 px-8 py-2">
		<!-- Left -->
		<div class="flex items-center gap-2 text-sm text-error">
			{#if data.apiError}
				<Icon path={mdiAlertCircleOutline} size={18} />
				<div>Error While Loading Data: {data.apiError.message}</div>
			{/if}
		</div>

		<!-- Left -->
		<div class="flex items-center gap-1 text-sm">
			{#if data.context}
				<Button onclick={() => {}} class="btn-sm btn-neutral">
					<Icon path={mdiChevronDoubleLeft} size="16" />
				</Button>
				<Button onclick={() => {}} class="btn-sm btn-neutral">
					<Icon path={mdiChevronLeft} size="16" />
				</Button>
				<span class="mx-2">
					Page
					<span class="font-bold">{data.context.pageNumber}</span>
					/
					<span class="font-bold">{data.context.totalPages}</span>
				</span>
				<Button onclick={() => {}} class="btn-sm btn-neutral">
					<Icon path={mdiChevronRight} size="16" />
				</Button>
				<Button onclick={() => {}} class="btn-sm btn-neutral">
					<Icon path={mdiChevronDoubleRight} size="16" />
				</Button>
			{/if}
		</div>

		<!-- Left -->
		<div class="flex gap-2 text-sm">
			{#if data.context}
				Showing
				<span class="font-bold">
					<!-- (offset*page) - offset -->
					{data.context.numberOfElements} -
					<!--  -->
					{data.context.totalElements}
				</span>
				of
				<span class="font-bold">{data.context.totalElements}</span>
				items
			{/if}
		</div>
	</div>
</div>
