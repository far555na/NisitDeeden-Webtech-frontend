<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';

	export let title: string = 'เอกสาร';

	export let name: string;

	export let required: boolean = false;
	export let multiple: boolean = false;
	export let accept: string = '.pdf,.doc,.docx,image/*';

	export let onUpload: ((files: FileList | null) => void) | undefined;

	let inputEl: HTMLInputElement | null = null;
	let fileNames: string[] = [];

	function openPicker() {
		inputEl?.click();
	}

	function handleChange(e: Event) {
		const files = (e.currentTarget as HTMLInputElement).files;
		fileNames = files ? Array.from(files).map((f) => f.name) : [];
		onUpload?.(files);
	}
</script>

<div class="border-primary flex h-20 items-center justify-between rounded-2xl border-2 px-5">
	<div class="flex items-center gap-2">
		<Icon icon="mdi:file-outline" class="text-primary" width="40" />
		<div class="flex items-baseline gap-2">
			<div class="text-primary text-xl font-semibold">{title}</div>
			{#if required}
				<div class="text-red-500">*</div>
			{/if}
			{#if fileNames.length > 0}
				<div class="truncate text-sm text-neutral-500">
					{fileNames.join(', ')}
				</div>
			{/if}
		</div>
	</div>

	<input
		type="file"
		{name}
		{required}
		{multiple}
		{accept}
		on:change={handleChange}
		class="
		w-[100px] 
		cursor-pointer
		overflow-hidden
		text-transparent

		focus:outline-none
		focus:ring-0

		file:cursor-pointer
		file:rounded-xl
		file:border-0
		file:bg-neutral-300
		file:px-4
		file:py-2
		file:font-medium
		file:text-neutral-950
	"
	/>

	<!-- <Button variant="filled" type="button" on:click={openPicker}>
		<Icon slot="left" icon="mdi:tray-arrow-up" class="text-neutral-950" width="24" />
		<div class="text-neutral-950">อัปโหลด</div>
	</Button> -->
</div>
