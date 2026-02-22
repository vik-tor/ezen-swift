<script lang="ts">
	let { children } = $props();
</script>

<main class="flex h-full flex-col">
	<div class="flex grow flex-col items-center rounded-t-xl sm:justify-center" id="container">
		<div class="flex w-full flex-col items-center gap-8 sm:max-w-4xl">
			<div
				class="flex h-full w-full flex-col overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-xl sm:max-w-xl"
			>
				<div class="h-full w-full p-8">
					{@render children?.()}
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	#container {
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(80px);
		-webkit-backdrop-filter: blur(80px);
		background-image: radial-gradient(
			circle at top right,
			rgba(70, 130, 180, 0.5),
			transparent 70%
		);
		background-repeat: no-repeat;
	}
</style>
