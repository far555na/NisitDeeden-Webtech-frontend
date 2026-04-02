<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	type Option = {
		label: string;
		value: string;
	};

	let {
		title = 'สร้างรอบการรับสมัครใหม่',
		description = 'ตั้งค่าช่วงเวลาสำหรับเปิดรับผลงานนิสิต',
		form = null,
		initialValues = {},
		action = '',
		submitText = 'บันทึก'
	}: {
		title?: string;
		description?: string;
		form?: any;
		initialValues?: {
			academic_year?: string;
			semester?: string;
			start_time?: string;
			end_time?: string;
			status?: string;
		};
		action?: string;
		submitText?: string;
	} = $props();

	function getErrorMessage(error: unknown): string {
		if (Array.isArray(error)) return String(error[0] ?? '');
		if (typeof error === 'string') return error;
		return '';
	}

	let selectedStatus = $state(initialValues.status ?? 'DRAFT');
	let selectedSemester = $state(initialValues.semester ?? '');
	let startAt = $state(initialValues.start_time ?? '');
	let endAt = $state(initialValues.end_time ?? '');
	let academicYear = $state(initialValues.academic_year ?? '');
	let isSubmitting = $state(false);
	let openDropdown = $state<string | null>(null);

	const semesterOptions: Option[] = [
		{ label: 'ภาคการศึกษาต้น', value: '1' },
		{ label: 'ภาคการศึกษาปลาย', value: '2' }
	];

	const statusOptions: Option[] = [
		{ label: 'ฉบับร่าง', value: 'DRAFT' },
		{ label: 'เปิดรับสมัคร', value: 'OPEN' },
		{ label: 'ปิดรับสมัคร', value: 'CLOSED' }
	];

	function toggleDropdown(name: string) {
		openDropdown = openDropdown === name ? null : name;
	}

	function closeDropdown() {
		openDropdown = null;
	}

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
		<h1 class="text-3xl font-bold text-neutral-900">{title}</h1>
		<p class="mt-1 text-sm text-neutral-500">{description}</p>
	</div>

	<form method="POST" {action} class="space-y-6" use:enhance={handleSubmit}>
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
					disabled={isSubmitting}
				/>
				{#if form?.errors?.academic_year}
					<p class="mt-2 text-sm text-red-600">
						{getErrorMessage(form.errors.academic_year)}
					</p>
				{/if}
			</div>

			<div class="flex w-fit flex-col gap-2">
				<label for="semester">ภาคการศึกษา</label>
				<FilterDropdown
					options={semesterOptions}
					value={selectedSemester}
					placeholder="กรุณาเลือกภาคการศึกษา"
					isOpen={openDropdown === 'semester'}
					onToggle={() => toggleDropdown('semester')}
					onClose={closeDropdown}
					onValueChange={(v) => (selectedSemester = v)}
				/>
				<input type="hidden" id="semester" name="semester" value={selectedSemester} />
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
					disabled={isSubmitting}
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
					disabled={isSubmitting}
				/>
				{#if form?.errors?.end_time}
					<p class="mt-2 text-sm text-red-600">
						{getErrorMessage(form.errors.end_time)}
					</p>
				{/if}
			</div>
		</div>

		<div class="flex w-fit flex-col gap-2">
			<label for="status">สถานะการรับสมัคร</label>
			<FilterDropdown
				options={statusOptions}
				value={selectedStatus}
				placeholder="กรุณาเลือกสถานะ"
				isOpen={openDropdown === 'status'}
				onToggle={() => toggleDropdown('status')}
				onClose={closeDropdown}
				onValueChange={(v) => (selectedStatus = v)}
			/>
			<input type="hidden" id="status" name="status" value={selectedStatus} />
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
					{submitText}
				{/if}
			</Button>
		</div>
	</form>
</div>