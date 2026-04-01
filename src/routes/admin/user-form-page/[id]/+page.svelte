<!-- src/routes/admin/user-form-page/[id]/+page.svelte -->
<script lang="ts">
	import UserForm from '$lib/components/UserForm.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	const user = data.user;
    console.log('page data', data);
</script>

<UserForm
	title="แก้ไขข้อมูลผู้ใช้งาน"
	description="ปรับปรุงข้อมูลผู้ใช้งาน"
	{form}
	data={{
		positions: data.positions ?? [],
		faculties: data.faculties ?? [],
		departments: data.departments ?? []
	}}
	initialValues={{
		university_id: user.university_id ?? '',
		name: user.name ?? '',
		email: user.email ?? '',
		position: user.position_en ?? '',
		faculty: user.faculty_en ?? '',
		department: user.department_en ?? '',
		profile_path: user.profile_url ?? null
	}}
	submitText="บันทึกการแก้ไข"
/>