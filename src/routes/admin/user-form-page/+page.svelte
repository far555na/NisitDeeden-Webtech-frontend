<script lang="ts">
	import UserForm from '$lib/components/UserForm.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<UserForm
	title="เพิ่มผู้ใช้งาน"
	description="กรอกข้อมูลผู้ใช้งานใหม่เข้าสู่ระบบ"
	{form}
	data={data}
	submitText="บันทึก"
/>