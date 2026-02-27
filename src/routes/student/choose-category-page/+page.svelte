<script>
	import Button from '$lib/components/Button.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';

	import Card from '$lib/components/Card.svelte';
	import Icon from '@iconify/svelte';

	const { data } = $props();
</script>

<div class="flex justify-between pb-7">
	<Button>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>

	<StepProgress step={2} />

	<a href="category-form-page">
		<Button variant="outline">
			ถัดไป
			<Icon slot="right" icon="mdi:arrow-right" class="text-primary" width="24" />
		</Button>
	</a>
</div>

<div class="flex items-center justify-center">
	<p class="pb-7 text-3xl font-bold">โปรดเลือกประเภท (เลือกได้อย่างใดอย่างหนึ่ง)</p>
</div>

<div class="flex flex-wrap items-center justify-center gap-10">
	{#each data.categories as category}
		<Card href="/student/form-page">
			<Icon slot="icon" icon={category.icon} class="text-primary" width="100" />
			{category.name}
		</Card>
	{/each}
</div>
