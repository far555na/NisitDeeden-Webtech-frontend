<script>
	import ApplicationDetailView from '$lib/components/ApplicationDetailView.svelte';

	const { data } = $props();
</script>

<ApplicationDetailView application={data.application} />