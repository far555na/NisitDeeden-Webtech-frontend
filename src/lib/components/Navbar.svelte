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
</script>

<nav class="flex items-center justify-between p-5">
	<div>
		<img src={logo} alt="Logo" class="h-10" />
	</div>

	<div class="flex gap-10 font-medium">
		{#each navItems as item}
			<a
				href={item.href}
				class="transition-colors hover:text-primary"
			>
				{item.label}
			</a>
		{/each}
	</div>

	<div class="flex items-center gap-3">
		<img class="h-10 w-10 rounded-full" src={profile} alt="Profile" />
		<div class="flex flex-col">
			<p class="font-medium">{userName}</p>
			<p class="text-sm text-neutral-500">{role}</p>
		</div>
	</div>
</nav>