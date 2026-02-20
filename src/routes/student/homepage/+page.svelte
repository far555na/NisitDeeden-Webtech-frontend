<script>
	import Card from '$lib/components/Card.svelte';
</script>

<div class="flex flex-col items-center justify-center pb-7">
	<div class="text-primary text-6xl font-bold">00:00:00</div>
	<div>หมดเขต dd MM yy</div>
</div>

<div class="pb-7 text-3xl font-bold">โปรดเลือกทำรายการ</div>

<div class="flex flex-wrap gap-x-10 gap-y-7">
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

	<Card href="/student/applications-history-page">
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
				d="M18 6H6m12 4H6m12 4H6m12 4H6"
			/>
		</svg>

		รายการที่เคยเสนอ
	</Card>
</div>
