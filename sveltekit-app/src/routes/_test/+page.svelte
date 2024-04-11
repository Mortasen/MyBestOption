<script>
	let x = 0;
</script>

<div>
	<h1>This is test page</h1>
	<p>Count: {x}</p>
	<button on:click={() => x++} style="padding: 8px; color: white; background-color: orange">
		Increment
	</button>
</div>