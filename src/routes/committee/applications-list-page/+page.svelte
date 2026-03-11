<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import Icon from '@iconify/svelte';
	import profile from '$lib/assets/background.png';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';

	let { data }: { data: any } = $props();

	const categories = $derived(data.categories);
	const applications = $derived(data.applications);

	let selectedCategory = $derived(data.selectedCategoryId ?? 'all');

	const categoryOptions = $derived([
		{ label: 'ทั้งหมด', value: 'all' },
		...categories.map((category: any) => ({
			label: category.name,
			value: String(category.id)
		}))
	]);

	function selectCategory(value: string) {
		selectedCategory = value;

		goto(
			value === 'all'
				? '/committee/applications-list-page'
				: `/committee/applications-list-page?category_id=${value}`
		);
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

	<FilterDropdown
		options={categoryOptions}
		value={selectedCategory}
		onValueChange={selectCategory}
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
				<td>{application.round.academic_year_th}</td>
				<td>{application.round.semester_th}</td>
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
