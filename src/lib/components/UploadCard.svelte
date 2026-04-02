<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';

	const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

	export let title: string = 'เอกสาร';
	export let name: string;
	export let required: boolean = false;
	export let multiple: boolean = false;
	export let accept: string = '.pdf,.doc,.docx,image/*';
	export let existingValue: string | null = null;
	export let onUpload: ((files: FileList | null) => void) | undefined;

	let inputEl: HTMLInputElement | null = null;
	let selectedFiles: File[] = [];
	let errorMessage = '';

	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

	function handleChange(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const files = input.files;

		if (!files || files.length === 0) {
			selectedFiles = [];
			errorMessage = '';
			onUpload?.(null);
			return;
		}

		const fileArray = Array.from(files);
		const oversizedFiles = fileArray.filter((file) => file.size > MAX_FILE_SIZE);

		if (oversizedFiles.length > 0) {
			errorMessage = `ไฟล์ต้องมีขนาดไม่เกิน 5 MB: ${oversizedFiles.map((file) => file.name).join(', ')}`;
			selectedFiles = [];
			input.value = '';
			onUpload?.(null);
			return;
		}

		errorMessage = '';
		selectedFiles = fileArray;
		onUpload?.(files);
	}

	function openFile(file: File) {
		const url = URL.createObjectURL(file);
		window.open(url, '_blank', 'noopener,noreferrer');
		setTimeout(() => URL.revokeObjectURL(url), 10_000);
	}

	function escapeRegExp(value: string) {
		return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function normalizeFileUrl(path: string | null) {
		if (!path) return null;

		const cleanedPath = cleanDuplicatedStorageUrl(path);

		if (cleanedPath.startsWith('http://') || cleanedPath.startsWith('https://')) {
			return cleanedPath;
		}

		return `${STORAGE_URL}/storage/${cleanedPath}`;
	}

	function cleanDuplicatedStorageUrl(path: string | null) {
		if (!path) return '';

		const storagePrefix = `${STORAGE_URL}/storage/`;

		return path.replace(
			new RegExp(`(${escapeRegExp(storagePrefix)})(${escapeRegExp(storagePrefix)})`, 'g'),
			'$1'
		);
	}

	function getPathForBackend(path: string | null) {
		if (!path) return '';

		const cleanedPath = cleanDuplicatedStorageUrl(path);
		const storagePrefix = `${STORAGE_URL}/storage/`;

		if (cleanedPath.startsWith(storagePrefix)) {
			return cleanedPath.slice(storagePrefix.length);
		}

		return cleanedPath;
	}
</script>

<div class="flex flex-col gap-2">
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
						href={normalizeFileUrl(existingValue)}
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
							onclick={() => openFile(f)}
							class="truncate text-sm text-neutral-500 underline underline-offset-3 hover:cursor-pointer hover:text-primary"
						>
							{f.name}
						</button>
					{/each}
				{/if}
			</div>
		</div>

		<div class="flex items-center gap-2">
			<input
				bind:this={inputEl}
				type="file"
				{name}
				required={required && !existingValue && selectedFiles.length === 0}
				{multiple}
				{accept}
				onchange={handleChange}
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
		</div>

		{#if existingValue && selectedFiles.length === 0}
			<input type="hidden" {name} value={getPathForBackend(existingValue)} />
		{/if}
	</div>

	{#if errorMessage}
		<p class="text-sm text-red-500">{errorMessage}</p>
	{/if}
</div>
