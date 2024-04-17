<script>
	// Label displayed on top
	export let title = 'Sign in to platform';
	// Controls whether to show remmeber me checkbox
	export let rememberMe = false;
	// Controls whether to show lost password link
	export let lostPassword = false;
	// Controls whether to show alternative text and link
	export let alternative = false;
	// Text to display for alternative link
	export let alternativeText = '';
	// Link to the alternative
	export let alternativeLink = '';
	// Text to display for the alternative link
	export let alternativeLinkText = '';
	// Link to the lost password page
	export let lostPasswordLink = '';
	// Label for the submit button
	export let submitButtonLabel = 'Login to your account';
	// Classes for the form
	export let mainClass = 'bg-gray-50 w-full';
	// Classes for the main div
	export let mainDivClass =
		'flex flex-col items-center justify-center mx-auto pt:mt-0';
	// Classes for the card h1
	export let cardH1Class = 'text-2xl font-bold text-center';
</script>

<div class={mainClass}>
	<div class={mainDivClass}>
		<!-- Card -->
		<div class="w-full max-w-md">
			<h1 class={cardH1Class}>
				{title}
			</h1>
			<form class="mt-8 flex flex-col gap-6" on:submit|preventDefault>
				<slot />
				{#if rememberMe || lostPassword}
					<div class="flex items-start">
						{#if rememberMe}
							<label>
								<input type="checkbox" name="remember" class="text-primary-500 mr-2 size-4">Remember me
							</label>
						{/if}
						{#if lostPassword}
							<a href={lostPasswordLink} class="ml-auto hover:no-underline transition">Lost Password?</a>
						{/if}
					</div>
				{/if}
				<button type="submit" class="px-4 py-3 rounded-lg font-medium">
					{submitButtonLabel}
				</button>
				{#if alternative}
					<div class="text-md text-center">
						{alternativeText} <a href={alternativeLink} class="transition">{alternativeLinkText}</a>
					</div>
				{/if}
			</form>
		</div>
	</div>
</div>
