<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import FormGrid from '$lib/components/FormGrid.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import FileLink from '$lib/components/FileLink.svelte';
	import Icon from '@iconify/svelte';
	import background from '$lib/assets/background.png';

	export let application: any;

	function back() {
		history.back();
	}

	$: values = application?.values ?? [];
	$: user = application?.user ?? {};

	$: textAttributes = values.filter((attribute: any) => !attribute.is_file);
	$: fileAttributes = values.filter((attribute: any) => attribute.is_file);
</script>

<div class="flex justify-between pb-5">
	<Button onclick={back}>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>
</div>

<div class="flex flex-wrap gap-20">
	<div class="md:w-2/3">
		<div class="flex w-full flex-wrap gap-10">
			<div>
				<img class="h-auto w-3xs" src={background} alt="background" />
			</div>

			<div class="min-w-xs flex-1">
				<div class="pb-5 text-xl font-semibold text-primary">ข้อมูลส่วนตัว</div>
				<FormGrid cols={2}>
					<FormField
						id="student_id"
						name="student_id"
						label="รหัสนิสิต"
						value={user.university_id ?? ''}
						readonly
					/>
					<FormField
						id="student_name"
						name="student_name"
						label="ชื่อ-นามสกุล"
						value={user.name ?? ''}
						readonly
					/>
					<FormField id="faculty" name="faculty" label="คณะ" value={user.faculty ?? ''} readonly />
					<FormField
						id="department"
						name="department"
						label="ภาควิชา"
						value={user.department ?? ''}
						readonly
					/>
					<FormField id="email" name="email" label="อีเมล" value={user.email ?? ''} readonly />
				</FormGrid>
			</div>
		</div>

		<div class="pt-5">
			<div class="pb-5 text-xl font-semibold text-primary">รายละเอียด</div>
			{#each textAttributes as attribute}
				<FormGrid cols={1}>
					<FormField
						id={`attr_${attribute.id}`}
						name={`values[${attribute.id}]`}
						label={attribute.label}
						value={attribute.value}
						readonly
					/>
				</FormGrid>
				<div class="pt-5"></div>
			{/each}
		</div>
	</div>

	<div class="flex flex-1 flex-col justify-between gap-5">
		<div class="flex flex-col gap-5">
			<div class="text-xl font-semibold text-primary">เอกสารประกอบ</div>
			{#each fileAttributes as attribute}
				<FileLink href={attribute.value} label={attribute.label} />
			{/each}
		</div>

        <slot name="actions" />
		
	</div>
</div>
