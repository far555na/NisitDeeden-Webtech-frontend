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
	<!-- <div class="rounded-2xl border border-neutral-200 bg-white p-4 text-sm shadow-sm">
		<div class="font-semibold text-neutral-800">สถานะการเชื่อมต่อ Realtime</div>
		<div class="mt-2 flex flex-col gap-1 text-neutral-600">
			<div>
				Status:
				<span class={isConnected ? 'font-semibold text-green-600' : 'font-semibold text-red-500'}>
					{isConnected ? 'Connected' : 'Disconnected'}
				</span>
			</div>
			<div>User ID: {userId ?? '-'}</div>
			<div>Channel: {channelName || '-'}</div>
			<div>Event: {eventName}</div>
			<div class="break-words">Message: {latestMessage}</div>
		</div>
	</div> -->

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
	{:else}
		<div class="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-neutral-500">
			ยังไม่มีใบสมัครที่กำลังดำเนินการ
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