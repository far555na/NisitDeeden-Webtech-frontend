<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';

	export let title: string = 'เอกสาร';
	export let icon: string = 'mdi:file-outline';

	export let buttonText: string = 'อัปโหลด';
	export let buttonIcon: string = 'mdi:tray-arrow-up';

	export let onUpload: (() => void) | undefined;
</script>

<div class="border-primary flex h-20 items-center justify-between rounded-2xl border-2 px-5">
	<div class="flex items-center gap-2">
		<Icon icon={icon} class="text-primary" width="40" />
		<div class="text-primary text-xl font-semibold">{title}</div>
	</div>

	<Button variant="filled" type="button" on:click={() => onUpload?.()}>
		<Icon slot="left" icon={buttonIcon} class="text-neutral-950" width="24" />
		<div class="text-neutral-950">{buttonText}</div>
	</Button>
</div>