<script>
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import Icon from '@iconify/svelte';
	import profile from '$lib/assets/background.png';
	import Pagination from '$lib/components/Pagination.svelte';
	import { goto } from '$app/navigation';

	const { data } = $props();

    function nextPage() {
		goto(`/admin/applications-list-page?page=${data.meta.current_page + 1}`);
	}

	function prevPage() {
		goto(`/admin/applications-list-page?page=${data.meta.current_page - 1}`);
	}
</script>

<div class="flex justify-between pb-3">
	<Button>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>
</div>

<StyledTable headers={['ลำดับ', 'ผู้ส่งใบสมัคร', 'ประเภท', 'ผลการพิจารณา', 'วันที่ยื่นใบสมัคร']}>
	{#each data.applications as application}
		<tr>
			<td>{application.id}</td>
			<td
				><UserAvatar
					name={application.user.name}
					email={application.user.email}
					profilePath={application.user.profile_path}
					fallbackImage={profile}
				/>
			</td>
			<td>
				{application.category.slug}
			</td>
			<td>
				{application.status}
			</td>
			<td>
				{application.submitted_at}
			</td>
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
</StyledTable>

<Pagination
	currentPage={data.meta.current_page}
	lastPage={data.meta.last_page}
	hasPrev={!!data.links.prev}
	hasNext={!!data.links.next}
	onPrev={prevPage}
	onNext={nextPage}
/>
