<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, SubmitFunction } from './$types';

	let { form }: { form: ActionData } = $props();

	let isLoading = $state(false);

	const handleLogin: SubmitFunction = () => {
		isLoading = true;

		return async ({ update }) => {
			await update();
			isLoading = false;
		};
	};

	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	const redirectUri = import.meta.env.VITE_GOOGLE_OAUTH_CALLBACK_URL;
	const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;
</script>

<div class="flex min-h-[80vh] items-center justify-center px-4">
	<div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
		<div class="mb-8 text-center">
			<h1 class="mb-2 text-3xl font-bold text-slate-900">ยินดีต้อนรับ</h1>
			<p class="text-slate-500">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
		</div>

		<form method="POST" use:enhance={handleLogin} class="space-y-5">
			<div>
				<label for="email" class="mb-1 block text-sm font-medium text-slate-700">
					อีเมล
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					disabled={isLoading}
					value={form?.email ?? ''}
					class="w-full rounded-lg border border-slate-300 px-4 py-2 transition-colors outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					placeholder="you@example.com"
				/>
			</div>

			<div>
				<label for="password" class="mb-1 block text-sm font-medium text-slate-700">
					รหัสผ่าน
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					disabled={isLoading}
					class="w-full rounded-lg border border-slate-300 px-4 py-2 transition-colors outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
				/>
			</div>

			{#if form?.message}
				<div
					class="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600"
				>
					<svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>{form.message}</span>
				</div>
			{/if}

			<button
				type="submit"
				disabled={isLoading}
				class="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 font-medium text-white transition-colors"
			>
				{#if isLoading}
					<svg
						class="h-5 w-5 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						><circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle><path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path></svg
					>
					กำลังเข้าสู่ระบบ...
				{:else}
					เข้าสู่ระบบ
				{/if}
			</button>
		</form>

		<div class="relative my-6">
			<div class="absolute inset-0 flex items-center">
				<span class="w-full border-t border-slate-200"></span>
			</div>
			<div class="relative flex justify-center text-xs uppercase">
				<span class="bg-white px-2 text-slate-500">หรือเข้าสู่ระบบด้วย</span>
			</div>
		</div>

		<a
			href={googleLoginUrl}
			class="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white py-2.5 font-medium transition-colors hover:bg-slate-50"
		>
			<img
				src="https://www.svgrepo.com/show/475656/google-color.svg"
				class="h-5 w-5"
				alt="Google"
			/>
			Google
		</a>
	</div>
</div>
