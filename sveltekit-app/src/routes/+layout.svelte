<script lang="ts">
	import "../app.pcss";
	import { onMount } from 'svelte';
	import { user } from "$lib/_firebase.js";
	$user;

	let ready: boolean = false;
	onMount(() => {
		ready = true;
	});
</script>

<div class="w-screen h-screen overflow-hidden flex flex-col bg-gray-50">
	<div class="min-h-16 p-4 text-center bg-teal-400 shadow-xl flex relative">
		<div class="w-full text-xl text-center font-semibold">
			<h1>BestChoice</h1>
		</div>
		<div class="absolute">
			<a href="/" class="px-2 py-1 bg-teal-600 rounded-lg block hover:bg-teal-700 text-white transition">
				Back
			</a>
		</div>
	</div>
	{#if ready}
		<div class="flex-grow min-h-0 p-4">
			<main class="size-full">
				<slot />
			</main>
		</div>
	{/if}
</div>