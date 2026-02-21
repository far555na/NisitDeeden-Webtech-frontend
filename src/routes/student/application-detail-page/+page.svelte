<script>
	import Button from '$lib/components/Button.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';
	import background from '$lib/assets/background.png';
	import FormGrid from '$lib/components/FormGrid.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import Icon from '@iconify/svelte';
	import FileLink from '$lib/components/FileLink.svelte';

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

	<StepProgress step={4} />

	<div class="invisible">
		<Button>
			<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
			ย้อนกลับ
		</Button>
	</div>
</div>

<div class="flex flex-wrap gap-20">
	<div class="md:w-2/3">
		<div class="flex w-full flex-wrap gap-10">
			<div>
				<img class="h-auto w-3xs" src={background} alt="background" />
			</div>
			<div class="min-w-xs flex-1">
				<div class="text-primary pb-5 text-xl font-semibold">ข้อมูลส่วนตัว</div>
				<FormGrid cols={2}>
					<FormField
						id="student_id"
						name="student_id"
						label="รหัสนิสิต"
						bind:value={student_id}
						readonly
					/>
					<FormField
						id="student_name"
						name="student_name"
						label="ชื่อ-นามสกุล"
						bind:value={student_name}
						readonly
					/>
					<FormField id="faculty" name="faculty" label="คณะ" bind:value={faculty} readonly />
					<FormField
						id="dapartment"
						name="dapartment"
						label="ภาควิชา"
						bind:value={faculty}
						readonly
					/>
					<FormField id="major" name="major" label="สาขา/แขนงวิชา" bind:value={faculty} readonly />
				</FormGrid>
			</div>
		</div>

		<div class="pt-5">
			<div class="text-primary pb-5 text-xl font-semibold">ที่อยู่ปัจจุบัน</div>
			<FormGrid cols={2}>
				<FormField
					id="house_no"
					name="house_no"
					label="บ้านเลขที่"
					bind:value={house_no}
					readonly
				/>

				<FormField
					id="village_no"
					name="village_no"
					label="หมู่"
					bind:value={village_no}
					readonly
				/>

				<FormField id="road" name="road" label="ถนน" bind:value={road} readonly />

				<FormField
					id="subdistrict"
					name="subdistrict"
					label="ตำบล"
					bind:value={subdistrict}
					readonly
				/>

				<FormField id="district" name="district" label="อำเภอ" bind:value={district} readonly />

				<FormField id="province" name="province" label="จังหวัด" bind:value={province} readonly />

				<FormField
					id="postal_code"
					name="postal_code"
					label="รหัสไปรษณีย์"
					bind:value={postal_code}
					readonly
				/>
			</FormGrid>
		</div>
	</div>

	<div class="flex flex-1 flex-col justify-between gap-5">
		<div class="flex flex-col gap-5">
			<div class="text-primary text-xl font-semibold">เอกสารประกอบ</div>
			<FileLink href="/files/student-card.pdf" label="สำเนาบัตรนิสิต.pdf" />
			<FileLink href="/files/student-card.pdf" label="สำเนาบัตรนิสิต.pdf" />
			<FileLink href="/files/student-card.pdf" label="สำเนาบัตรนิสิต.pdf" />
		</div>
		<Button variant="outline">
			<Icon slot="left" icon="mdi:check" class="text-primary" width="24" />
			ฉันได้ตรวจสอบครบถ้วนแล้ว
		</Button>
	</div>
</div>
