<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;

	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	export let rows: number = 3;

	export let wrapperClass: string = 'w-full';
	export let textareaClass: string = '';
</script>

<div class={`flex flex-col ${wrapperClass}`}>
	<div class="flex items-baseline gap-1">
		<label for={id} class="mb-1">{label}</label>
		{#if required}
			<div class="text-red-500">*</div>
		{/if}
	</div>

	<textarea
		{id}
		{name}
		bind:value
		{rows}
		{placeholder}
		{required}
		{disabled}
		{readonly}
		class={`resize-none rounded-2xl border-2 bg-transparent
    ${
			readonly
				? 'border-tertiary w-auto cursor-default focus:ring-0 focus:outline-none'
				: 'border-tertiary focus:border-primary w-auto focus:ring-0 focus:outline-none'
		}
    ${textareaClass}`}
	></textarea>
</div>
