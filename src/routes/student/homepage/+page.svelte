<script>
	import Card from '$lib/components/Card.svelte';
	import { CirclePlus, Menu } from 'lucide-svelte';
</script>

<div class="flex flex-col items-center justify-center pb-7">
	<div class="text-primary text-6xl font-bold">00:00:00</div>
	<div>หมดเขต dd MM yy</div>
</div>

<div class="pb-7 text-3xl font-bold">โปรดเลือกทำรายการ</div>

<div class="flex flex-wrap gap-x-10 gap-y-7">
	<Card href="/student/form-page">
		<CirclePlus slot="icon" class="text-primary" size={100} strokeWidth={1.25} />
		เสนอตัวเองเป็นนิสิตดีเด่น
	</Card>

	<Card href="/student/applications-history-page">
		<Menu slot="icon" class="text-primary" size={100} strokeWidth={1.25} />
		รายการที่เคยเสนอ
	</Card>
</div>
