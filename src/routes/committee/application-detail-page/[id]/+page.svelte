<script lang="ts">
	import ApplicationDetailView from '$lib/components/ApplicationDetailView.svelte';
	import Button from '$lib/components/Button.svelte';
	import TextareaField from '$lib/components/TextareaField.svelte';
	import Icon from '@iconify/svelte';

	const { data } = $props();

	let rejectDialog: HTMLDialogElement;
	let rejectReason = $state('');

	function openRejectDialog() {
		rejectReason = '';
		rejectDialog.showModal();
	}

	function closeRejectDialog() {
		rejectDialog.close();
	}

	function handleBackdropClick(event: MouseEvent) {
		const target = event.currentTarget as HTMLDialogElement;
		const rect = target.getBoundingClientRect();

		const isInside =
			event.clientX >= rect.left &&
			event.clientX <= rect.right &&
			event.clientY >= rect.top &&
			event.clientY <= rect.bottom;

		if (!isInside) {
			target.close();
		}
	}

	const canTakeAction = $derived(
		(data.user?.position === 'head_of_department' && data.application?.status === 'PENDING') ||
			(data.user?.position === 'associate_dean' &&
				data.application?.status === 'APPROVED_BY_DEPARTMENT') ||
			(data.user?.position === 'dean' &&
				data.application?.status === 'APPROVED_BY_ASSOCIATE_DEAN') ||
			(data.user?.position === 'committee_member' &&
				data.application?.status === 'APPROVED_BY_DEAN')
	);
</script>

<ApplicationDetailView application={data.application}>
	<svelte:fragment slot="actions">
		{#if canTakeAction}
			<div class="flex flex-col gap-5">
				<form method="POST" action="?/reject" class="w-full">
					<Button variant="outlineRed" fullWidth type="button" onclick={openRejectDialog}>
						<Icon slot="left" icon="mdi:close" class="text-red-500" width="24" />
						ไม่เห็นชอบ
					</Button>
				</form>

				<form method="POST" action="?/approve" class="w-full">
					<Button variant="outline" type="submit" fullWidth>
						<Icon slot="left" icon="mdi:check" class="text-primary" width="24" />
						เห็นชอบ
					</Button>
				</form>
			</div>
		{/if}
	</svelte:fragment>
</ApplicationDetailView>

<dialog
	bind:this={rejectDialog}
	class="w-full max-w-md rounded-2xl border-0 p-0 shadow-xl backdrop:bg-black/40"
	onclick={handleBackdropClick}
>
	<form method="POST" action="?/reject" class="relative flex w-full flex-col gap-4 p-6">
		<button
			type="button"
			onclick={closeRejectDialog}
			class="absolute top-4 right-4 rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-500"
			aria-label="Close dialog"
		>
			<Icon icon="mdi:close" width="20" />
		</button>

		<div class="pr-10">
			<h2 class="text-xl font-semibold text-primary">ระบุเหตุผลที่ไม่เห็นชอบ</h2>
			<p class="mt-1 text-neutral-500">กรุณากรอกเหตุผลก่อนส่ง</p>
		</div>

		<TextareaField
			id="reject_reason"
			name="reject_reason"
			label="เหตุผล"
			bind:value={rejectReason}
			placeholder="กรอกเหตุผลที่ไม่เห็นชอบ"
			required={true}
			rows={4}
			wrapperClass="w-full"
			textareaClass="w-full px-4 py-3"
		/>

		<div class="flex gap-3">
			<Button type="submit" variant="outlineRed" fullWidth>
				<!-- <Icon slot="left" icon="mdi:close" class="text-red-500" width="24" /> -->
				ยืนยันไม่เห็นชอบ
			</Button>
		</div>
	</form>
</dialog>

<style>
	dialog[open] {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	dialog {
		margin: auto;
	}
</style>
