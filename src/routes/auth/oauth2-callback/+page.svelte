<script lang="ts">
	import { onMount } from 'svelte';
</script>

<div class="flex min-h-[80vh] flex-col items-center justify-center px-4">
	<div class="flex flex-col items-center gap-4">
		<div class="relative h-16 w-16">
			<div class="absolute inset-0 rounded-full border-4 border-slate-200"></div>
			<div
				class="absolute inset-0 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
			></div>
		</div>

		<div class="text-center">
			<h1 class="text-xl font-semibold text-slate-900">กำลังยืนยันตัวตน...</h1>
			<p class="text-sm text-slate-500">กรุณารอสักครู่ ระบบกำลังนำคุณเข้าสู่ระบบ</p>
		</div>
	</div>
</div>
