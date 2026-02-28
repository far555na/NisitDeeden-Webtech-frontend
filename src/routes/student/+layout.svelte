<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();

	const navItems = [
		{ label: 'หน้าแรก', href: '/student/homepage' },
		{ label: 'หลักเกณฑ์', href: '/student/criteria-page' }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar
	navItems={navItems}
	userName="ฉัตรชัย โชติสวัสดิ์"
	role="นิสิต"
/>

<div class="mx-auto p-8 font-sans md:p-10">
	{@render children()}
</div>
