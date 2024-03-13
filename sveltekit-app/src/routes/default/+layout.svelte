<script lang="ts">
	import "../app.pcss";
    import { onMount } from 'svelte';

    let ready: boolean = false;
    onMount(() => (ready = true));
</script>

<div class="dragbar"></div>

{#if ready}
	<slot></slot>
{/if}

<style>
	.dragbar {
		-webkit-app-region: drag;
		position: absolute;
		z-index: 100;
		height: 40px;
		width: 100%;
	}
</style>
