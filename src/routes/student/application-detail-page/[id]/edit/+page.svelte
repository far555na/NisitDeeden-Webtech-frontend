<script lang="ts">
	import ApplicationForm from '$lib/components/ApplicationForm.svelte';
	import type { ActionData, PageData } from './$types';

	let { form, data }: { form: ActionData; data: any } = $props();

	const application = data.application;
	const category = data.category;

	const initialValues: Record<string, any> = Object.fromEntries(
		(application.values ?? []).map((v: any) => [String(v.category_attribute_id), v.value])
	);
</script>

<ApplicationForm {category} {form} {initialValues} backUrl="/student/applications-history-page" />
