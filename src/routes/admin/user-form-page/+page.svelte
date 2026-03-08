<script lang="ts">
	import FormField from '$lib/components/FormField.svelte';
	import FormGrid from '$lib/components/FormGrid.svelte';
	import background from '$lib/assets/background.png';
	import type { SubmitFunction } from './$types';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';

	const { data, form } = $props();

	let isSubmitting = $state(false);
	let previewUrl = $state<string | null>(null);
	let selectedFileName = $state('ยังไม่ได้เลือกไฟล์');

	let selectedPosition = $state('');
	let selectedFaculty = $state('');
	let selectedDepartment = $state('');

	const isDepartmentDisabled = $derived(!selectedFaculty);

	const initialPosition = $derived(
		typeof form?.data?.position === 'string' ? form.data.position : ''
	);

	const facultyOptions = $derived(
		data.faculties?.map((faculty: any) => ({
			label: faculty.label,
			value: faculty.value
		})) ?? []
	);

	const departmentOptions = $derived(
		data.departments
			?.filter((department: any) => department.faculty?.value === selectedFaculty)
			.map((department: any) => ({
				label: department.label,
				value: department.value
			})) ?? []
	);

	$effect(() => {
		selectedFaculty;
		selectedDepartment = '';
	});

	$effect(() => {
		if (!selectedPosition) {
			selectedPosition = initialPosition;
		}
	});

	const handleSubmit: SubmitFunction = () => {
		isSubmitting = true;

		return async ({ update }) => {
			await update();
			isSubmitting = false;
		};
	};

	const showFaculty = $derived(
		selectedPosition === 'student' ||
			selectedPosition === 'head_of_department' ||
			selectedPosition === 'associate_dean' ||
			selectedPosition === 'dean'
	);

	const showDepartment = $derived(
		selectedPosition === 'student' || selectedPosition === 'head_of_department'
	);

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			selectedFileName = file.name;
			previewUrl = URL.createObjectURL(file);
		} else {
			selectedFileName = 'ยังไม่ได้เลือกไฟล์';
			previewUrl = null;
		}
	}
</script>

<form method="POST" enctype="multipart/form-data" use:enhance={handleSubmit}>
	<div class="flex w-full flex-wrap gap-10">
		<div>
			<img class="h-80 w-3xs object-cover pb-5" src={previewUrl ?? background} alt="background" />
			<input
				id="profile_picture"
				name="profile_picture"
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

				<p class="text-neutral-500">{selectedFileName}</p>
			</div>
			<!-- <div class="flex items-center justify-center">
				<Button variant="outline" type="button" disabled={isSubmitting}>
					<Icon slot="left" icon="mdi:tray-arrow-up" class="text-primary" width="24" />
					อัปโหลด
				</Button>
			</div> -->
		</div>

		<div class="flex min-h-[calc(100vh-12rem)] min-w-xs flex-1 flex-col">
			<div class="pb-5 text-xl font-semibold text-primary">ข้อมูลส่วนตัว</div>

			<FormGrid cols={2}>
				<FormField id="student_id" name="university_id" label="รหัสนิสิต" />
				<FormField id="student_name" name="name" label="ชื่อ-นามสกุล" />
				<FormField id="email" name="email" label="อีเมล" />
			</FormGrid>

			<div class="py-5 text-xl font-semibold text-primary">ตำแหน่ง</div>

			<input type="hidden" name="position" value={selectedPosition} />

			<div class="flex flex-wrap gap-3">
				{#each data.positions as position}
					<Button
						type="button"
						variant="outline"
						onclick={() => (selectedPosition = position.value)}
						class={`${
							selectedPosition === position.value
								? 'border-primary bg-primary text-white'
								: 'border-primary text-primary'
						}`}
					>
						{position.label}
					</Button>
				{/each}
			</div>

			{#if showFaculty || showDepartment}
				<div class="py-5 text-xl font-semibold text-primary">หน่วยงาน</div>

				<div class="flex flex-wrap gap-4">
					{#if showFaculty}
						<div class="flex flex-col gap-2">
							<FilterDropdown
								options={facultyOptions}
								value={selectedFaculty}
								placeholder="คณะ"
								onSelect={(v) => (selectedFaculty = v)}
							/>
							<input type="hidden" name="faculty" value={selectedFaculty} />
						</div>
					{/if}

					{#if showDepartment}
						<div class="flex flex-col gap-2">
							<FilterDropdown
								options={departmentOptions}
								value={selectedDepartment}
								placeholder="ภาควิชา"
								onSelect={(v) => (selectedDepartment = v)}
								disabled={isDepartmentDisabled}
							/>
							<input type="hidden" name="department" value={selectedDepartment} />
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
						บันทึก
					{/if}
				</Button>
			</div>
		</div>
	</div>
</form>
