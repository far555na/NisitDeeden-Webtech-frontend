<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { getStorageUrl } from '$lib/profile.js';
	import type { PageProps } from './$types';
	import { getUserPositionLabel } from '$lib/types/user-position';

	let { data }: PageProps = $props();

	let selectedUser = $state(data.users?.[0] ?? null);

	$effect(() => {
		selectedUser = data.users?.[0] ?? null;
	});

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

	function selectUser(user: any) {
		selectedUser = user;
	}
</script>

<div class="flex justify-between pb-3">
	<Button variant="filled" class="px-10" onclick={goToCreate} buttonClass="bg-primary text-white">
		<Icon slot="left" icon="mdi:plus" class="text-white" width="24" />
		เพิ่มผู้ใช้งาน
	</Button>
</div>

<div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
	<!-- Left: table -->
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
						<td>{user.university_id}</td>
						<td>{user.position_th}</td>
						<td>{user.faculty_th ?? '-'}</td>
						<td>{user.department_th ?? '-'}</td>
						<!-- <td>
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
						</td> -->
					</tr>
				{/each}
			{:else}
				<tr class="no-hover h-24">
					<td colspan="6" class="px-20 text-center text-neutral-500">ไม่มีข้อมูล</td>
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

	<!-- Right: detail panel -->
	<div class="h-fit rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
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
						<div class="text-neutral-950">แก้ไขข้อมูล</div>
					</Button>
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