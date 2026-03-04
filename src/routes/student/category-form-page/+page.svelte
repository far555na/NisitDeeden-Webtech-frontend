<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import FormGrid from '$lib/components/FormGrid.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';
	import TextareaField from '$lib/components/TextareaField.svelte';
	import UploadCard from '$lib/components/UploadCard.svelte';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';
	import type { ActionData } from './$types';

	let { form, data }: { form: ActionData; data: any } = $props();

	let isSubmitting = $state(false);

	const handleSubmit: SubmitFunction = ({ formData }) => {
		isSubmitting = true;

		return async ({ update }) => {
			await update();

			isSubmitting = false;
		};
	};

	function prevPage() {
		goto(`/student/choose-category-page`);
	}

	$effect(() => {
		if (form?.message) {
			alert(form.message);
		}

		if (form?.errors) {
			const errorText = Object.values(form.errors).flat().join('\n');

			alert(errorText);
		}
	});
</script>

<div class="flex justify-between pb-7">
	<Button on:click={prevPage}>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>

	<StepProgress step={2} />

	<div class="invisible">
		<Button variant="outline">
			ถัดไป
			<Icon slot="right" icon="mdi:arrow-right" class="text-primary" width="24" />
		</Button>
	</div>
</div>

<form method="POST" enctype="multipart/form-data" use:enhance={handleSubmit}>
	<input type="hidden" name="category_id" value={data.category.id} />
	<div class="mx-auto max-w-7xl">
		<p class="pb-7 text-3xl font-bold text-primary">ประเภท: {data.category.name}</p>

		<div class="flex flex-col gap-5">
			<div class="text-2xl font-semibold">รายละเอียด</div>
			{#each data.category.attributes as attribute}
				{#if attribute.type === 'text' || attribute.type === 'textarea'}
					<FormGrid cols={1}>
						{#if attribute.type === 'text'}
							<FormField
								id={`attr_${attribute.id}`}
								name={`values[${attribute.id}]`}
								label={attribute.label}
								required={attribute.is_required}
								disabled={isSubmitting}
							/>
						{:else}
							<TextareaField
								id={`attr_${attribute.id}`}
								name={`values[${attribute.id}]`}
								label={attribute.label}
								required={attribute.is_required}
								disabled={isSubmitting}
							/>
						{/if}
					</FormGrid>
				{/if}
			{/each}

			<div class="pt-5 text-2xl font-semibold">เอกสารประกอบ</div>
			{#each data.category.attributes as attribute}
				{#if attribute.type === 'file'}
					<UploadCard
						title={attribute.label}
						name={`values[${attribute.id}]`}
						required={attribute.is_required}
						onUpload={(files) => console.log(files)}
					/>
				{/if}
			{/each}
		</div>

		<div class="flex justify-center pt-15">
			<Button variant="outline" type="submit" disabled={isSubmitting}>
				<Icon slot="left" icon="mdi:content-save" class="text-primary" width="24" />
				{#if isSubmitting}
					กำลังบันทึกข้อมูล
				{:else}
					บันทึก
				{/if}
			</Button>
		</div>
		<!-- {#if form?.message}
			<div class="rounded bg-red-100 p-3 pt-5 text-center text-sm text-red-700">
				{form.message}
			</div>
		{/if}
		{#if form?.errors}
			<div class="rounded bg-red-100 p-3 pt-5 text-center text-sm text-red-700">
				<pre>{JSON.stringify(form.errors, null, 2)}</pre>
			</div>
		{/if} -->
	</div>
</form>
