<script>
	export let title = 'Sign in to platform';
	export let rememberMe = false;
	export let lostPassword = false;
	export let alternative = false;
	export let alternativeText = '';
	export let alternativeLink = '';
	export let alternativeLinkText = '';
	export let lostPasswordLink = '';
	export let submitButtonLabel = 'Login to your account';

	export let mainClass = 'bg-gray-50 dark:bg-gray-900 w-full';
	export let mainDivClass =
		'flex flex-col items-center justify-center p-24 mx-auto pt:mt-0 dark:bg-gray-900';
	export let cardH1Class = 'text-2xl font-bold text-gray-900 dark:text-white text-center';
</script>

<div class={mainClass}>
	<div class={mainDivClass}>
		<!-- Card -->
		<div class="w-full !p-10 max-w-md">
			<h1 class={cardH1Class}>
				{title}
			</h1>
			<form class="mt-8 space-y-6" on:submit|preventDefault>
				<slot />
				{#if rememberMe || lostPassword}
					<div class="flex items-start">
						{#if rememberMe}
							<input type="checkbox" name="remember">Remember me</input>
						{/if}
						{#if lostPassword}
							<a href={lostPasswordLink} class="ml-auto text-sm hover:no-underline hover:text-white transition">Lost Password?</a>
						{/if}
					</div>
				{/if}
				<div class="flex justify-center">
					<button type="submit">{submitButtonLabel}</button>
				</div>
				{#if alternative}
					<div class="text-md text-center text-gray-500 dark:text-gray-400">
						{alternativeText} <a href={alternativeLink} class="hover:no-underline hover:text-white transition">{alternativeLinkText}</a>
					</div>
				{/if}
			</form>
		</div>
	</div>
</div>
