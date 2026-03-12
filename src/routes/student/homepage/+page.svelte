<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Icon from '@iconify/svelte';
	import StatusProgress from '$lib/components/StatusProgress.svelte';

	let { data }: { data: any } = $props();

	const activeApplication = $derived(data.application);
</script>

<div class="flex flex-col gap-8">
	{#if activeApplication}
		<div class="rounded-3xl bg-primary/5 p-6">
			<div class="mb-5 flex items-start justify-between gap-4">
				<div>
					<div class="text-sm font-semibold text-primary">ใบสมัครที่กำลังดำเนินการ</div>
					<div class="mt-1 text-2xl font-bold">
						{activeApplication.application_category?.name ?? 'ใบสมัครนิสิตดีเด่น'}
					</div>
				</div>

				<a
					href={`/student/application-detail-page/${activeApplication.id}`}
					class="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
				>
					ดูรายละเอียด
					<Icon icon="lucide:chevron-right" width="18" />
				</a>
			</div>

			{#if !activeApplication.rejection_reason}
				<StatusProgress status={activeApplication.status} />
			{/if}

			{#if activeApplication.rejection_reason}
				<div
					class="inline-flex w-full max-w-4xl gap-2 rounded-2xl border-2 border-red-200 bg-red-50 p-5 text-base"
				>
					<div class="flex items-center gap-2 font-semibold text-red-500">
						<Icon icon="mdi:close-circle-outline" width="24" />
						ไม่ผ่านการพิจารณา
					</div>

					<div class="font-medium text-red-500">เนื่องด้วย</div>

					<div class="whitespace-pre-wrap text-red-500 underline">
						{activeApplication.rejection_reason}
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<div class="text-3xl font-bold">โปรดเลือกทำรายการ</div>

	<div class="flex flex-wrap gap-x-10 gap-y-7">
		<Card href="/student/choose-category-page">
			<Icon slot="icon" icon="lucide:circle-plus" class="text-primary" width="100" />
			เสนอตัวเองเป็นนิสิตดีเด่น
		</Card>

		<Card href="/student/applications-history-page">
			<Icon slot="icon" icon="lucide:menu" class="text-primary" width="100" />
			ใบสมัครที่เคยเสนอ
		</Card>
	</div>
</div>
