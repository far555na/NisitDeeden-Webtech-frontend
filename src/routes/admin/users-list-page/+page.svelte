<script>
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import Icon from '@iconify/svelte';
	import profile from '$lib/assets/background.png';
	import { goto } from '$app/navigation';

	let open = false;
	const { data } = $props();

	function nextPage() {
		goto(`/admin/users-list-page?page=${data.meta.current_page + 1}`);
	}

    function prevPage() {
		goto(`/admin/users-list-page?page=${data.meta.current_page - 1}`);
	}
</script>

<!-- <div class="flex justify-between pb-3">
	<Button>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>
</div> -->

<StyledTable headers={['ผู้ใช้', 'รหัสประจำตัว', 'บทบาท']}>
	{#if data.users && data.users.length > 0}
		{#each data.users as user}
			<tr>
				<td>
					<div class="flex items-center gap-3">
						<img
							class="h-10 w-10 rounded-full"
							src={// user.profile_path
							// 	? `http://localhost:8000/storage/${user.profile_path}`
							// 	:
							`${profile}`}
							alt={user.name}
						/>

						<div class="flex flex-col">
							<span>{user.name}</span>
							<span class="text-xs text-neutral-500">{user.email}</span>
						</div>
					</div>
				</td>
				<td>{user.university_id}</td>
				<td>{user.role}</td>
				<td>
					<div class="flex justify-end">
						<Button variant="filled" type="button">
							<Icon slot="left" icon="mdi:magnify" class="text-neutral-950" width="24" />
							<div class="text-neutral-950">ตรวจสอบ</div>
						</Button>
					</div>
				</td>
			</tr>
		{/each}
	{:else}
		<tr>
			<td colspan="5" class="py-6 text-center text-neutral-500">ไม่พบข้อมูลผู้ใช้</td>
		</tr>
	{/if}
</StyledTable>

<div class="flex justify-center items-center gap-5 pt-5">
	{#if data.links.prev}
		<Button variant="outline" onclick={prevPage}>
			<Icon slot="left" icon="mdi:chevron-double-left" width="16" />
			<span class="text-sm">ย้อนกลับ</span>
		</Button>
	{:else}
		<Button variant="outline" disabled>
			<Icon slot="left" icon="mdi:chevron-double-left" width="16" />
			<span class="text-sm">ย้อนกลับ</span>
		</Button>
	{/if}

    <span class="text-primary">
        หน้า {data.meta.current_page} / {data.meta.last_page} 
    </span>

	{#if data.links.next}
		<Button variant="outline" onclick={nextPage}>
			<Icon slot="right" icon="mdi:chevron-double-right" width="16" />
			<span class="text-sm">ถัดไป</span>
		</Button>
	{:else}
		<Button variant="outline" disabled>
			<Icon slot="right" icon="mdi:chevron-double-right" width="16" />
			<span class="text-sm">ถัดไป</span>
		</Button>
	{/if}
</div>
