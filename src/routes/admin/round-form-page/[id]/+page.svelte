<script lang="ts">
	import RoundForm from '$lib/components/RoundForm.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	const round = data.round;

	function toDatetimeLocal(value: string) {
		if (!value) return '';
		return value.slice(0, 16);
	}
</script>

<RoundForm
	title="แก้ไขรอบการรับสมัคร"
	description="ปรับปรุงข้อมูลรอบการรับสมัคร"
	{form}
	initialValues={{
		academic_year: String(round.academic_year_en ?? ''),
		semester: String(round.semester_en ?? ''),
		start_time: toDatetimeLocal(round.start_time_en ?? ''),
		end_time: toDatetimeLocal(round.end_time_en ?? ''),
		status: round.status ?? ''
	}}
	submitText="บันทึกการแก้ไข"
/>