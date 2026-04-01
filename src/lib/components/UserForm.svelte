<script lang="ts">
	import FormField from '$lib/components/FormField.svelte';
	import FormGrid from '$lib/components/FormGrid.svelte';
	import background from '$lib/assets/background.png';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';
	import { getStorageUrl } from '$lib/profile.js';

	type Option = {
		label: string;
		value: string;
	};

	type FacultyOption = Option;

	type DepartmentOption = Option & {
		faculty?: {
			value: string;
			label?: string;
		};
	};

	type InitialValues = {
		university_id?: string;
		name?: string;
		email?: string;
		position?: string;
		faculty?: string;
		department?: string;
		profile_path?: string | null;
	};

	let {
		title = 'เพิ่มผู้ใช้งาน',
		description = 'กรอกข้อมูลผู้ใช้งานในระบบ',
		form = null,
		initialValues = {},
		data,
		action = '',
		submitText = 'บันทึก'
	}: {
		title?: string;
		description?: string;
		form?: any;
		initialValues?: InitialValues;
		data: {
			positions: Option[];
			faculties?: FacultyOption[];
			departments?: DepartmentOption[];
		};
		action?: string;
		submitText?: string;
	} = $props();

	function getErrorMessage(error: unknown): string {
		if (Array.isArray(error)) return String(error[0] ?? '');
		if (typeof error === 'string') return error;
		return '';
	}

	let isSubmitting = $state(false);
	let openDropdown = $state<string | null>(null);

	let previewUrl = $state<string | null>(
		initialValues.profile_path ? getStorageUrl(initialValues.profile_path) : null
	);
	let selectedFileName = $state(
		initialValues.profile_path
			? (initialValues.profile_path.split('/').pop() ?? 'รูปเดิม')
			: 'ยังไม่ได้เลือกไฟล์'
	);

	let selectedPosition = $state(
		typeof form?.data?.position === 'string' ? form.data.position : (initialValues.position ?? '')
	);

	let selectedFaculty = $state(
		typeof form?.data?.faculty === 'string' ? form.data.faculty : (initialValues.faculty ?? '')
	);

	let selectedDepartment = $state(
		typeof form?.data?.department === 'string'
			? form.data.department
			: (initialValues.department ?? '')
	);

	const facultyOptions = $derived(
		data.faculties?.map((faculty) => ({
			label: faculty.label,
			value: faculty.value
		})) ?? []
	);

	const departmentOptions = $derived(
		data.departments
			?.filter((department) => department.faculty?.value === selectedFaculty)
			.map((department) => ({
				label: department.label,
				value: department.value
			})) ?? []
	);

	const isDepartmentDisabled = $derived(!selectedFaculty);

	const showFaculty = $derived(
		selectedPosition === 'student' ||
			selectedPosition === 'head_of_department' ||
			selectedPosition === 'associate_dean' ||
			selectedPosition === 'dean'
	);

	const showDepartment = $derived(
		selectedPosition === 'student' || selectedPosition === 'head_of_department'
	);

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

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			selectedFileName = file.name;
			previewUrl = URL.createObjectURL(file);
		} else {
			selectedFileName = initialValues.profile_path
				? (initialValues.profile_path.split('/').pop() ?? 'รูปเดิม')
				: 'ยังไม่ได้เลือกไฟล์';

			previewUrl = initialValues.profile_path ? getStorageUrl(initialValues.profile_path) : null;
		}
	}

	$effect(() => {
		if (!showDepartment) {
			selectedDepartment = '';
		}
	});

	$effect(() => {
		if (!showFaculty) {
			selectedFaculty = '';
			selectedDepartment = '';
		}
	});

	$effect(() => {
		if (selectedFaculty && selectedDepartment) {
			const stillExists = data.departments?.some(
				(department) =>
					department.value === selectedDepartment && department.faculty?.value === selectedFaculty
			);

			if (!stillExists) {
				selectedDepartment = '';
			}
		}
	});

	console.log('selectedPosition', selectedPosition);
	console.log('selectedFaculty', selectedFaculty);
	console.log('selectedDepartment', selectedDepartment);
	console.log('positions', data.positions);
	console.log('faculties', data.faculties);
	console.log('departments', data.departments);
</script>

