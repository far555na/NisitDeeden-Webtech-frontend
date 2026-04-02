<script lang="ts">
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	const category = data.category;
</script>

<CategoryForm
	title="แก้ไขประเภทรางวัล"
	description="ปรับปรุงข้อมูลประเภทรางวัลและฟิลด์การสมัคร"
	{form}
	initialValues={{
		name: category.name ?? '',
		icon: category.icon ?? '',
		description: category.description ?? '',
		attributes:
			category.attributes?.map((attr: any) => ({
				id: attr.id,
				label: attr.label ?? '',
				type: attr.type ?? 'text',
				is_required: Boolean(attr.is_required)
			})) ?? []
	}}
	submitText="บันทึกการแก้ไข"
/>
