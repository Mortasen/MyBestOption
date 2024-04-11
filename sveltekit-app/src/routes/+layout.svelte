<script lang="ts">
	import { signOut } from 'firebase/auth';

	import "../app.pcss";
	import { onMount } from 'svelte';
	import { user, auth } from "$lib/_firebase.js";
	$user;

	let ready: boolean = false;
	onMount(() => {
		ready = true;
	});
</script>

<div class="w-screen h-screen overflow-hidden flex flex-col bg-gray-50">
	<div class="p-4 text-center bg-primary-400 shadow-xl flex relative">
		<div class="flex-size flex justify-start">
			<a href="/" class="max-w-20 px-2 py-1 bg-primary-600 rounded-lg block hover:bg-teal-700 text-white transition">
				Назад
			</a>
		</div>
		<div class="text-xl text-center font-semibold">
			<h1>BestChoice</h1>
		</div>
		<div class="flex-size flex-row items-end justify-end items-center">
			<span class="hidden sm:block pr-2 lg:pr-8">{$user !== null ? $user.email : ''}</span>
			<button on:click={() => signOut(auth)} class="px-2 py-1 bg-primary-600 rounded-lg block hover:bg-teal-700 text-white transition">
				Вийти
			</button>
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