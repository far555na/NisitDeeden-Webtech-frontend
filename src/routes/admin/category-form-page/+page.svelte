<script lang="ts">
	import FormField from '$lib/components/FormField.svelte';
	import Button from '$lib/components/Button.svelte';
	import FilterDropdown from '$lib/components/FilterDropdown.svelte';
	import Icon from '@iconify/svelte';
	import TextareaField from '$lib/components/TextareaField.svelte';

	const { data, form } = $props();

	let categoryName = $state(typeof form?.data?.name === 'string' ? form.data.name : '');
	let icon = $state(typeof form?.data?.icon === 'string' ? form.data.icon : '');
	let description = $state(
		typeof form?.data?.description === 'string' ? form.data.description : ''
	);

	let isSubmitting = $state(false);

	type AttributeField = {
		id: string;
		label: string;
		type: string;
		is_required: boolean;
	};

	let openDropdown = $state<string | null>(null);

	let attributes = $state<AttributeField[]>([
		{
			id: crypto.randomUUID(),
			label: '',
			type: 'text',
			is_required: false
		}
	]);

	const fieldTypeOptions = [
		{ label: 'ข้อความสั้น', value: 'text' },
		{ label: 'ข้อความยาว', value: 'textarea' },
		{ label: 'ไฟล์แนบ', value: 'file' }
	];

	function toggleDropdown(name: string) {
		openDropdown = openDropdown === name ? null : name;
	}

	function closeDropdown() {
		openDropdown = null;
	}

	function addAttribute() {
		attributes = [
			...attributes,
			{
				id: crypto.randomUUID(),
				label: '',
				type: 'text',
				is_required: false
			}
		];
	}

	function removeAttribute(id: string) {
		attributes = attributes.filter((attr) => attr.id !== id);
	}

	function getErrorMessage(error: unknown): string {
		if (Array.isArray(error)) return String(error[0] ?? '');
		if (typeof error === 'string') return error;
		return '';
	}
</script>

<form method="POST" class="mx-auto max-w-5xl space-y-8">
	<div>
		<h1 class="text-3xl font-bold text-neutral-900">สร้างประเภทรางวัลใหม่</h1>
		<p class="mt-1 text-sm text-neutral-500">
			กำหนดชื่อและสร้างฟอร์มรับสมัครแบบไดนามิกสำหรับประเภทรางวัลนี้
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6">
		<div>
			<FormField
				id="name"
				name="name"
				label="ชื่อประเภทรางวัล"
				type="text"
				placeholder="เช่น ด้านวิชาการดีเด่น"
				bind:value={categoryName}
				required
			/>
			{#if form?.errors?.name}
				<p class="mt-2 text-sm text-red-600">{getErrorMessage(form.errors.name)}</p>
			{/if}
		</div>

		<div>
			<FormField
				id="icon"
				name="icon"
				label="ไอคอน (Lucide Icon)"
				type="text"
				placeholder="เช่น lucide:award"
				bind:value={icon}
			/>
			<p class="mt-2 text-sm text-neutral-400">ใช้รูปแบบ 'lucide:ชื่อไอคอน' (เช่น lucide:star)</p>
			{#if form?.errors?.icon}
				<p class="mt-2 text-sm text-red-600">{getErrorMessage(form.errors.icon)}</p>
			{/if}
		</div>

		<div>
			<TextareaField
				id="description"
				name="description"
				label="คำอธิบาย"
				rows={4}
				bind:value={description}
				placeholder="อธิบายเกณฑ์หรือคุณสมบัติคร่าวๆ สำหรับประเภทรางวัลนี้..."
				textareaClass="px-4 py-3"
			/>
			{#if form?.errors?.description}
				<p class="mt-2 text-sm text-red-600">
					{getErrorMessage(form.errors.description)}
				</p>
			{/if}
		</div>
	</div>

	<div>
		<h2 class="text-xl font-semibold text-primary">ฟิลด์ข้อมูลที่ต้องการให้ผู้สมัครกรอก</h2>
	</div>

	<div class="space-y-4">
		{#each attributes as attr, index}
			<div class="rounded-4xl border-2 border-primary px-10 py-5">
				<div class="mb-4 flex items-center justify-between">
					<div>
						<h3 class="text-base font-semibold">ฟิลด์ที่ {index + 1}</h3>
						<p class="text-sm text-neutral-500">
							ระบุชื่อฟิลด์ ประเภทข้อมูล และกำหนดว่าจำเป็นต้องกรอกหรือไม่
						</p>
					</div>

					{#if attributes.length > 1}
						<button
							type="button"
							onclick={() => removeAttribute(attr.id)}
							class="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
						>
							<Icon icon="lucide:x" width="16" />
						</button>
					{/if}
				</div>

				<div class="flex gap-10">
					<div class="flex w-fit shrink-0 flex-col gap-2">
						<label>ประเภทข้อมูล</label>
						<FilterDropdown
							options={fieldTypeOptions}
							value={attr.type}
							placeholder="กรุณาเลือกประเภทข้อมูล"
							isOpen={openDropdown === `type-${attr.id}`}
							onToggle={() => toggleDropdown(`type-${attr.id}`)}
							onClose={closeDropdown}
							onValueChange={(v) => {
								attr.type = v;
								attributes = [...attributes];
							}}
						/>
						<input type="hidden" name={`attributes[${index}][type]`} value={attr.type} />
					</div>

					<div class="w-full">
						<FormField
							id={`attributes-${index}-label`}
							name={`attributes[${index}][label]`}
							label="ชื่อฟิลด์"
							type="text"
							placeholder="เช่น ชื่อผลงาน / เอกสารประกอบ / คำอธิบายผลงาน"
							wrapperClass="w-full"
							bind:value={attr.label}
						/>
					</div>
				</div>

				<div class="mt-5 flex items-center gap-3 rounded-xl bg-primary/5 px-4 py-3">
					<input
						id={`attributes-${index}-required`}
						name={`attributes[${index}][is_required]`}
						type="checkbox"
						value="true"
						checked={attr.is_required}
						onchange={(e) => {
							attr.is_required = (e.currentTarget as HTMLInputElement).checked;
							attributes = [...attributes];
						}}
						class="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
					/>
					<label for={`attributes-${index}-required`} class="text-sm font-medium text-neutral-900">
						กำหนดให้ฟิลด์นี้เป็นข้อมูลบังคับ
					</label>
				</div>
			</div>
		{/each}
	</div>

	<div>
		<Button type="button" variant="outline" onclick={addAttribute} class="px-6 py-3">
			<Icon slot="left" icon="lucide:plus" width="18" />
			เพิ่มฟิลด์ข้อมูล
		</Button>
	</div>

	<div class="mt-auto flex w-full justify-end pt-10">
		<Button variant="outline" type="submit" disabled={isSubmitting} class="px-10">
			<Icon slot="left" icon="mdi:content-save" class="text-primary" width="24" />
			{#if isSubmitting}
				กำลังบันทึกข้อมูล
			{:else}
				บันทึก
			{/if}
		</Button>
	</div>
</form>