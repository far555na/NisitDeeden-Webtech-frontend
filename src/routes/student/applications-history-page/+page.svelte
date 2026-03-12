<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import CategoryBadge from '$lib/components/CategoryBadge.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import { getApplicationStatusColor } from '$lib/types/application-status.js';
	import Icon from '@iconify/svelte';

	const { data } = $props();

	function goToDetail(id: number) {
		goto(`/student/application-detail-page/${id}`);
	}

	function goToEdit(id: number) {
		goto(`/student/application-detail-page/${id}/edit`);
	}

	function back() {
		goto(`/student/homepage`);
	}
</script>

<div class="flex justify-between pb-3">
	<Button onclick={back}>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>
</div>

<StyledTable headers={['ปีการศึกษา', 'เทอม', 'ประเภท', 'วันที่ส่ง', 'สถานะ', '']}>
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
				<td>{application.round.academic_year_th}</td>
				<td>{application.round.semester_th}</td>
				<td><CategoryBadge name={application.category.name} icon={application.category.icon} /></td>
				<td>{application.submitted_at}</td>
				<td>
					<span
						class={`font-semibold ${getApplicationStatusColor(application.status)}`}
					>
						{application.status_th}
					</span>
				</td>
				<td>
					<div class="flex justify-end gap-2">
						<div
							role="presentation"
							onclick={(e) => e.stopPropagation()}
							onkeydown={(e) => e.stopPropagation()}
						>
							<Button variant="filled" type="button" onclick={() => goToEdit(application.id)}>
								<div class="text-neutral-950">แก้ไข</div>
							</Button>
						</div>

						<div
							role="presentation"
							onclick={(e) => e.stopPropagation()}
							onkeydown={(e) => e.stopPropagation()}
						>
							<form method="POST" action="?/deleteApplication">
								<input type="hidden" name="id" value={application.id} />
								<Button variant="filled" type="submit">
									<div class="text-neutral-950">ลบ</div>
								</Button>
							</form>
						</div>
					</div>
				</td>
			</tr>
		{/each}
	{:else}
		<tr class="no-hover h-24">
			<td colspan="6" class="px-20 text-center text-neutral-500">ไม่มีข้อมูล</td>
		</tr>
	{/if}
</StyledTable>
