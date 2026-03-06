<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
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
	<Button on:click={back}>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>
</div>

<StyledTable headers={['ปีการศึกษา', 'เทอม', 'ประเภท', 'วันที่ส่ง', 'สถานะ']}>
	{#if data.applications && data.applications.length > 0}
		{#each data.applications as application}
			<tr class="cursor-pointer" on:click={() => goToDetail(application.id)}>
				<td>{application.round.academic_year}</td>
				<td>{application.round.semester}</td>
				<td>{application.category.name}</td>
				<td>{application.submitted_at}</td>
				<td>{application.status_th}</td>
				<td>
					<div class="flex justify-end gap-2">
						<div on:click|stopPropagation>
							<Button variant="filled" type="button" on:click={() => goToEdit(application.id)}>
								<!-- <Icon slot="left" icon="mdi:magnify" class="text-neutral-950" width="24" /> -->
								<div class="text-neutral-950">แก้ไข</div>
							</Button>
						</div>

						<div on:click|stopPropagation>
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
