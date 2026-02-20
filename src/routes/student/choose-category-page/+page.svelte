<script>
	import Button from '$lib/components/Button.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';

	import Card from '$lib/components/Card.svelte';
	import Icon from '@iconify/svelte';
</script>

<div class="flex justify-between pb-7">
	<Button>
		<Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
		ย้อนกลับ
	</Button>

	<StepProgress step={2} />

	<a href="category-form-page">
		<Button variant="outline">
			ถัดไป
			<Icon slot="right" icon="mdi:arrow-right" class="text-primary" width="24" />
		</Button>
	</a>
</div>

<div class="flex items-center justify-center">
	<p class="pb-7 text-3xl font-bold">โปรดเลือกประเภท (เลือกได้อย่างใดอย่างหนึ่ง)</p>
</div>

<div class="flex items-center justify-center gap-10">
	<Card href="/student/form-page">
		<svg
			slot="icon"
			class="text-primary h-[100px] w-[100px]"
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
				stroke-width="1"
				d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>

		เสนอตัวเองเป็นนิสิตดีเด่น
	</Card>

	<Card href="/student/form-page">
		<svg
			slot="icon"
			class="text-primary h-[100px] w-[100px]"
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
				stroke-width="1"
				d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>

		เสนอตัวเองเป็นนิสิตดีเด่น
	</Card>

	<Card href="/student/form-page">
		<svg
			slot="icon"
			class="text-primary h-[100px] w-[100px]"
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
				stroke-width="1"
				d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>

		เสนอตัวเองเป็นนิสิตดีเด่น
	</Card>
</div>
