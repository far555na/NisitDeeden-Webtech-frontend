<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import FormGrid from '$lib/components/FormGrid.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';
	import TextareaField from '$lib/components/TextareaField.svelte';
	import UploadCard from '$lib/components/UploadCard.svelte';
	import Icon from '@iconify/svelte';

	const { data } = $props();

	console.log(data);

	function prevPage() {
		goto(`/student/choose-category-page`);
	}
</script>

<div class="flex justify-between pb-7">
	<Button onclick={prevPage}>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>

	<StepProgress step={3} />

	<a href="application-detail-page">
		<Button variant="outline">
			ถัดไป
			<Icon slot="right" icon="mdi:arrow-right" class="text-primary" width="24" />
		</Button>
	</a>
</div>

<div class="max-w-7xl  mx-auto">
	<p class="text-primary pb-7 text-3xl font-bold">ประเภท: {data.category.name}</p>

	<div class="flex flex-col gap-5">
		<div class="text-2xl font-semibold">รายละเอียด</div>
		{#each data.category.attributes as attribute}
			{#if attribute.type === 'text' || attribute.type === 'textarea'}
				<FormGrid cols={1}>
					{#if attribute.type === 'text'}
						<FormField id="student_id" name="student_id" label={attribute.label} />
					{:else}
						<TextareaField id="asd" name="sad" label={attribute.label} />
					{/if}
				</FormGrid>
			{/if}
		{/each}

		<div class="pt-5 text-2xl font-semibold">เอกสารประกอบ</div>
		{#each data.category.attributes as attribute}
			{#if attribute.type === 'file'}
				<UploadCard
					title={attribute.label}
					icon="mdi:file-outline"
					buttonText="อัปโหลด"
					buttonIcon="mdi:tray-arrow-up"
					onUpload={() => {}}
				/>
			{/if}
		{/each}
	</div>

	
</div>
