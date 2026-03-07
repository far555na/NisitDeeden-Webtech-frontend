<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import Icon from '@iconify/svelte';
	import profile from '$lib/assets/background.png';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';

	const { data } = $props();

	// console.log('data =', data);
	// console.log('applications =', data.applications);

	function goToDetail(id: number) {
		goto(`/committee/application-detail-page/${id}`);
	}

	let open = $state(false);
	let selectedFilter = $state('all');

	const filterOptions = [
		{ label: 'ทั้งหมด', value: 'all' },
		{ label: 'รอดำเนินการ', value: 'pending' },
		{ label: 'เห็นชอบ', value: 'approved' },
		{ label: 'ไม่เห็นชอบ', value: 'rejected' }
	];

	function selectFilter(value: string) {
		selectedFilter = value;
		open = false;
	}

	const filteredApplications = $derived(
		selectedFilter === 'all'
			? data.applications
			: data.applications.filter((application: any) => {
					const status = application.status?.toLowerCase?.() ?? '';

					if (selectedFilter === 'pending') return status.includes('pending');
					if (selectedFilter === 'approved') return status.includes('approved');
					if (selectedFilter === 'rejected') return status.includes('rejected');

					return true;
				})
	);

	const selectedLabel = $derived(
		filterOptions.find((option) => option.value === selectedFilter)?.label ?? 'ทั้งหมด'
	);
</script>

<div class="flex justify-between pb-3">
	<Button>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>

	<FilterDropdown
		options={filterOptions}
		value={selectedFilter}
		onSelect={(value) => (selectedFilter = value)}
	/>
</div>

<StyledTable headers={['ผู้ส่งใบสมัคร', 'ปีการศึกษา', 'เทอม', 'ประเภท', 'วันที่ส่ง', 'สถานะ']}>
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
				<td>{application.round.academic_year}</td>
				<td>{application.round.semester}</td>
				<td>{application.category.name}</td>
				<td>{application.submitted_at}</td>
				<td>{application.status_th}</td>
			</tr>
		{/each}
	{:else}
		<tr class="no-hover h-24">
			<td colspan="6" class="px-20 text-center text-neutral-500">ไม่มีข้อมูล</td>
		</tr>
	{/if}
</StyledTable>
