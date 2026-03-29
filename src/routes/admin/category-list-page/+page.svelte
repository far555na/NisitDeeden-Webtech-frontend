<script>
	import Button from '$lib/components/Button.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';

	import Card from '$lib/components/Card.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	const { data } = $props();

	function gotoCreate() {
		goto(`/admin/category-form-page`);
	}
</script>

<div class="flex flex-col items-center justify-center pb-10">
	<h1 class="text-3xl font-bold text-neutral-900">จัดการประเภทรางวัล</h1>
	<p class="mt-1 text-sm text-neutral-500 pb-5">เพิ่ม ลบ หรือแก้ไขประเภทรางวัล</p>
	<Button variant="filled" class="px-10" onclick={gotoCreate} buttonClass="bg-primary text-white">
		<Icon slot="left" icon="mdi:plus" class="text-white" width="24" />
		เพิ่มรอบสมัคร
	</Button>
</div>



<div class="flex flex-wrap items-center justify-center gap-10">
	{#if data.categories && data.categories.length > 0}
		{#each data.categories as category}
			{#if category.is_active}
				<Card href={`/student/category-form-page?category=${category.id}`}>
					<Icon slot="icon" icon={category.icon} class="text-primary" width="100" />
					{category.name}
				</Card>
			{:else}
				<!-- ไม่แสดง -->
			{/if}
		{/each}
	{:else}
		<p class="text-lg text-neutral-500">ขณะนี้ยังไม่มีประเภทให้เลือก</p>
	{/if}
</div>
