<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';

	export let title: string = 'เอกสาร';

	export let name: string;

	export let required: boolean = false;
	export let multiple: boolean = false;
	export let accept: string = '.pdf,.doc,.docx,image/*';
	export let existingValue: string | null = null;

	export let onUpload: ((files: FileList | null) => void) | undefined;

	let inputEl: HTMLInputElement | null = null;
	let selectedFiles: File[] = [];

	function handleChange(e: Event) {
		const files = (e.currentTarget as HTMLInputElement).files;
		selectedFiles = files ? Array.from(files) : [];
		onUpload?.(files);
	}

	function openFile(file: File) {
		const url = URL.createObjectURL(file);
		window.open(url, '_blank', 'noopener,noreferrer');
		setTimeout(() => URL.revokeObjectURL(url), 10_000);
	}
</script>

<div class="flex h-20 items-center justify-between rounded-2xl border-2 border-primary px-5">
	<div class="flex items-center gap-2">
		<Icon icon="mdi:file-outline" class="text-primary" width="40" />
		<div class="flex items-baseline gap-2">
			<div class="text-xl font-semibold text-primary">{title}</div>
			{#if required}
				<div class="text-red-500">*</div>
			{/if}

			{#if existingValue && selectedFiles.length === 0}
				<a
					href={existingValue}
					target="_blank"
					rel="noopener noreferrer"
					class="truncate text-sm text-neutral-500 underline underline-offset-3 hover:text-primary"
				>
					ดูไฟล์เดิม
				</a>
			{:else if selectedFiles.length > 0}
				{#each selectedFiles as f}
					<button
						type="button"
						on:click={() => openFile(f)}
						class="truncate text-sm text-neutral-500 underline underline-offset-3 hover:cursor-pointer hover:text-primary"
					>
						{f.name}
					</button>
				{/each}
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

		file:cursor-pointer
		file:rounded-xl

		file:border-0
		file:bg-neutral-300
		file:px-4
		file:py-2
		file:font-medium
		file:text-neutral-950
		focus:ring-0
		focus:outline-none
	"
	/>

	<!-- <Button variant="filled" type="button" on:click={openPicker}>
		<Icon slot="left" icon="mdi:tray-arrow-up" class="text-neutral-950" width="24" />
		<div class="text-neutral-950">อัปโหลด</div>
	</Button> -->
</div>
