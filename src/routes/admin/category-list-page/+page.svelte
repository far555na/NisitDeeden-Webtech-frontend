<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';

	import Card from '$lib/components/Card.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	const { data } = $props();

	function gotoCreate() {
		goto(`/admin/category-form-page`);
	}

	function gotoEdit(id: number) {
		goto(`/admin/category-form-page/${id}`);
	}
</script>

<div class="flex flex-col items-center justify-center pb-10">
	<h1 class="text-3xl font-bold text-neutral-900">จัดการประเภทรางวัล</h1>
	<p class="mt-1 pb-5 text-sm text-neutral-500">เพิ่ม ลบ หรือแก้ไขประเภทรางวัล</p>
	<Button variant="filled" class="px-10" onclick={gotoCreate} buttonClass="bg-primary text-white">
		<Icon slot="left" icon="mdi:plus" class="text-white" width="24" />
		เพิ่มประเภทรางวัล
	</Button>
</div>

<div class="flex flex-wrap items-center justify-center gap-10">
	{#if data.categories && data.categories.length > 0}
		{#each data.categories as category}
			{#if category.is_active}
				<div class="flex flex-col items-center gap-3">
					<Card href={`/student/category-form-page?category=${category.id}`}>
						<Icon slot="icon" icon={category.icon} class="text-primary" width="100" />
						{category.name}
					</Card>

					{#if category.applications_count === 0}
						<div class="flex items-center gap-2">
							<Button variant="primary" buttonClass="!p-3" onclick={() => gotoEdit(category.id)}>
								แก้ไข
							</Button>

							<form method="POST" action="?/deleteCategory">
								<input type="hidden" name="id" value={category.id} />
								<Button variant="primary" buttonClass="!p-3 text-red-500" type="submit">ลบ</Button>
							</form>
						</div>
					{/if}
				</div>
			{/if}
		{/each}
	{:else}
		<p class="text-lg text-neutral-500">ขณะนี้ยังไม่มีประเภทให้เลือก</p>
	{/if}
</div>
