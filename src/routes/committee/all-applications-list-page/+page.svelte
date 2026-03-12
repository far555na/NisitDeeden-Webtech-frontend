<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import Icon from '@iconify/svelte';
	import profile from '$lib/assets/background.png';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';
	import { getStorageUrl } from '$lib/profile';
	import CategoryBadge from '$lib/components/CategoryBadge.svelte';
	import {
		getApplicationStatusColor,
		getApplicationStatusLabel
	} from '$lib/types/application-status';

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

	type Faculty = {
		name: string;
		value: string;
		label: string;
	};

	let openDropdown = $state<string | null>(null);

	function toggleDropdown(name: string) {
		openDropdown = openDropdown === name ? null : name;
	}

	function closeDropdown() {
		openDropdown = null;
	}

	const canShowDepartment = $derived(
		data.user?.position === 'associate_dean' ||
			data.user?.position === 'dean' ||
			data.user?.position === 'committee_member'
	);

	const canShowFaculty = $derived(data.user?.position === 'committee_member');

	const tableHeaders = $derived([
		'ผู้ส่งใบสมัคร',
		'ปีการศึกษา',
		'เทอม',
		'ประเภท',
		...(canShowFaculty ? ['คณะ'] : []),
		...(canShowDepartment ? ['ภาควิชา'] : []),
		'สถานะ'
	]);

	const categories = $derived(data.categories);
	const departments = $derived(data.departments);
	const faculties = $derived(data.faculties);

	let selectedCategory = $derived(data.selectedCategoryId ?? 'all');
	let selectedDepartment = $derived(data.selectedDepartment ?? 'all');
	let selectedFaculty = $derived(data.selectedFaculty ?? 'all');

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
			: data.user?.position === 'committee_member' && selectedFaculty !== 'all'
				? departments.filter(
						(department: Department) => department.faculty.value === selectedFaculty
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

	const facultyOptions = $derived([
		{ label: 'คณะทั้งหมด', value: 'all' },
		...faculties.map((faculty: Faculty) => ({
			label: faculty.label,
			value: faculty.value
		}))
	]);

	function updateFilters(category: string, department: string, faculty: string) {
		const params = new URLSearchParams();

		if (category !== 'all') {
			params.set('category_id', category);
		}

		if (faculty !== 'all' && canShowFaculty) {
			params.set('faculty', faculty);
		}

		if (department !== 'all' && canShowDepartment) {
			params.set('department', department);
		}

		const query = params.toString();
		goto(`/committee/all-applications-list-page${query ? `?${query}` : ''}`);
	}

	function selectCategory(value: string) {
		selectedCategory = value;
		updateFilters(value, selectedDepartment, selectedFaculty);
	}

	function selectDepartment(value: string) {
		selectedDepartment = value;
		updateFilters(selectedCategory, value, selectedFaculty);
	}

	function selectFaculty(value: string) {
		selectedFaculty = value;
		selectedDepartment = 'all';
		updateFilters(selectedCategory, 'all', value);
	}

	function goToDetail(id: number) {
		goto(`/committee/application-detail-page/${id}`);
	}
</script>

<div class="flex justify-end pb-3">
	<div class="flex gap-3">
		{#if canShowFaculty}
			<FilterDropdown
				options={facultyOptions}
				value={selectedFaculty}
				isOpen={openDropdown === 'faculty'}
				onToggle={() => toggleDropdown('faculty')}
				onClose={closeDropdown}
				onValueChange={selectFaculty}
			/>
		{/if}

		{#if canShowDepartment}
			<FilterDropdown
				options={departmentOptions}
				value={selectedDepartment}
				isOpen={openDropdown === 'department'}
				onToggle={() => toggleDropdown('department')}
				onClose={closeDropdown}
				onValueChange={selectDepartment}
			/>
		{/if}

		<FilterDropdown
			options={categoryOptions}
			value={selectedCategory}
			isOpen={openDropdown === 'category'}
			onToggle={() => toggleDropdown('category')}
			onClose={closeDropdown}
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
						profileURL={getStorageUrl(application.user.profile_url)}
					/>
				</td>

				<td>{application.round.academic_year_th}</td>
				<td>{application.round.semester_th}</td>
				<td>
					<CategoryBadge name={application.category.name} icon={application.category.icon} />
				</td>
				{#if canShowFaculty}
					<td>{application.user.faculty_th}</td>
				{/if}
				{#if canShowDepartment}
					<td>{application.user.department_th}</td>
				{/if}
				<!-- <td>{application.submitted_at}</td> -->
				<td>
					<span class={`font-semibold ${getApplicationStatusColor(application.status)}`}>
						{application.status_th}
					</span>
				</td>
			</tr>
		{/each}
	{:else}
		<tr class="no-hover h-24">
			<td colspan={tableHeaders.length} class="px-20 text-center text-neutral-500">ไม่มีข้อมูล</td>
		</tr>
	{/if}
</StyledTable>
