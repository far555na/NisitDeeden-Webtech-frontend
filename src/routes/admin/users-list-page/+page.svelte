<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';
	import { getStorageUrl } from '$lib/profile.js';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	type Faculty = {
		name: string;
		value: string;
		label: string;
	};

	type Department = {
		name: string;
		value: string;
		label: string;
		faculty?: {
			name: string;
			value: string;
			label: string;
		};
	};

	type Position = {
		name: string;
		value: string;
		label: string;
		role?: string;
	};

	let openDropdown = $state<string | null>(null);

	function toggleDropdown(name: string) {
		openDropdown = openDropdown === name ? null : name;
	}

	function closeDropdown() {
		openDropdown = null;
	}

	let searchText = $state(data.filters?.q ?? '');
	let selectedPosition = $state(data.filters?.position || 'all');
	let selectedFaculty = $state(data.filters?.faculty || 'all');
	let selectedDepartment = $state(data.filters?.department || 'all');

	let selectedUser = $state(data.users?.[0] ?? null);

	$effect(() => {
		selectedUser = data.users?.[0] ?? null;
	});

	const faculties = data.faculties ?? [];
	const departments = data.departments ?? [];
	const positions = data.positions ?? [];

	const positionOptions = [
		{ label: 'บทบาททั้งหมด', value: 'all' },
		...positions.map((position: Position) => ({
			label: position.label,
			value: position.value
		}))
	];

	const facultyOptions = [
		{ label: 'คณะทั้งหมด', value: 'all' },
		...faculties.map((faculty: Faculty) => ({
			label: faculty.label,
			value: faculty.value
		}))
	];

	const filteredDepartments = $derived(
		selectedFaculty !== 'all'
			? departments.filter(
					(department: Department) => department.faculty?.value === selectedFaculty
				)
			: []
	);

	const departmentOptions = $derived([
		{ label: 'ภาควิชาทั้งหมด', value: 'all' },
		...filteredDepartments.map((department: Department) => ({
			label: department.label,
			value: department.value
		}))
	]);

	const isDepartmentDisabled = $derived(selectedFaculty === 'all');

	$effect(() => {
		if (selectedFaculty === 'all') {
			selectedDepartment = 'all';
			return;
		}

		if (
			selectedDepartment !== 'all' &&
			!filteredDepartments.some(
				(department: Department) => department.value === selectedDepartment
			)
		) {
			selectedDepartment = 'all';
		}
	});

	function buildQuery(pageNumber = '1') {
		const params = new URLSearchParams();

		if (searchText.trim()) {
			params.set('q', searchText.trim());
		} else {
			params.delete('q');
		}

		if (selectedPosition !== 'all') {
			params.set('position', selectedPosition);
		} else {
			params.delete('position');
		}

		if (selectedFaculty !== 'all') {
			params.set('faculty', selectedFaculty);
		} else {
			params.delete('faculty');
		}

		if (selectedDepartment !== 'all') {
			params.set('department', selectedDepartment);
		} else {
			params.delete('department');
		}

		params.set('page', pageNumber);

		return params.toString();
	}

	function updateFilters(pageNumber = '1') {
		goto(`/admin/users-list-page?${buildQuery(pageNumber)}`, {
			keepFocus: true,
			replaceState: true,
			noScroll: true
		});
	}

	let searchTimeout: ReturnType<typeof setTimeout>;

	function handleSearchInput(e: Event) {
		searchText = (e.currentTarget as HTMLInputElement).value;

		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			updateFilters('1');
		}, 300);
	}

	function handleSearchKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			clearTimeout(searchTimeout);
			updateFilters('1');
		}
	}

	function selectPosition(value: string) {
		selectedPosition = value;
		updateFilters('1');
	}

	function selectFaculty(value: string) {
		selectedFaculty = value;
		selectedDepartment = 'all';
		updateFilters('1');
	}

	function selectDepartment(value: string) {
		selectedDepartment = value;
		updateFilters('1');
	}

	function nextPage() {
		updateFilters(String(data.meta.current_page + 1));
	}

	function prevPage() {
		updateFilters(String(data.meta.current_page - 1));
	}

	function goToCreate() {
		goto(`/admin/user-form-page`);
	}

	function goToEdit(id: number) {
		goto(`/admin/user-form-page/${id}`);
	}

	function selectUser(user: any) {
		selectedUser = user;
	}

	
</script>

<div class="mb-5 flex items-start justify-between gap-4">
	<div>
		<h1 class="text-3xl font-bold text-neutral-900">รายการผู้ใช้งาน</h1>
		<p class="mt-1 text-sm text-neutral-500">จัดการข้อมูลผู้ใช้งานทั้งหมด</p>
	</div>

	<Button variant="filled" class="px-10" onclick={goToCreate} buttonClass="bg-primary text-white">
		<Icon slot="left" icon="mdi:plus" class="text-white" width="24" />
		เพิ่มผู้ใช้งาน
	</Button>
