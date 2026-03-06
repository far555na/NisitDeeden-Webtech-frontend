<script lang="ts">
    import ApplicationForm from '$lib/components/ApplicationForm.svelte';
	import type { ActionData } from './$types';
    
    let { form, data }: { form: ActionData; data: any } = $props();
</script>

<ApplicationForm 
    category={data.category} 
    {form} 
    backUrl="/student/choose-category-page" 
/>