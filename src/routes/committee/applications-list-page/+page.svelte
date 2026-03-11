<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import Icon from '@iconify/svelte';
	import profile from '$lib/assets/background.png';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';

	let { data }: { data: any } = $props();

	type Department = {
		name: string;
		value: string;
		label: string;
		faculty: {
			name: string;
			value: string;
			label: string;
		};
	};

	const canShowDepartment = $derived(
		data.user?.position === 'associate_dean' ||
			data.user?.position === 'dean' ||
			data.user?.position === 'committee_member'
	);

	const canShowFaculty = $derived(data.user?.position === 'committee_member');

	const tableHeaders = $derived([
		'ผู้ส่งใบสมัคร',
		...(canShowDepartment ? ['ภาควิชา'] : []),
		...(canShowFaculty ? ['คณะ'] : []),
		'ปีการศึกษา',
		'เทอม',
		'ประเภท',
		'วันที่ส่ง'
	]);

	const categories = $derived(data.categories);
	const applications = $derived(data.applications);
	const departments = $derived(data.departments);

	let selectedCategory = $derived(data.selectedCategoryId ?? 'all');
	let selectedDepartment = $derived(data.selectedDepartment ?? 'all');

	const categoryOptions = $derived([
		{ label: 'ประเภททั้งหมด', value: 'all' },
		...categories.map((category: any) => ({
			label: category.name,
			value: String(category.id)
		}))
	]);

	const filteredDepartments = $derived(
		data.user?.position === 'associate_dean' || data.user?.position === 'dean'
			? departments.filter(
					(department: Department) => department.faculty.value === data.user.faculty
				)
			: departments
	);

	const departmentOptions = $derived([
		{ label: 'ภาควิชาทั้งหมด', value: 'all' },
		...filteredDepartments.map((department: Department) => ({
			label: department.label,
			value: department.value
		}))
	]);

	function updateFilters(category: string, department: string) {
		const params = new URLSearchParams();

		if (category !== 'all') {
			params.set('category_id', category);
		}

		if (canShowDepartment && department !== 'all') {
			params.set('department', department);
		}

		const query = params.toString();
		goto(`/committee/applications-list-page${query ? `?${query}` : ''}`);
	}

	function selectCategory(value: string) {
		selectedCategory = value;
		updateFilters(value, selectedDepartment);
	}

	function selectDepartment(value: string) {
		selectedDepartment = value;
		updateFilters(selectedCategory, value);
	}

	function goToDetail(id: number) {
		goto(`/committee/application-detail-page/${id}`);
	}
</script>

<div class="flex justify-between pb-3">
	<Button>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>

	<div class="flex gap-3">
		{#if canShowDepartment}
			<FilterDropdown
				options={departmentOptions}
				value={selectedDepartment}
				onValueChange={selectDepartment}
			/>
		{/if}

		<FilterDropdown
			options={categoryOptions}
			value={selectedCategory}
			onValueChange={selectCategory}
		/>
	</div>
</div>

<StyledTable headers={tableHeaders}>
	{#if data.applications && data.applications.length > 0}
		{#each data.applications as application}
			<tr
				class="cursor-pointer"
				onclick={() => goToDetail(application.id)}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						goToDetail(application.id);
					}
				}}
				tabindex="0"
			>
				<td
					><UserAvatar
						name={application.user.name}
						email={application.user.email}
						profilePath={application.user.profile_path}
						fallbackImage={profile}
					/>
				</td>
				{#if canShowDepartment}
					<td>{application.user.department}</td>
				{/if}
				{#if canShowFaculty}
					<td>{application.user.faculty}</td>
				{/if}
				<td>{application.round.academic_year_th}</td>
				<td>{application.round.semester_th}</td>
				<td>{application.category.name}</td>
				<td>{application.submitted_at}</td>
				<!-- <td>{application.status_th}</td> -->
			</tr>
		{/each}
	{:else}
		<tr class="no-hover h-24">
			<td colspan={tableHeaders.length} class="px-20 text-center text-neutral-500">ไม่มีข้อมูล</td>
		</tr>
	{/if}
</StyledTable>
