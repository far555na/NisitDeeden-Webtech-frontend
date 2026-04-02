<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import Icon from '@iconify/svelte';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import CategoryBadge from '$lib/components/CategoryBadge.svelte';
	import { getStorageUrl } from '$lib/profile.js';
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

	const tableHeaders = [
		'ผู้ส่งใบสมัคร',
		'ปีการศึกษา',
		'เทอม',
		'ประเภท',
		'คณะ',
		'ภาควิชา',
		'สถานะ'
	];

	const categories = data.categories ?? [];
	const departments = data.departments ?? [];
	const faculties = data.faculties ?? [];

	let selectedCategory = $state(data.selectedCategoryId ?? 'all');
	let selectedDepartment = $state(data.selectedDepartment ?? 'all');
	let selectedFaculty = $state(data.selectedFaculty ?? 'all');

	const categoryOptions = [
		{ label: 'ประเภททั้งหมด', value: 'all' },
		...categories.map((category: any) => ({
			label: category.name,
			value: String(category.id)
		}))
	];

	const facultyOptions = [
		{ label: 'คณะทั้งหมด', value: 'all' },
		...faculties.map((faculty: Faculty) => ({
			label: faculty.label,
			value: faculty.value
		}))
	];

	const filteredDepartments =
		selectedFaculty !== 'all'
			? departments.filter((department: Department) => department.faculty.value === selectedFaculty)
			: departments;

	const departmentOptions = [
		{ label: 'ภาควิชาทั้งหมด', value: 'all' },
		...filteredDepartments.map((department: Department) => ({
			label: department.label,
			value: department.value
		}))
	];

	function buildQuery(page = '1') {
		const params = new URLSearchParams();

		if (selectedCategory !== 'all') {
			params.set('category_id', selectedCategory);
		}

		if (selectedFaculty !== 'all') {
			params.set('faculty', selectedFaculty);
		}

		if (selectedDepartment !== 'all') {
			params.set('department', selectedDepartment);
		}

		params.set('page', page);

		return params.toString();
	}

	function updateFilters() {
		goto(`/admin/applications-list-page?${buildQuery('1')}`);
	}

	function selectCategory(value: string) {
		selectedCategory = value;
		updateFilters();
	}

	function selectDepartment(value: string) {
		selectedDepartment = value;
		updateFilters();
	}

	function selectFaculty(value: string) {
		selectedFaculty = value;
		selectedDepartment = 'all';
		updateFilters();
	}

	function goBack() {
		history.back();
	}

	function goToDetail(id: number) {
		goto(`/admin/application-detail-page/${id}`);
	}

	function nextPage() {
		goto(`/admin/applications-list-page?${buildQuery(String(data.meta.current_page + 1))}`);
	}

	function prevPage() {
		goto(`/admin/applications-list-page?${buildQuery(String(data.meta.current_page - 1))}`);
	}
</script>

<div class="mb-5 flex items-start justify-between gap-4">
	<div>
		<h1 class="text-3xl font-bold text-neutral-900">รายการใบสมัครทั้งหมด</h1>
		<p class="mt-1 text-sm text-neutral-500">แสดงใบสมัครทั้งหมด</p>
	</div>

	<div class="flex gap-3">
		<FilterDropdown
			options={facultyOptions}
			value={selectedFaculty}
			isOpen={openDropdown === 'faculty'}
			onToggle={() => toggleDropdown('faculty')}
			onClose={closeDropdown}
			onValueChange={selectFaculty}
		/>

		<FilterDropdown
			options={departmentOptions}
			value={selectedDepartment}
			isOpen={openDropdown === 'department'}
			onToggle={() => toggleDropdown('department')}
			onClose={closeDropdown}
			onValueChange={selectDepartment}
		/>

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
				<td>
					<UserAvatar
						name={application.user?.name}
						email={application.user?.email}
						profileURL={getStorageUrl(application.user?.profile_url)}
					/>
				</td>

				<td>{application.round?.academic_year_th ?? '-'}</td>
				<td>{application.round?.semester_th ?? '-'}</td>

				<td>
					<CategoryBadge
						name={application.category?.name ?? '-'}
						icon={application.category?.icon ?? 'mdi:file-document-outline'}
					/>
				</td>

				<td>{application.user?.faculty_th ?? '-'}</td>
				<td>{application.user?.department_th ?? '-'}</td>

				<td>
					<span class={`font-semibold ${getApplicationStatusColor(application.status)}`}>
						{application.status_th ?? getApplicationStatusLabel(application.status)}
					</span>
				</td>
			</tr>
		{/each}
	{:else}
		<tr class="no-hover h-[50vh]">
			<td colspan={tableHeaders.length} class="px-20 text-center text-neutral-500">
				ไม่มีข้อมูล
			</td>
		</tr>
	{/if}
</StyledTable>

<Pagination
	currentPage={data.meta.current_page}
	lastPage={data.meta.last_page}
	hasPrev={!!data.links.prev}
	hasNext={!!data.links.next}
	onPrev={prevPage}
	onNext={nextPage}
/>