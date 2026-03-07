<script>
	import Button from '$lib/components/Button.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';
	import background from '$lib/assets/background.png';
	import FormGrid from '$lib/components/FormGrid.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import Icon from '@iconify/svelte';
	import FileLink from '$lib/components/FileLink.svelte';
	import ApplicationDetailView from '$lib/components/ApplicationDetailView.svelte';

	const { data } = $props();
</script>

<ApplicationDetailView application={data.application} />