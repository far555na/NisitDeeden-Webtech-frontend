<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/logo.png';
	import profile from '$lib/assets/background.png';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav class="flex items-center justify-between p-5">
	<div><img src={logo} alt="Logo" class="h-10" /></div>
	<div class="flex gap-10 font-medium">
		<a href="/student/homepage" class="hover:text-primary">หน้าแรก</a>
		<a href="" class="hover:text-primary">หลักเกณฑ์</a>
	</div>
	<div class="flex items-center gap-3">
		<img class="w-10 h-10 rounded-full" src={profile} alt="Profile">
		<div class="flex flex-col">
			<p class="font-medium">ฉัตรชัย โชติสวัสดิ์</p>
			<p>นิสิต</p>
		</div>
	</div>
</nav>

<div class="font-sans mx-auto p-8 md:p-10">
	{@render children()}
</div>
