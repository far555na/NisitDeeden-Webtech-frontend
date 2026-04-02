<script lang="ts">
	import RoundForm from '$lib/components/RoundForm.svelte';

	let { form } = $props();
</script>

<RoundForm
	title="สร้างรอบการรับสมัครใหม่"
	description="ตั้งค่าช่วงเวลาสำหรับเปิดรับผลงานนิสิตในปีการศึกษาถัดไป"
	{form}
	initialValues={{
		academic_year: '',
		semester: '',
		start_time: '',
		end_time: '',
		status: ''
	}}
	submitText="บันทึก"
/>