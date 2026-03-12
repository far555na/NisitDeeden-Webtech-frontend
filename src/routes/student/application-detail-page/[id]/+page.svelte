<script lang="ts">
	import { goto } from '$app/navigation';
	import ApplicationDetailView from '$lib/components/ApplicationDetailView.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';

	const { data } = $props();

	const canTakeAction = $derived(
		data.user?.position === 'student' &&
			data.application?.status === 'PENDING' &&
			data.application?.round.status === 'OPEN'
	);

	function goToEdit() {
		goto(`/student/application-detail-page/${data.application.id}/edit`);
	}
</script>

<ApplicationDetailView application={data.application}>
	<svelte:fragment slot="actions">
		{#if canTakeAction}
			<div class="flex flex-col gap-5">
				<Button variant="outline" fullWidth type="button" onclick={goToEdit}>
					<Icon slot="left" icon="mdi:pencil-outline" class="text-primary" width="24" />
					แก้ไข
				</Button>

				<form method="POST" action="?/deleteApplication" class="w-full">
					<input type="hidden" name="id" value={data.application.id} />
					<Button variant="outlineRed" fullWidth type="submit">
						<Icon slot="left" icon="mdi:trash-can-outline" class="text-red-500" width="24" />
						ลบ
					</Button>
				</form>
			</div>
		{/if}
	</svelte:fragment>
</ApplicationDetailView>