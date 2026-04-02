<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Icon from '@iconify/svelte';
	import StatusProgress from '$lib/components/StatusProgress.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { getEcho } from '$lib/broadcasting/echo';

	let { data }: { data: any } = $props();

	let activeApplication = $state(data.application ?? null);

	const userId = data.user?.id;
	const channelName = userId ? `user.${userId}` : '';
	const eventName = 'ApplicationStatusUpdated';

	const hasOpenRound = data.hasOpenRound ?? false;
	const openRound = data.openRound ?? null;

	let latestMessage = $state('กำลังรอรับข้อความ...');
	let isConnected = $state(false);

	onMount(() => {
		const echo = getEcho();

		if (!echo) {
			latestMessage = '❌ Echo ยังไม่พร้อมใช้งาน';
			return;
		}

		if (!userId) {
			latestMessage = '❌ ไม่พบ userId';
			return;
		}

		console.log(`Connecting to private-${channelName}...`);

		const channel = echo.private(channelName);

		channel.subscribed(() => {
			console.log(`Subscribed to private-${channelName}`);
			isConnected = true;
			latestMessage = '✅ เชื่อมต่อสำเร็จ! รอรับข้อมูล...';
		});

		channel.listen(eventName, (e: any) => {
			console.log('Received:', e);

			if (e?.application) {
				activeApplication = e.application;
				latestMessage = '✅ ได้รับการอัปเดตสถานะใบสมัครแล้ว';
			} else {
				latestMessage = '⚠️ ได้รับ event แต่ไม่มีข้อมูล application';
			}
		});

		channel.error((error: any) => {
			console.error('Auth/Error:', error);
			isConnected = false;
			latestMessage = '❌ เกิดข้อผิดพลาดในการเชื่อมต่อ (Auth Failed)';
		});
	});

	onDestroy(() => {
		const echo = getEcho();
		if (echo && channelName) {
			echo.leave(channelName);
		}
	});
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

			{#if activeApplication.status !== 'REJECTED' && !activeApplication.rejection_reason}
				<StatusProgress status={activeApplication.status} />
			{/if}

			{#if activeApplication.rejection_reason}
				<div
					class="inline-flex w-full max-w-4xl flex-wrap gap-2 rounded-2xl border-2 border-red-200 bg-red-50 p-5 text-base"
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

	{#if !hasOpenRound}
		<div class="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-700">
			<div class="flex items-start gap-3">
				<Icon icon="mdi:clock-alert-outline" width="24" class="mt-0.5 shrink-0" />
				<div>
					<div class="font-semibold">ขณะนี้ยังไม่มีรอบสมัครที่เปิดอยู่</div>
					<div class="mt-1 text-sm">
						ระบบจะยังไม่อนุญาตให้สร้างใบสมัครใหม่ จนกว่าจะมีรอบสมัครเปิด
					</div>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex flex-wrap gap-x-10 gap-y-7">
		{#if hasOpenRound}
			<Card href="/student/choose-category-page">
				<Icon slot="icon" icon="lucide:circle-plus" class="text-primary" width="100" />
				เสนอตัวเองเป็นนิสิตดีเด่น
			</Card>
		{:else}
			<div
				class="flex size-75 cursor-not-allowed flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-neutral-100 px-6 text-center opacity-70"
			>
				<Icon icon="lucide:circle-plus" class="text-neutral-400" width="100" />
				<div class="mt-4 text-lg font-semibold text-neutral-500">
					เสนอตัวเองเป็นนิสิตดีเด่น
				</div>
				<div class="mt-2 text-sm text-neutral-400">
					ยังไม่สามารถทำรายการได้เนื่องจากไม่มีรอบสมัครที่เปิดอยู่
				</div>
			</div>
		{/if}

		<Card href="/student/applications-history-page">
			<Icon slot="icon" icon="lucide:menu" class="text-primary" width="100" />
			ใบสมัครที่เคยเสนอ
		</Card>
	</div>
</div>