<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import Icon from '@iconify/svelte';
	import profile from '$lib/assets/background.png';

	const { data } = $props();

	function goToDetail(id: number) {
		goto(`/committee/application-detail-page/${id}`);
	}

	// let open = false;
</script>

<!-- <div class="flex justify-between pb-3">
	<Button>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>

	<div class="relative inline-block">
		<Button variant="outline"  on:click={() => (open = !open)}>
			ย้อนกลับ
			<Icon slot="right" icon="mdi:chevron-down" class="text-primary" width="24" />
		</Button>

		{#if open}
			<ul class="absolute mt-2 min-w-[180px] rounded-lg border bg-white p-1.5 shadow-lg">
				<li class="cursor-pointer p-3 hover:bg-slate-100">Menu Item 1</li>
				<li class="cursor-pointer p-3 hover:bg-slate-100">Menu Item 2</li>
				<li class="cursor-pointer p-3 hover:bg-slate-100">Menu Item 3</li>
			</ul>
		{/if}
	</div>
</div> -->

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
