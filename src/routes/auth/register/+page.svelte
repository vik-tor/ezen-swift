<script lang="ts">
</script>

<div class="flex flex-col gap-8">
	<div class="space-y-2">
		<div class="text-2xl font-semibold">Create An Account</div>
		<div class="text-base-content/60">Enter your details to create an account</div>
	</div>
	<form method="POST" class="space-y-6">
		<div class="space-y-4">
			<div class="space-y-1">
				<label for="username" class="label">Username <span class="text-error">*</span></label>
				<input id="username" name="username" type="text" required class="input w-full" />
			</div>
			<div class="space-y-1">
				<label for="email" class="label">Email <span class="text-error">*</span></label>
				<input id="email" name="email" type="email" required class="input w-full" />
			</div>
			<div class="flex items-center gap-2">
				<div class="space-y-1">
					<label for="password" class="label"> Password <span class="text-error">*</span></label>
					<input id="password" name="password" type="password" required class="input w-full" />
				</div>
				<div class="space-y-1">
					<label for="confirm-password" class="label">
						Confirm Password <span class="text-error">*</span></label
					>
					<input
						id="confirm-password"
						name="confirm-password"
						type="password"
						required
						class="input w-full"
					/>
				</div>
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
		<a href="/auth/login" class="text-primary hover:underline">Sign In</a>
	</div>
</div>
