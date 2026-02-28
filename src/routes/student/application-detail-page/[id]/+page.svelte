<script>
	import Button from '$lib/components/Button.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';
	import background from '$lib/assets/background.png';
	import FormGrid from '$lib/components/FormGrid.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import Icon from '@iconify/svelte';
	import FileLink from '$lib/components/FileLink.svelte';

	const { data } = $props();

	function back() {
		history.back();
	}
</script>

<div class="flex justify-between pb-5">
	<Button on:click={back}>
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
						value={data.application?.user?.university_id ?? ''}
						readonly
					/>
					<FormField
						id="student_name"
						name="student_name"
						label="ชื่อ-นามสกุล"
						value={data.application?.user?.name ?? ''}
						readonly
					/>
					<FormField
						id="faculty"
						name="faculty"
						label="คณะ"
						value={data.application?.user?.faculty ?? ''}
						readonly
					/>
					<FormField
						id="dapartment"
						name="dapartment"
						label="ภาควิชา"
						value={data.application?.user?.department ?? ''}
						readonly
					/>
					<FormField
						id="email"
						name="email"
						label="อีเมล"
						value={data.application?.user?.email ?? ''}
						readonly
					/>
				</FormGrid>
			</div>
		</div>

		<div class="pt-5">
			<div class="pb-5 text-xl font-semibold text-primary">รายละเอียด</div>
			{#each data.application.values as attribute}
				{#if !attribute.is_file}
					<FormGrid cols={1}>
						<FormField
							id={`attr_${attribute.id}`}
							name={`values[${attribute.id}]`}
							label={attribute.label}
							value={attribute.value}
							readonly
						/>
						<!-- {#if attribute.type === 'text'}
							<FormField
								id={`attr_${attribute.id}`}
								name={`values[${attribute.id}]`}
								label={attribute.label}
								value={attribute.value}
								readonly
							/>
							{:else}
							<TextareaField
								id={`attr_${attribute.id}`}
								name={`values[${attribute.id}]`}
								label={attribute.label}
								required={attribute.is_required}
								disabled={isSubmitting}
							/>
						{/if} -->
					</FormGrid>
				{/if}
			{/each}
		</div>
	</div>

	<div class="flex flex-1 flex-col justify-between gap-5">
		<div class="flex flex-col gap-5">
			<div class="text-xl font-semibold text-primary">เอกสารประกอบ</div>
			{#each data.application.values as attribute}
				{#if attribute.is_file}
					<FileLink href={attribute.value} label={attribute.label} />
				{/if}
			{/each}
		</div>
		<!-- <Button variant="outline">
			<Icon slot="left" icon="mdi:check" class="text-primary" width="24" />
			ฉันได้ตรวจสอบครบถ้วนแล้ว
		</Button> -->
	</div>
</div>
