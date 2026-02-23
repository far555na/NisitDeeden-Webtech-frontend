<script>
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import Icon from '@iconify/svelte';

	let open = false;
</script>

<div class="flex justify-between pb-3">
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
</div>

<StyledTable headers={['ลำดับ', 'ปีการศึกษา', 'ประเภท', 'ผู้เสนอ', 'ผลการพิจารณา']}>
	<tr>
		<td>4</td>
		<td>2569</td>
		<td>ด้านความคิดสร้างสรรค์และนวัตกรรม</td>
		<td>จอร์น โคว</td>
		<td>-</td>
		<td>
			<div class="flex justify-end">
				<Button variant="filled" type="button">
					<Icon slot="left" icon="mdi:magnify" class="text-neutral-950" width="24" />
					<div class="text-neutral-950">ตรวจสอบ</div>
				</Button>
			</div>
		</td>
	</tr>

	<tr>
		<td>3</td>
		<td>2569</td>
		<td>ด้านความคิดสร้างสรรค์และนวัตกรรม</td>
		<td>จอร์น โคว</td>
		<td>-</td>
		<td>
			<div class="flex justify-end">
				<Button variant="filled" type="button">
					<Icon slot="left" icon="mdi:magnify" class="text-neutral-950" width="24" />
					<div class="text-neutral-950">ตรวจสอบ</div>
				</Button>
			</div>
		</td>
	</tr>

	<tr>
		<td>2</td>
		<td>2568</td>
		<td>ด้านความประพฤติดี</td>
		<td>เจน โคว</td>
		<td class="text-green-500">เห็นชอบ</td>
		<td>
			<div class="flex justify-end">
				<Button variant="filled" type="button">
					<Icon slot="left" icon="mdi:magnify" class="text-neutral-950" width="24" />
					<div class="text-neutral-950">ตรวจสอบ</div>
				</Button>
			</div>
		</td>
	</tr>

	<tr>
		<td>1</td>
		<td>2568</td>
		<td>ด้านกิจกรรมเสริมหลักสูตร</td>
		<td>ฉัตรชัย โชติสวัสดิ์</td>
		<td class="text-red-500">ไม่เห็นชอบ</td>
		<td>
			<div class="flex justify-end">
				<Button variant="filled" type="button">
					<Icon slot="left" icon="mdi:magnify" class="text-neutral-950" width="24" />
					<div class="text-neutral-950">ตรวจสอบ</div>
				</Button>
			</div>
		</td>
	</tr>
</StyledTable>
