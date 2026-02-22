<script lang="ts">
</script>

<div class="flex flex-col gap-8">
	<div class="space-y-2">
		<div class="text-2xl font-semibold">Reset Password</div>
		<div class="text-base-content/60">Enter your details to reset your password</div>
	</div>
	<form method="POST" class="space-y-6">
		<div class="space-y-4">
			<div class="space-y-1">
				<label for="password" class="label">
					Current Password <span class="text-error">*</span></label
				>
				<input id="password" name="password" type="password" required class="input w-full" />
			</div>
			<div class="space-y-1">
				<label for="password" class="label"> New Password <span class="text-error">*</span></label>
				<input id="password" name="password" type="password" required class="input w-full" />
			</div>
			<div class="space-y-1">
				<label for="confirm-password" class="label">
					Confirm Password <span class="text-error">*</span>
				</label>
				<input
					id="confirm-password"
					name="confirm-password"
					type="password"
					required
					class="input w-full"
				/>
			</div>
		</div>
		<button type="submit" class="btn w-full btn-primary">Reset Password</button>
	</form>
	<!-- <div class="space-y-4">
		<div class="text-center text-base-content/80">
			An email confirmation has been sent to your registered email address. The link will expire in
			24 hours.
		</div>
	</div> -->
</div>
