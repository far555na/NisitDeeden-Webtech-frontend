<script>
	import Card from '$lib/components/Card.svelte';
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-col items-center justify-center pb-7">
	<div class="text-primary text-6xl font-bold">00:00:00</div>
	<div>หมดเขต dd MM yy</div>
</div>

<div class="pb-7 text-3xl font-bold">โปรดเลือกทำรายการ</div>

<div class="flex flex-wrap gap-x-10 gap-y-7">
	<Card href="/student/choose-category-page">
		<Icon slot="icon" icon="lucide:circle-plus" class="text-primary" width="100" />
		เสนอตัวเองเป็นนิสิตดีเด่น
	</Card>

	<Card href="/student/applications-history-page">
		<Icon slot="icon" icon="lucide:menu" class="text-primary" width="100" />
		รายการที่เคยเสนอ
	</Card>
</div>
