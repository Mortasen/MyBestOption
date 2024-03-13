<script lang="ts">
	import "../app.pcss";
	import { onMount } from 'svelte';

	let ready: boolean = false;
	onMount(() => (ready = true));
</script>

<div class="dragbar"></div>
<div class="w-screen h-screen overflow-hidden flex flex-col bg-gray-50">
	<div class="p-4 text-center font-semibold bg-teal-400 shadow-xl">
		<h1 class="text-xl">BestChoice</h1>
	</div>
	{#if ready}
		<slot></slot>
	{/if}
</div>

<style>
    .dragbar {
        -webkit-app-region: drag;
        position: absolute;
        z-index: 100;
        height: 40px;
        width: 100%;
    }
</style>
