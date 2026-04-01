<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import Icon from '@iconify/svelte';
	import profile from '$lib/assets/background.png';
	import { goto } from '$app/navigation';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { getStorageUrl } from '$lib/profile.js';

	const { data } = $props();

	function nextPage() {
		goto(`/admin/users-list-page?page=${data.meta.current_page + 1}`);
	}

	function prevPage() {
		goto(`/admin/users-list-page?page=${data.meta.current_page - 1}`);
	}

	function goToCreate() {
		goto(`/admin/user-form-page`);
	}

	function goToEdit(id: number) {
		goto(`/admin/user-form-page/${id}`);
	}
</script>

<div class="flex justify-between pb-3">
	<Button variant="filled" class="px-10" onclick={goToCreate} buttonClass="bg-primary text-white">
		<Icon slot="left" icon="mdi:plus" class="text-white" width="24" />
		เพิ่มผู้ใช้งาน
	</Button>
</div>

<StyledTable headers={['ผู้ใช้', 'รหัสประจำตัว', 'บทบาท', 'คณะ', 'ภาควิชา', '']}>
	{#if data.users && data.users.length > 0}
		{#each data.users as user}
			<tr>
				<td>
					<UserAvatar
						name={user.name}
						email={user.email}
						profileURL={getStorageUrl(user.profile_url)}
					/>
				</td>
				<td>{user.university_id}</td>
				<td>{user.position_th}</td>
				<td>{user.faculty_th ?? '-'}</td>
				<td>{user.department_th ?? '-'}</td>
				<td>
					<div class="flex justify-end gap-2">
						<div
							role="presentation"
							onclick={(e) => e.stopPropagation()}
							onkeydown={(e) => e.stopPropagation()}
						>
							<Button variant="filled" type="button" onclick={() => goToEdit(user.id)}>
								<div class="text-neutral-950">แก้ไข</div>
							</Button>
						</div>

						<div
							role="presentation"
							onclick={(e) => e.stopPropagation()}
							onkeydown={(e) => e.stopPropagation()}
						>
							<form method="POST" action="?/deleteApplication">
								<input type="hidden" name="id" value={user.id} />
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
			<td colspan="4" class="px-20 text-center text-neutral-500">ไม่มีข้อมูล</td>
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
