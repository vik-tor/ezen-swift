<script lang="ts">
	import { resolve } from '$app/paths';

	import { FormGroup, Input, Label } from '$lib/components';
</script>

<div class="flex flex-col gap-8">
	<div class="space-y-2">
		<div class="text-2xl font-semibold">Create An Account</div>
		<div class="text-base-content/60">Enter your details to create an account</div>
	</div>
	<form method="POST" class="space-y-6">
		<div class="space-y-4">
			<FormGroup>
				<Label for="name" class="label">Name <span class="text-error">*</span></Label>
				<Input id="name" name="name" type="text" required class="input w-full" />
			</FormGroup>
			<div class="flex w-full items-center gap-2">
				<FormGroup class="w-full">
					<Label for="email" class="label">Email <span class="text-error">*</span></Label>
					<Input id="email" name="email" type="email" required class="input w-full" />
				</FormGroup>
				<FormGroup class="w-full">
					<Label for="username" class="label">Username</Label>
					<Input id="username" name="username" type="text" class="input w-full" />
				</FormGroup>
			</div>
			<FormGroup>
				<Label for="contact" class="label">Phone <span class="text-error">*</span></Label>
				<Input id="contact" name="contact" type="text" required class="input w-full" />
			</FormGroup>
			<div class="flex w-full items-center gap-2">
				<FormGroup class="w-full">
					<Label for="password" class="label">Password <span class="text-error">*</span></Label>
					<Input id="password" name="password" type="password" required class="input w-full" />
				</FormGroup>
				<FormGroup class="w-full">
					<Label for="confirm-password" class="label">
						Confirm Password <span class="text-error">*</span></Label
					>
					<Input
						id="confirm-password"
						name="confirm-password"
						type="password"
						required
						class="input w-full"
					/>
				</FormGroup>
			</div>
		</div>
		<button type="submit" class="btn w-full btn-primary">Create Account</button>
	</form>
	<!-- <div class="space-y-4">
		<div class="text-center text-base-content/80">
			An email confirmation has been sent to your registered email address. The link will expire in
			24 hours.
		</div>
	</div> -->
	<hr class="border-base-300" />
	<div class="text-center text-sm text-base-content/60">
		Already have an account?
		<a href={resolve('/auth/login')} class="text-primary hover:underline">Sign In</a>
	</div>
</div>
