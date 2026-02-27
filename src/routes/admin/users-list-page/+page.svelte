<script>
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import Icon from '@iconify/svelte';
	import profile from '$lib/assets/background.png';
	import { goto } from '$app/navigation';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

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
					<UserAvatar
						name={user.name}
						email={user.email}
						profilePath={user.profile_path}
						fallbackImage={profile}
					/>
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

<Pagination
	currentPage={data.meta.current_page}
	lastPage={data.meta.last_page}
	hasPrev={!!data.links.prev}
	hasNext={!!data.links.next}
	onPrev={prevPage}
	onNext={nextPage}
/>