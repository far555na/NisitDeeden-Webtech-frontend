<script lang="ts">
	import { goto } from '$app/navigation';
	import ApplicationDetailView from '$lib/components/ApplicationDetailView.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';

	const { data } = $props();


</script>

<ApplicationDetailView application={data.application}>
	<svelte:fragment slot="actions">
			<div class="flex flex-col gap-5">
				<form method="POST" action="?/deleteApplication" class="w-full">
					<input type="hidden" name="id" value={data.application.id} />
					<Button variant="outlineRed" fullWidth type="submit">
						<Icon slot="left" icon="mdi:trash-can-outline" class="text-red-500" width="24" />
						ลบ
					</Button>
				</form>
			</div>
	</svelte:fragment>
</ApplicationDetailView>