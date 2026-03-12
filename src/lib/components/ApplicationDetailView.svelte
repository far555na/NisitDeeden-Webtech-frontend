<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import FormGrid from '$lib/components/FormGrid.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import FileLink from '$lib/components/FileLink.svelte';
	import Icon from '@iconify/svelte';
	import { getStorageUrl } from '$lib/profile';
	import StatusProgress from './StatusProgress.svelte';
	import { ApplicationStatus } from '$lib/types/application-status';

	export let application: any;

	function back() {
		history.back();
	}

	$: values = application?.values ?? [];
	$: user = application?.user ?? {};

	$: textAttributes = values.filter((attribute: any) => !attribute.is_file);
	$: fileAttributes = values.filter((attribute: any) => attribute.is_file);

	$: isRejected = application?.status === ApplicationStatus.REJECTED;
	$: rejectReason = application?.reject_reason ?? application?.rejection_reason ?? '-';
</script>

<div class="relative flex items-center pb-12">
	<div class="flex-shrink-0">
		<Button onclick={back}>
			<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
			ย้อนกลับ
		</Button>
	</div>

	<div class="absolute left-1/2 w-full max-w-4xl -translate-x-1/2 px-6">
		{#if isRejected}
			<div class="inline-flex w-full max-w-4xl gap-2 rounded-2xl border-2 border-red-200 bg-red-50 p-5 text-base">
	<div class="flex items-center gap-2 font-semibold text-red-500">
		<Icon icon="mdi:close-circle-outline" width="24" />
		ไม่ผ่านการพิจารณา
	</div>

	<div class="font-medium text-red-500">เนื่องด้วย</div>

	<div class="whitespace-pre-wrap text-red-500 underline">
		{rejectReason}
	</div>
</div>
		{:else}
			<div class="w-full max-w-4xl">
				<StatusProgress status={application.status} />
			</div>
		{/if}
	</div>
</div>

<div class="flex flex-wrap gap-20">
	<div class="md:w-2/3">
		<div class="flex w-full flex-wrap gap-10">
			<div>
				<img class="h-auto w-3xs" src={getStorageUrl(user.profile_path)} alt="background" />
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
					<FormField
						id="faculty"
						name="faculty"
						label="คณะ"
						value={user.faculty_th ?? ''}
						readonly
					/>
					<FormField
						id="department"
						name="department"
						label="ภาควิชา"
						value={user.department_th ?? ''}
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
