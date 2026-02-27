<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';

	export let currentPage: number;
	export let lastPage: number;

	export let hasPrev: boolean = false;
	export let hasNext: boolean = false;

	export let onPrev: (() => void) | null = null;
	export let onNext: (() => void) | null = null;
</script>

<div class="flex items-center justify-center gap-5 pt-5">
	<Button
		variant="outline"
		disabled={!hasPrev}
		onclick={() => hasPrev && onPrev?.()}
	>
		<Icon slot="left" icon="mdi:chevron-double-left" width="16" />
		<span class="text-sm">ย้อนกลับ</span>
	</Button>

	<span class="text-primary">
		หน้า {currentPage} / {lastPage}
	</span>

	<Button
		variant="outline"
		disabled={!hasNext}
		onclick={() => hasNext && onNext?.()}
	>
		<Icon slot="right" icon="mdi:chevron-double-right" width="16" />
		<span class="text-sm">ถัดไป</span>
	</Button>
</div>