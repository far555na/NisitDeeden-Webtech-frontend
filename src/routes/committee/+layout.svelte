<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import { getStorageUrl } from '$lib/profile';

	let { children } = $props();
	let user = $derived(page.data.user);

	const navItems = [
		{ label: 'หน้าแรก', href: '/committee/applications-list-page' }
		// { label: 'หลักเกณฑ์', href: '/student/criteria-page' }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar
	{navItems}
	userName={user?.name}
	role={user?.role}
	profileURL={getStorageUrl(user?.profile_url)}
/>

<div class="mx-auto p-8 font-sans md:p-10">
	{@render children()}
</div>
