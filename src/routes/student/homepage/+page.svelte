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
					<div class="text-primary text-sm font-semibold">ใบสมัครที่กำลังดำเนินการ</div>
					<div class="mt-1 text-2xl font-bold">
						{activeApplication.application_category?.name ?? 'ใบสมัครนิสิตดีเด่น'}
					</div>
				</div>

				<a
					href={`/student/application-detail-page/${activeApplication.id}`}
					class="text-primary inline-flex items-center gap-2 font-semibold hover:underline"
				>
					ดูรายละเอียด
					<Icon icon="lucide:chevron-right" width="18" />
				</a>
			</div>

			<StatusProgress status={activeApplication.status} />

			{#if activeApplication.reject_reason}
				<div class="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4">
					<div class="flex items-center gap-2 text-base font-semibold text-red-600">
						<Icon icon="mdi:close-circle-outline" width="22" />
						ไม่ผ่านการพิจารณา
					</div>
					<div class="mt-2 text-sm font-medium text-red-500">เหตุผล:</div>
					<div class="mt-1 whitespace-pre-wrap text-sm text-gray-700">
						{activeApplication.reject_reason}
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
			รายการที่เคยเสนอ
		</Card>
	</div>
</div>