<div class="mx-auto max-w-6xl">
	<div class="mb-6">
		<h1 class="text-3xl font-bold text-neutral-900">{title}</h1>
		<p class="mt-1 text-sm text-neutral-500">{description}</p>
	</div>

	<form method="POST" enctype="multipart/form-data" {action} use:enhance={handleSubmit}>
		{#if form?.message}
			<div class="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
				{form.message}
			</div>
		{/if}

		<div class="flex w-full flex-wrap gap-10">
			<div>
				<img
					class="h-80 w-3xs object-cover pb-5"
					src={previewUrl ?? background}
					alt="profile preview"
				/>

				<input
					id="profile_picture"
					name="photo"
					type="file"
					accept="image/*"
					onchange={handleFileChange}
					class="hidden"
				/>

				<div class="flex gap-3">
					<label
						for="profile_picture"
						class="inline-flex cursor-pointer text-primary hover:underline"
					>
						<span>เลือกรูปโปรไฟล์</span>
					</label>

					<p class="max-w-[150px] truncate text-neutral-500">
						{selectedFileName}
					</p>
				</div>
			</div>

			<div class="flex min-h-[calc(100vh-12rem)] min-w-xs flex-1 flex-col">
				<div class="pb-5 text-xl font-semibold text-primary">ข้อมูลส่วนตัว</div>

				<FormGrid cols={2}>
					<div>
						<FormField
							id="university_id"
							name="university_id"
							label="รหัสนิสิต"
							value={typeof form?.data?.university_id === 'string'
								? form.data.university_id
								: (initialValues.university_id ?? '')}
							disabled={isSubmitting}
						/>
						{#if form?.errors?.university_id}
							<p class="mt-1 text-sm text-red-500">
								{getErrorMessage(form.errors.university_id)}
							</p>
						{/if}
					</div>

					<div>
						<FormField
							id="name"
							name="name"
							label="ชื่อ-นามสกุล"
							value={typeof form?.data?.name === 'string'
								? form.data.name
								: (initialValues.name ?? '')}
							disabled={isSubmitting}
						/>
						{#if form?.errors?.name}
							<p class="mt-1 text-sm text-red-500">{getErrorMessage(form.errors.name)}</p>
						{/if}
					</div>

					<div class="col-span-2">
						<FormField
							id="email"
							name="email"
							label="อีเมล"
							value={typeof form?.data?.email === 'string'
								? form.data.email
								: (initialValues.email ?? '')}
							disabled={isSubmitting}
						/>
						{#if form?.errors?.email}
							<p class="mt-1 text-sm text-red-500">{getErrorMessage(form.errors.email)}</p>
						{/if}
					</div>
				</FormGrid>

				<div class="py-5 text-xl font-semibold text-primary">ตำแหน่ง</div>

				<input type="hidden" name="position" value={selectedPosition} />

				<div class="flex flex-wrap gap-3">
					{#each data.positions as position}
						<Button
							type="button"
							variant="outline"
							onclick={() => (selectedPosition = position.value)}
							class={selectedPosition === position.value
								? 'border-primary bg-primary text-white'
								: 'border-primary text-primary'}
							disabled={isSubmitting}
						>
							{position.label}
						</Button>
					{/each}
				</div>

				{#if form?.errors?.position}
					<p class="mt-2 text-sm text-red-500">{getErrorMessage(form.errors.position)}</p>
				{/if}

				{#if showFaculty || showDepartment}
					<div class="py-5 text-xl font-semibold text-primary">หน่วยงาน</div>

					<div class="flex flex-wrap gap-4">
						{#if showFaculty}
							<div class="flex flex-col gap-2">
								<FilterDropdown
									options={facultyOptions}
									value={selectedFaculty}
									placeholder="คณะ"
									isOpen={openDropdown === 'faculty'}
									onToggle={() => toggleDropdown('faculty')}
									onClose={closeDropdown}
									onValueChange={(v) => (selectedFaculty = v)}
									disabled={isSubmitting}
								/>
								<input type="hidden" name="faculty" value={selectedFaculty} />

								{#if form?.errors?.faculty}
									<p class="text-sm text-red-500">
										{getErrorMessage(form.errors.faculty)}
									</p>
								{/if}
							</div>
						{/if}

						{#if showDepartment}
							<div class="flex flex-col gap-2">
								<FilterDropdown
									options={departmentOptions}
									value={selectedDepartment}
									placeholder="ภาควิชา"
									isOpen={openDropdown === 'department'}
									onToggle={() => toggleDropdown('department')}
									onClose={closeDropdown}
									onValueChange={(v) => (selectedDepartment = v)}
									disabled={isDepartmentDisabled || isSubmitting}
								/>
								<input type="hidden" name="department" value={selectedDepartment} />

								{#if form?.errors?.department}
									<p class="text-sm text-red-500">
										{getErrorMessage(form.errors.department)}
									</p>
								{/if}
							</div>
						{/if}
					</div>
				{/if}

				<div class="mt-auto flex justify-end pt-10">
					<Button variant="outline" type="submit" disabled={isSubmitting} class="px-10">
						<Icon slot="left" icon="mdi:content-save" class="text-primary" width="24" />
						{#if isSubmitting}
							กำลังบันทึกข้อมูล
						{:else}
							{submitText}
						{/if}
					</Button>
				</div>
			</div>
		</div>
	</form>
</div>
