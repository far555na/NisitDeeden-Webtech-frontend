<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import { getStorageUrl } from '$lib/profile';
	import { getUserPositionLabel } from '$lib/types/user-position';

	let { children } = $props();
	let user = $derived(page.data.user);

	const navItems = [
		{ label: 'หน้าแรก', href: '/student/homepage' },
		{ label: 'ใบสมัครที่เคยเสนอ', href: '/student/applications-history-page' }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar
	{navItems}
	userName={user?.name}
	role={getUserPositionLabel(user?.position)}
	profileURL={getStorageUrl(user?.profile_url)}
/>

<div class="mx-auto px-8 pb-8 pt-4 font-sans md:px-10 md:pb-10 md:pt-5">
	{@render children()}
</div>
