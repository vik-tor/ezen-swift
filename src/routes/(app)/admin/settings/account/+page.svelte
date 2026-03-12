<script lang="ts">
	import {
		Button,
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
		Header,
		Icon,
		Input,
		Label
	} from '$lib/components';
	import { mdiAlertCircleOutline } from '@mdi/js';

	let { data } = $props();

	let emailNotif = $state(true);
	let smsNotif = $state(false);
</script>

<Header title="Account Settings"></Header>

<!-- <Filters /> -->

{#if data.apiError}
	<div class="my-4 flex w-full items-center justify-center gap-2">
		<Icon path={mdiAlertCircleOutline} size={18} class="text-error" />
		<div class="flex w-full flex-col">
			<div class="font-semibold text-error">Error While Loading Data</div>
			<div class="">{data.apiError.status} {data.apiError.message}</div>
		</div>
	</div>
{/if}

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader>
			<CardTitle>Profile Information</CardTitle>
			<CardDescription>Update your account details.</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="space-y-2">
					<Label for="username">Username</Label>
					<Input id="username" name="username" />
				</div>
				<div class="space-y-2">
					<Label for="company">Company Name</Label>
					<Input id="company" />
				</div>
				<div class="space-y-2">
					<Label for="name">Contact Name</Label>
					<Input id="name" value="Admin User" />
				</div>
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input id="email" name="email" />
				</div>
			</div>
			<Button>Save Changes</Button>
		</CardContent>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Notification Preferences</CardTitle>
			<CardDescription>Choose how you want to be notified.</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<div class="flex items-center justify-between space-x-2">
				<Label for="email_notif" class="flex flex-col space-y-1">
					<span>Email Notifications</span>
					<span class="text-muted-foreground leading-snug font-normal">
						Receive daily summaries and alerts via email.
					</span>
				</Label>
				<input
					type="checkbox"
					id="email_notif"
					bind:checked={emailNotif}
					class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
				/>
			</div>
			<div class="flex items-center justify-between space-x-2">
				<Label for="sms_notif" class="flex flex-col space-y-1">
					<span>SMS Notifications</span>
					<span class="text-muted-foreground leading-snug font-normal">
						Receive critical alerts via SMS.
					</span>
				</Label>
				<input
					type="checkbox"
					id="sms_notif"
					bind:checked={smsNotif}
					class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
				/>
			</div>
		</CardContent>
	</Card>
</div>
