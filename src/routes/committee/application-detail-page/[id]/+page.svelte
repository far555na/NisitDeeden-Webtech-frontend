<script lang="ts">
	import ApplicationDetailView from '$lib/components/ApplicationDetailView.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';

	const { data } = $props();
</script>

<ApplicationDetailView application={data.application}>
	<svelte:fragment slot="actions">
		<div class="flex flex-col gap-5">
			<Button variant="outlineRed">
				<Icon slot="left" icon="mdi:close" class="text-red-500" width="24" />
				ไม่เห็นชอบ
			</Button>
			<Button variant="outline">
				<Icon slot="left" icon="mdi:check" class="text-primary" width="24" />
				เห็นชอบ
			</Button>
		</div>
	</svelte:fragment>
</ApplicationDetailView>
