<script>
	import Button from '$lib/components/Button.svelte';
	import StyledTable from '$lib/components/StyledTable.svelte';
	import Icon from '@iconify/svelte';
</script>

<div class="flex justify-between pb-3">
	<Button>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>
</div>

<StyledTable headers={['ปีการศึกษา', 'ประเภท', 'สถานะ', 'ผลการพิจารณา']}>
	<tr>
		<td>2569</td>
		<td>ด้านความคิดสร้างสรรค์และนวัตกรรม</td>
		<td>เสนอคณบดี</td>
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
		<td>2568</td>
		<td>ด้านความประพฤติดี</td>
		<td>เสร็จสิ้นแล้ว</td>
		<td>เห็นชอบ</td>
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
		<td>2568</td>
		<td>ด้านกิจกรรมเสริมหลักสูตร</td>
		<td>เสร็จสิ้นแล้ว</td>
		<td>ไม่เห็นชอบ</td>
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
