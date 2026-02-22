<script lang="ts">
	import Header from '$lib/components/app/Header.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CardContent from '$lib/components/ui/CardContent.svelte';
	import CardDescription from '$lib/components/ui/CardDescription.svelte';
	import CardHeader from '$lib/components/ui/CardHeader.svelte';
	import CardTitle from '$lib/components/ui/CardTitle.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Label from '$lib/components/ui/Label.svelte';

	let { data } = $props();

	let emailNotif = $state(true);
	let smsNotif = $state(false);
</script>

<Header title="Account Settings"></Header>

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