</div>

<div class="mb-5 flex flex-wrap gap-3">
	<div class="min-w-[260px] flex-1">
		<div class="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3">
			<Icon icon="mdi:magnify" width="20" class="text-neutral-400" />
			<input
				type="text"
				value={searchText}
				oninput={handleSearchInput}
				onkeydown={handleSearchKeydown}
				placeholder="ค้นหาชื่อ รหัสนิสิต หรืออีเมล"
				class="w-full bg-transparent outline-none"
			/>
		</div>
	</div>

	<FilterDropdown
		options={positionOptions}
		value={selectedPosition}
		isOpen={openDropdown === 'position'}
		onToggle={() => toggleDropdown('position')}
		onClose={closeDropdown}
		onValueChange={selectPosition}
	/>

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
		disabled={isDepartmentDisabled}
	/>
</div>

<div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
	<div class="min-w-0">
		<StyledTable headers={['ผู้ใช้', 'รหัสประจำตัว', 'บทบาท', 'คณะ', 'ภาควิชา']}>
			{#if data.users && data.users.length > 0}
				{#each data.users as user}
					<tr
						class:selected-row={selectedUser?.id === user.id}
						class="cursor-pointer transition-colors"
						onclick={() => selectUser(user)}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') selectUser(user);
						}}
					>
						<td>
							<UserAvatar
								name={user.name}
								email={user.email}
								profileURL={getStorageUrl(user.profile_url)}
							/>
						</td>
						<td>{user.university_id ?? '-'}</td>
						<td>{user.position_th ?? '-'}</td>
						<td>{user.faculty_th ?? '-'}</td>
						<td>{user.department_th ?? '-'}</td>
					</tr>
				{/each}
			{:else}
				<tr class="no-hover h-24">
					<td colspan="5" class="px-20 text-center text-neutral-500">ไม่มีข้อมูล</td>
				</tr>
			{/if}
		</StyledTable>

		<div class="mt-4">
			<Pagination
				currentPage={data.meta.current_page}
				lastPage={data.meta.last_page}
				hasPrev={!!data.links.prev}
				hasNext={!!data.links.next}
				onPrev={prevPage}
				onNext={nextPage}
			/>
		</div>
	</div>

	<div class="h-fit rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
		{#if form?.message}
			<div class="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
				{form.message}
			</div>
		{/if}

		{#if selectedUser}
			<div class="flex flex-col items-center border-b border-neutral-200 pb-5 text-center">
				<img
					src={getStorageUrl(selectedUser.profile_url)}
					alt={selectedUser.name}
					class="mb-4 h-24 w-24 rounded-full object-cover"
				/>

				<h2 class="text-xl font-bold text-neutral-900">{selectedUser.name}</h2>
				<p class="mt-1 text-sm text-neutral-500">{selectedUser.email}</p>

				<div class="mt-4 flex gap-2">
					<Button variant="filled" type="button" onclick={() => goToEdit(selectedUser.id)}>
						<div class="text-neutral-950">แก้ไข</div>
					</Button>

					<form method="POST" action="?/deleteUser">
						<input type="hidden" name="id" value={selectedUser.id} />
						<Button variant="filled" type="submit">
							<div class="text-neutral-950">ลบ</div>
						</Button>
					</form>
				</div>
			</div>

			<div class="mt-5 space-y-4">
				<div>
					<p class="text-sm text-neutral-400">รหัสประจำตัว</p>
					<p class="font-medium text-neutral-900">{selectedUser.university_id ?? '-'}</p>
				</div>

				<div>
					<p class="text-sm text-neutral-400">บทบาท</p>
					<p class="font-medium text-neutral-900">{selectedUser.position_th ?? '-'}</p>
				</div>

				<div>
					<p class="text-sm text-neutral-400">คณะ</p>
					<p class="font-medium text-neutral-900">{selectedUser.faculty_th ?? '-'}</p>
				</div>

				<div>
					<p class="text-sm text-neutral-400">ภาควิชา</p>
					<p class="font-medium text-neutral-900">{selectedUser.department_th ?? '-'}</p>
				</div>

				<div>
					<p class="text-sm text-neutral-400">วิทยาเขต</p>
					<p class="font-medium text-neutral-900">{selectedUser.domain_th ?? '-'}</p>
				</div>
			</div>
		{:else}
			<div class="flex min-h-[240px] items-center justify-center text-neutral-400">
				กรุณาเลือกผู้ใช้งาน
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.selected-row) {
		background-color: rgb(245 245 245);
	}
</style>