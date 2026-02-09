<script>
	import Button from '$lib/components/Button.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';
</script>

<div class="flex justify-between">
	<Button>
		<svg   
			slot="left"
			class="text-primary h-6 w-6"
			aria-hidden="true"     
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none" 
			viewBox="0 0 24 24"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M5 12h14M5 12l4-4m-4 4 4 4"
			/>
		</svg>

		ย้อนกลับ
	</Button>

	<StepProgress step={1} />

	<Button variant="outline">
		ถัดไป

		<svg
			slot="right"
			class="text-primary h-6 w-6"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 12H5m14 0-4 4m4-4-4-4"
			/>
		</svg>
	</Button>
</div>
