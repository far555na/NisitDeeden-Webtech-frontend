<script>
	import Button from '$lib/components/Button.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';
	import UploadCard from '$lib/components/UploadCard.svelte';
	import Icon from '@iconify/svelte';
</script>

<div class="flex justify-between pb-7">
	<Button>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>

	<StepProgress step={3} />

	<a href="application-detail-page">
		<Button variant="outline">
			ถัดไป
			<Icon slot="right" icon="mdi:arrow-right" class="text-primary" width="24" />
		</Button>
	</a>
</div>

<p class="text-primary pb-7 text-3xl font-bold">ประเภท: ด้านกิจกรรมเสริมหลักสูตร</p>

<div class="pb-5 text-2xl font-semibold">เอกสาร</div>

<div class="flex flex-col gap-5">
	<UploadCard
		title="สำเนาบัตรนิสิต"
		icon="mdi:file-outline"
		buttonText="อัปโหลด"
		buttonIcon="mdi:tray-arrow-up"
		onUpload={() => {}}
	/>
	<UploadCard
		title="ใบรายงานคะแนน (เกรด)"
		icon="mdi:file-outline"
		buttonText="อัปโหลด"
		buttonIcon="mdi:tray-arrow-up"
		onUpload={() => {}}
	/>
</div>

<div class="py-5 text-2xl font-semibold">หลักฐานอื่น ๆ</div>

<div class="flex flex-col gap-2">
	<div>- เช่น เอกสารโครงการม, รายงานสรุปโครงการกิจกรรม, ทรานสคริปกิจกรรม หรือ หลักฐานอื่น ๆ</div>
	<div>- โปรดตั้งชื่อไฟล์: รหัสนิสิต_ชื่อเอกสาร</div>

	<div class="w-full pt-2">
		<Button variant="outline" fullWidth>
			<Icon slot="left" icon="mdi:plus" class="text-primary" width="24" />
			เพิ่มไฟล์ (PDF)
		</Button>
	</div>
</div>

<div class="pt-15 flex justify-center">
	<Button variant="outline">
		<Icon slot="left" icon="mdi:content-save" class="text-primary" width="24" />
		บันทึกข้อมูล
	</Button>
</div>
