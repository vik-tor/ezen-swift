<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { mdiHelpCircle, mdiLogout } from '@mdi/js';

	import AdminNav from '$lib/components/app/AdminNav.svelte';
	import ClientNav from '$lib/components/app/ClientNav.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { type NavLink } from '$lib/shared/types/ui';

	let { children, data } = $props();

	const isAdmin = page.url.pathname.startsWith('/admin');
	const isClient = page.url.pathname.startsWith('/client');

	let sidebarOpen = $state(false);

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}
</script>

<div class="flex h-screen bg-base-100">
	<!-- Sidebar -->
	<aside
		class="fixed inset-y-0 left-0 z-40 h-full w-64 transform bg-base-300 transition-transform duration-300 md:static md:translate-x-0"
		class:translate-x-0={sidebarOpen}
		class:-translate-x-full={!sidebarOpen}
	>
		<!-- Header + Links -->
		<div class="flex h-full flex-col">
			<div class="w-full p-6 px-8">
				<h1 class="font-sans text-2xl text-primary">Ezen Swift</h1>
				<p class="text-light text-xs text-base-content/60 uppercase">
					{isAdmin ? 'Admin' : 'Client'}
				</p>
			</div>

			{#if isAdmin}
				<AdminNav {navLink} />
			{:else if isClient}
				<ClientNav {navLink} />
			{/if}

			<div class="mt-auto mb-4 px-4">
				<!-- {@render linkBlock(
					'/profile',
					data.user!.username,
					mdiAccount,
					page.url.pathname === '/profile'
				)} -->
				<form method="POST" action="/logout">
					<button
						class="block w-full rounded-lg px-4 py-2 text-left text-sm transition hover:cursor-pointer hover:bg-base-300"
						type="submit"
					>
						<div class="flex items-center">
							<Icon path={mdiLogout} size={20} class="mr-2" />
							Logout
						</div>
					</button>
				</form>
			</div>
		</div>
	</aside>

	<!-- Overlay for mobile -->
	{#if sidebarOpen}
		<div
			class="fixed inset-0 z-30 bg-black/50 md:hidden"
			onclick={closeSidebar}
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Escape' && closeSidebar()}
		></div>
	{/if}

	<!-- Main Content -->
	<div class="relative flex flex-1 flex-col md:ml-0">
		<!-- Mobile Header -->
		<header class="border-b border-base-300 bg-base-100 shadow-sm md:hidden">
			<div class="flex items-center justify-between p-4">
				<button
					onclick={toggleSidebar}
					class="btn btn-circle btn-ghost"
					aria-label="Toggle sidebar"
				>
					<Icon path={mdiHelpCircle} size={28} />
				</button>
				<h2 class="text-lg font-semibold">Ezen SMS</h2>
				<div class="w-10"></div>
			</div>
		</header>

		<!-- Page Content -->
		<main class="h-full flex-1 overflow-y-auto p-4">
			<div class="flex h-full flex-1 flex-col gap-2.5 rounded-lg p-4">
				{@render children()}
			</div>
		</main>
	</div>
</div>

{#snippet navLink(link: NavLink)}
	{#if link.spacer}
		<div class="my-4 border-b border-gray-600/20"></div>
	{:else if link.children && link.children.length > 0}
		<div class="mt-4">
			{#if link.label}
				<span class="px-2 text-xs font-semibold text-base-content/70 uppercase">
					{link.label}
				</span>
			{/if}
		</div>

		<div class="space-y-1">
			{#each link.children as child (child.href)}
				{@const isActive = page.url.pathname === child.href}
				{@const disabled = child.role && data.user && !data.user.roles.includes(child.role)}
				<!-- <span>Disabled: {disabled}; Role: {child.role};</span> -->
				{#if !disabled}
					{@render linkBlock(child.href, child.label, child.icon, isActive)}
				{/if}
			{/each}
		</div>
	{:else}
		{@const isActive = page.url.pathname === link.href}
		{@render linkBlock(link.href, link.label, link.icon, isActive)}
	{/if}
{/snippet}

{#snippet linkBlock(href?: string, label?: string, icon?: string, isActive?: boolean)}
	{#if href}
		<a
			href={resolve(href as unknown)}
			class="block rounded-lg px-4 py-1.5 text-sm transition hover:bg-base-300 hover:text-primary
			 {isActive && 'bg-primary text-primary-content hover:bg-primary hover:text-primary-content'}"
		>
			<div class="flex items-center">
				<Icon path={icon!} size={16} class="mr-2" />
				{label}
			</div>
		</a>
	{/if}
{/snippet}
