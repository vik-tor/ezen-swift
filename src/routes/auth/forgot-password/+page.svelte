<script lang="ts">
</script>

<div class="flex flex-col gap-8">
	<div class="space-y-2">
		<div class="text-2xl font-semibold">Forgot Password</div>
		<div class="text-base-content/60">Enter your email to reset your password</div>
	</div>
	<form method="POST" class="space-y-6">
		<div class="space-y-4">
			<div class="space-y-1">
				<label for="email" class="label">Email <span class="text-error">*</span></label>
				<input id="email" name="email" type="email" required class="input w-full" />
			</div>
		</div>
		<button type="submit" class="btn w-full btn-primary">Reset Password</button>
	</form>
	<hr class="border-base-300" />
	<div class="text-center text-sm text-base-content/60">
		Don't have an account?
		<a href="/auth/register" class="text-primary hover:underline">Create an Account</a>
	</div>
</div>
