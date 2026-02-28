<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;

	export let type: string = 'text';
	export let value: string = ''; // ถ้าจะ bind
	export let placeholder: string = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	// ถ้าอยากกำหนดกว้างเอง เช่น "w-sm" หรือ "w-full"
	export let wrapperClass: string = 'w-full';
	export let inputClass: string = '';
</script>

<div class={`flex flex-col ${wrapperClass}`}>
	<div class="flex items-baseline gap-1">
		<label for={id} class="mb-1">{label}</label>
		{#if required}
			<div class="text-red-500">*</div>
		{/if}
	</div>

	<input
		{id}
		{name}
		{type}
		{value}
		on:input={(e) => (value = (e.target as HTMLInputElement).value)}
		{placeholder}
		{required}
		{disabled}
		{readonly}
		class={`m-0 border-0   border-b-2 p-0 ${readonly ? 'w-auto cursor-default border-tertiary focus:ring-0 focus:outline-none' : 'w-auto border-tertiary focus:border-primary focus:ring-0 focus:outline-none'} ${inputClass}`}
	/>
</div>
