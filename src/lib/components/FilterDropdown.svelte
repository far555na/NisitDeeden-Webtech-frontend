<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';

	type FilterOption = {
		label: string;
		value: string;
	};

	interface Props {
		options: FilterOption[];
		value: string;
		placeholder?: string;
		variant?: 'primary' | 'outline' | 'filled' | 'outlineRed';
		widthClass?: string;
		class?: string;
		disabled?: boolean;
		onValueChange?: (value: string) => void;

		isOpen: boolean;
		onToggle: () => void;
		onClose?: () => void;
	}

	let {
		options,
		value,
		placeholder = 'ทั้งหมด',
		variant = 'outline',
		widthClass = 'min-w-[220px]',
		class: className = '',
		disabled = false,
		onValueChange,
		isOpen,
		onToggle,
		onClose
	}: Props = $props();

	const selectedLabel = $derived(
		options.find((option) => option.value === value)?.label ?? placeholder
	);

	function selectFilter(selectedValue: string) {
		if (disabled) return;
		onValueChange?.(selectedValue);
		onClose?.();
	}

	function clickOutside(node: HTMLElement) {
		function handleClick(event: MouseEvent) {
			if (!node.contains(event.target as Node)) {
				onClose?.();
			}
		}

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<div class="relative inline-block" use:clickOutside>
	<Button
		variant={variant}
		class={className}
		disabled={disabled}
		onclick={() => !disabled && onToggle()}
	>
		{selectedLabel}
		<Icon
			slot="right"
			icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
			width="24"
		/>
	</Button>

	{#if isOpen && !disabled}
		<div
			class={`absolute right-0 z-10 mt-2 ${widthClass} rounded-xl border border-neutral-200 bg-white p-2 shadow-lg`}
		>
			{#each options as option}
				<button
					type="button"
					class="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-neutral-100"
					onclick={() => selectFilter(option.value)}
				>
					<span>{option.label}</span>
					{#if value === option.value}
						<Icon icon="mdi:check" class="text-primary" width="20" />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>