<script lang="ts">
	import logo from '$lib/assets/logo.png';
	import profile from '$lib/assets/background.png';

	interface NavItem {
		label: string;
		href: string;
	}

	export let navItems: NavItem[] = [];
	export let userName: string = '';
	export let role: string = '';

	let showMenu = false;

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function closeMenu() {
		showMenu = false;
	}
</script>

<svelte:window on:click={closeMenu} />

<nav class="flex items-center justify-between p-5">
	<div>
		<img src={logo} alt="Logo" class="h-10" />
	</div>

	<div class="flex gap-10 font-medium">
		{#each navItems as item}
			<a href={item.href} class="transition-colors hover:text-primary">
				{item.label}
			</a>
		{/each}
	</div>

	<div class="relative">
		<button
			type="button"
			class="flex items-center gap-3 rounded-xl p-2 transition hover:bg-neutral-100"
			on:click|stopPropagation={toggleMenu}
		>
			<img class="h-10 w-10 rounded-full" src={profile} alt="Profile" />
			<div class="flex flex-col text-left">
				<p class="font-medium">{userName}</p>
				<p class="text-sm text-neutral-500">{role}</p>
			</div>
		</button>

		{#if showMenu}
			<div
				class="absolute top-full right-0 mt-2 z-50 w-40 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg"
			>
				<form method="POST" action="/logout" on:submit|stopPropagation>
					<button
						type="submit"
						on:click|stopPropagation
						class="w-full rounded-lg px-4 py-2 text-left text-red-500 transition hover:cursor-pointer hover:bg-red-50"
					>
						ออกจากระบบ
					</button>
				</form>
			</div>
		{/if}
	</div>
</nav>
