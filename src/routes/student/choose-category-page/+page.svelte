<script>
	import Button from '$lib/components/Button.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';

	import Card from '$lib/components/Card.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	const { data } = $props();

	function back() {
		goto(`/student/homepage`);
	}
</script>

<div class="flex justify-between pb-7">
	<Button onclick={back}>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>

	<StepProgress step={1} />

	<div class="invisible">
		<a href="category-form-page">
			<Button variant="outline">
				ถัดไป
				<Icon slot="right" icon="mdi:arrow-right" class="text-primary" width="24" />
			</Button>
		</a>
	</div>
</div>

<div class="flex items-center justify-center">
	<p class="pb-7 text-3xl font-bold">โปรดเลือกประเภท (เลือกได้อย่างใดอย่างหนึ่ง)</p>
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
