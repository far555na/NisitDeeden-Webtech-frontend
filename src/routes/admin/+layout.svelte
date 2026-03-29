<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import { getStorageUrl } from '$lib/profile';

	let { children } = $props();
	let user = $derived(page.data.user);

	const navItems = [
		{ label: 'ใบสมัคร', href: '/admin/applications-list-page' },
		{ label: 'บัญชีผู้ใช้', href: '/admin/users-list-page' },
		{ label: 'รอบสมัตร', href: '/admin/round-list-page' }

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

<div class="mx-auto px-8 pb-8 pt-4 font-sans md:px-10 md:pb-10 md:pt-5">
	{@render children()}
</div>
