<script lang="ts">
	import { Icon, Alert, Input, Label, FormGroup } from '$lib/components';
	import { mdiAlertCircleOutline } from '@mdi/js';

	let { data, form } = $props();
</script>

<div class="flex flex-col gap-6">
	<div class="space-y-2">
		<div class="text-2xl font-semibold">Sign In</div>
		<div class="text-base-content/60">Enter sign in details to access your account</div>
	</div>

	{#if form?.failed}
		<div class="alert alert-soft alert-error">
			<Icon path={mdiAlertCircleOutline} size={18} />
			<span>{form.error}</span>
		</div>
	{/if}

	{#if data.expired}
		<Alert class="alert-soft alert-warning">
			<Icon path={mdiAlertCircleOutline} size={18} />
			<span>Your session has expired. Please log in again.</span>
		</Alert>
	{/if}

	<form method="POST" class="space-y-6">
		<div class="space-y-4">
			<FormGroup class="space-y-1">
				<Label for="username" class="label">Username/Email <span class="text-error">*</span></Label>
				<Input id="username" name="username" type="text" value={form?.username ?? ''} required />
			</FormGroup>
			<FormGroup class="space-y-1">
				<Label for="password" class="label flex w-full items-center justify-between">
					<span>Password <span class="text-error">*</span></span>
					<a href="/auth/forgot-password" class="text-sm text-primary hover:underline">
						Forgot password?
					</a>
				</Label>
				<Input id="password" name="password" type="password" required />
			</FormGroup>
		</div>
		<button type="submit" class="btn w-full btn-primary">Sign In</button>
	</form>
	<hr class="border-base-300" />
	<div class="text-center text-sm text-base-content/60">
		Don't have an account?
		<a href="/auth/register" class="text-primary hover:underline">Create an Account</a>
	</div>
</div>
