<script>
	import Button from '$lib/components/Button.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';
	import background from '$lib/assets/background.png';
	import FormGrid from '$lib/components/FormGrid.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import Icon from '@iconify/svelte';

	let student_id = '';
	let student_name = '';
	let faculty = '';
	let house_no = '';
	let village_no = '';
	let road = '';
	let subdistrict = '';
	let district = '';
	let province = '';
	let postal_code = '';
</script>

<div class="flex justify-between pb-7">
	<Button>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>

	<StepProgress step={1} />

	<a href="choose-category-page">
		<Button variant="outline">
			ถัดไป
			<Icon slot="right" icon="mdi:arrow-right" class="text-primary" width="24" />
		</Button>
	</a>
</div>

<div class="flex flex-wrap gap-10">
	<div>
		<img class="w-lg" src={background} alt="background" />
		<ul class="text-tertiary pt-3">
			<li>- ขนาดอย่างน้อย 470 * 625 px</li>
			<li>- แต่งกายชุดนิสิตสุภาพ</li>
		</ul>
	</div>
	<div>
		<div class="text-primary pb-5 text-xl font-semibold">ข้อมูลส่วนตัว</div>
		<FormGrid cols={2}>
			<FormField id="student_id" name="student_id" label="รหัสนิสิต" bind:value={student_id} />
			<FormField
				id="student_name"
				name="student_name"
				label="ชื่อ-นามสกุล"
				bind:value={student_name}
			/>
			<FormField id="faculty" name="faculty" label="คณะ" bind:value={faculty} />
			<FormField id="dapartment" name="dapartment" label="ภาควิชา" bind:value={faculty} />
			<FormField id="major" name="major" label="สาขา/แขนงวิชา" bind:value={faculty} />
		</FormGrid>

		<div class="text-primary pt-10 pb-5 text-xl font-semibold">ที่อยู่ปัจจุบัน</div>

		<FormGrid cols={2}>
			<FormField id="house_no" name="house_no" label="บ้านเลขที่" bind:value={house_no} />

			<FormField id="village_no" name="village_no" label="หมู่" bind:value={village_no} />

			<FormField id="road" name="road" label="ถนน" bind:value={road} />

			<FormField id="subdistrict" name="subdistrict" label="ตำบล" bind:value={subdistrict} />

			<FormField id="district" name="district" label="อำเภอ" bind:value={district} />

			<FormField id="province" name="province" label="จังหวัด" bind:value={province} />

			<FormField
				id="postal_code"
				name="postal_code"
				label="รหัสไปรษณีย์"
				bind:value={postal_code}
			/>
		</FormGrid>
	</div>
</div>
