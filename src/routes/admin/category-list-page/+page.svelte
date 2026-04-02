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
				<div class="group relative">

					<div class="w-[300px]">
						<Card>
							<div class="flex min-h-[280px] flex-col items-center justify-center gap-3 px-6 py-8 text-center">
								<Icon icon={category.icon} class="text-primary" width="72" />

								<h3 class="text-xl font-semibold text-primary">
									{category.name}
								</h3>

								<p class="line-clamp-3 text-sm leading-6 text-neutral-500">
									{category.description}
								</p>

								<p class="mt-2 text-sm text-neutral-400">
									{category.applications_count} ใบสมัคร
								</p>
							</div>
						</Card>
					</div>

					{#if category.applications_count === 0}
						<div
							class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[32px] bg-black/35 opacity-0 transition-all duration-300 group-hover:opacity-100"
						>
							<div
								class="pointer-events-auto flex items-center gap-4 rounded-full  px-4 py-3 "
							>
								<Button
									variant="filled"
									class="min-w-[88px]"
									onclick={() => gotoEdit(category.id)}
									buttonClass="bg-white text-neutral-900 hover:bg-neutral-100"
								>
									แก้ไข
								</Button>

								<form method="POST" action="?/deleteCategory">
									<input type="hidden" name="id" value={category.id} />
									<Button
										type="submit"
										variant="filled"
										class="min-w-[88px]"
										buttonClass="bg-red-500 text-white hover:bg-red-600"
									>
										ลบ
									</Button>
								</form>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		{/each}
	{:else}
		<p class="text-lg text-neutral-500">ขณะนี้ยังไม่มีประเภทให้เลือก</p>
	{/if}
</div>