<script lang="ts">
	export let step: number = 1; 
	export let labels: string[] = [
		'ข้อมูลส่วนบุคคล',
		'เลือกประเภทรางวัลนิสิตดีเด่น',
		'เอกสารประกอบการพิจารณา',
		'ตรวจสอบข้อมูล'
	];
</script>

<div class=" w-1/2">
	<div
		class="border-primary flex h-12 w-full overflow-hidden rounded-2xl border-2"
	>
		{#each Array(4) as _, i}
			<div
				class={`w-1/4 border-primary ${
					i < 3 ? 'border-r-2' : ''
				} ${i < step ? 'bg-primary' : 'bg-white'}`}
			></div>
		{/each}
	</div>

	<div class="text-primary flex justify-center pt-5 text-center font-medium">
		ส่วนที่ {step}: {labels[step - 1]}
	</div>
</div>
