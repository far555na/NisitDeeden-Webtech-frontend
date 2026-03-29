<script lang="ts">
	import FormField from '$lib/components/FormField.svelte';
	import Button from '$lib/components/Button.svelte';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	const { data, form } = $props();

	function toDatetimeLocal(value: string) {
		if (!value) return '';

		value = value.trim();

		if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) {
			return value.slice(0, 16);
		}

		if (/^\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}/.test(value)) {
			const [datePart, timePart] = value.split(/\s+/);
			const [day, month, year] = datePart.split('/');
			return `${year}-${month}-${day}T${timePart}`;
		}

		if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/.test(value)) {
			const [date, time] = value.split(/\s+/);
			return `${date}T${time.slice(0, 5)}`;
		}

		return '';
	}

	function getErrorMessage(error: unknown): string {
		if (Array.isArray(error)) {
			return String(error[0] ?? '');
		}
		if (typeof error === 'string') {
			return error;
		}
		return '';
	}

	let selectedStatus = $state(
		typeof form?.data?.status === 'string' ? form.data.status : 'draft'
	);

	let selectedSemester = $state(
		typeof form?.data?.semester === 'string' ? form.data.semester : ''
	);

	let startAt = $state(
		typeof form?.data?.start_time === 'string' ? toDatetimeLocal(form.data.start_time) : ''
	);

	let endAt = $state(
		typeof form?.data?.end_time === 'string' ? toDatetimeLocal(form.data.end_time) : ''
	);

	let academicYear = $state(
		typeof form?.data?.academic_year === 'string' ? form.data.academic_year : '2569'
	);

	let isSubmitting = $state(false);
	let openDropdown = $state<string | null>(null);

	function toggleDropdown(name: string) {
		openDropdown = openDropdown === name ? null : name;
	}

	function closeDropdown() {
		openDropdown = null;
	}

	const semesterOptions = [
		{ label: 'ภาคการศึกษาต้น', value: '1' },
		{ label: 'ภาคการศึกษาปลาย', value: '2' }
	];

	const statusOptions = [
		{ label: 'ฉบับร่าง', value: 'DRAFT' },
		{ label: 'เปิดรับสมัคร', value: 'OPEN' },
		{ label: 'ปิดรับสมัคร', value: 'CLOSED' }
	];

	const handleSubmit: SubmitFunction = () => {
		isSubmitting = true;

		return async ({ update }) => {
			await update();
			isSubmitting = false;
		};
	};
</script>

<div class="mx-auto max-w-5xl">
	<div class="mb-6">
		<div>
			<h1 class="text-3xl font-bold text-neutral-900">สร้างรอบการรับสมัครใหม่</h1>
			<p class="mt-1 text-sm text-neutral-500">
				ตั้งค่าช่วงเวลาสำหรับเปิดรับผลงานนิสิตในปีการศึกษาถัดไป
			</p>
		</div>
	</div>

	<form method="POST" class="space-y-6" use:enhance={handleSubmit}>
		{#if form?.message}
			<div class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
				{form.message}
			</div>
		{/if}

		<div class="grid grid-cols-1 gap-10 md:grid-cols-2">
			<div>
				<FormField
					id="academic_year"
					name="academic_year"
					label="ปีการศึกษา"
					type="text"
					bind:value={academicYear}
				/>
				{#if form?.errors?.academic_year}
					<p class="mt-2 text-sm text-red-600">
						{getErrorMessage(form.errors.academic_year)}
					</p>
				{/if}
			</div>

			<div class="flex w-fit flex-col gap-2">
				<label>ภาคการศึกษา</label>
				<FilterDropdown
					options={semesterOptions}
					value={selectedSemester}
					placeholder="กรุณาเลือกภาคการศึกษา"
					isOpen={openDropdown === 'semester'}
					onToggle={() => toggleDropdown('semester')}
					onClose={closeDropdown}
					onValueChange={(v) => (selectedSemester = v)}
				/>
				<input type="hidden" name="semester" value={selectedSemester} />
				{#if form?.errors?.semester}
					<p class="mt-1 text-sm text-red-600">
						{getErrorMessage(form.errors.semester)}
					</p>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-1 gap-10 md:grid-cols-2">
			<div>
				<FormField
					id="start_time"
					name="start_time"
					label="วันและเวลาที่เริ่มต้น"
					type="datetime-local"
					bind:value={startAt}
				/>
				{#if form?.errors?.start_time}
					<p class="mt-2 text-sm text-red-600">
						{getErrorMessage(form.errors.start_time)}
					</p>
				{/if}
			</div>

			<div>
				<FormField
					id="end_time"
					name="end_time"
					label="วันและเวลาที่สิ้นสุด"
					type="datetime-local"
					bind:value={endAt}
				/>
				{#if form?.errors?.end_time}
					<p class="mt-2 text-sm text-red-600">
						{getErrorMessage(form.errors.end_time)}
					</p>
				{/if}
			</div>
		</div>

		<div class="flex w-fit flex-col gap-2">
			<label>สถานะการรับสมัคร</label>
			<FilterDropdown
				options={statusOptions}
				value={selectedStatus}
				placeholder="กรุณาเลือกสถานะ"
				isOpen={openDropdown === 'status'}
				onToggle={() => toggleDropdown('status')}
				onClose={closeDropdown}
				onValueChange={(v) => (selectedStatus = v)}
			/>
			<input type="hidden" name="status" value={selectedStatus} />
			{#if form?.errors?.status}
				<p class="mt-1 text-sm text-red-600">
					{getErrorMessage(form.errors.status)}
				</p>
			{/if}
		</div>

		<div class="mt-auto flex w-full justify-end pt-10">
			<Button variant="outline" type="submit" disabled={isSubmitting} class="px-10">
				<Icon slot="left" icon="mdi:content-save" class="text-primary" width="24" />
				{#if isSubmitting}
					กำลังบันทึกข้อมูล
				{:else}
					บันทึก
				{/if}
			</Button>
		</div>
	</form>
</div>