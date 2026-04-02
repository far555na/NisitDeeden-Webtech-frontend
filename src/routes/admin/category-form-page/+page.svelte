<script lang="ts">
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<CategoryForm
	title="สร้างประเภทรางวัลใหม่"
	description="กำหนดชื่อและสร้างฟอร์มรับสมัครแบบไดนามิกสำหรับประเภทรางวัลนี้"
	{form}
	submitText="บันทึกข้อมูล"
/>