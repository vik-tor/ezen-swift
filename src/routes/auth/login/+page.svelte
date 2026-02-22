<script lang="ts">
	let data = $props();
</script>

<div class="flex flex-col gap-8">
	<div class="space-y-2">
		<div class="text-2xl font-semibold">Sign In</div>
		<div class="text-base-content/60">Enter sign in details to access your account</div>
	</div>
	{#if data.expired}
		<div class="alert alert-warning">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4v2m0 6a9 9 0 110-18 9 9 0 010 18z"
				/></svg
			>
			<span>Your session has expired. Please log in again.</span>
		</div>
	{/if}
	<form method="POST" class="space-y-6">
		<div class="space-y-4">
			<div class="space-y-1">
				<label for="username" class="label">Username/Email <span class="text-error">*</span></label>
				<input id="username" name="username" type="text" required class="input w-full" />
			</div>
			<div class="space-y-1">
				<label for="password" class="label flex w-full items-center justify-between">
					<span>Password <span class="text-error">*</span></span>
					<a href="/auth/forgot-password" class="text-sm text-primary hover:underline"
						>Forgot password?</a
					>
				</label>
				<input id="password" name="password" type="password" required class="input w-full" />
			</div>
		</div>
		<button type="submit" class="btn w-full btn-primary">Sign In</button>
	</form>
	<hr class="border-base-300" />
	<div class="text-center text-sm text-base-content/60">
		Don't have an account?
		<a href="/auth/register" class="text-primary hover:underline">Create an Account</a>
	</div>
</div>
