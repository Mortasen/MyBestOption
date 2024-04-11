<script>
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { orderBy } from 'firebase/firestore';

	import { any } from '$lib/utils.js';
	import { collectionStore, user } from '$lib/_firebase.js';
	import { goto } from '$app/navigation';


	const TAG_COLORS = {
		'Бізнес': 'bg-red-600',
		'Навчання': 'bg-orange-600',
		'Програмування': 'bg-sky-600',
		'Технології': 'bg-fuchsia-600',
		'Інше': 'bg-green-600'
	}


	onMount(() => {
		console.log('User:', $user);
		if ($user === null) {
			goto('/auth/sign-in');
		}
	})

	let flowcharts = collectionStore('flowcharts', orderBy('created', 'desc'));

	$: flowchartsFiltered = $flowcharts.filter(f => {
		if (selectedTags.length !== 0) {
			return any(selectedTags.map(t => f.tags.includes(t)));
		}
		return true;
	})
	let selectedTags = [];
</script>

<div class="lg:justify-center flex flex-row gap-2 mb-3 lg:mb-6">
	{#each Object.keys(TAG_COLORS) as tag}
		<label class="p-1 text-white text-sm {TAG_COLORS[tag]} rounded bg-opacity-35 has-[:checked]:bg-opacity-100 cursor-pointer">
			{tag}
			<input type="checkbox" bind:group={selectedTags} value={tag} class="hidden">
		</label>
	{/each}
</div>
<main class="
	w-full flex-col gap-6 max-h-full overflow-y-auto
	lg:px-12 lg:flex-row lg:flex-wrap lg:justify-center
	xl:px-32
	3xl:px-40
">
	{#each flowchartsFiltered as flowchart}
		<a href="/flowchart/{flowchart.id}"
		   class="
		   		w-full lg:w-96 p-4 text-black hover:text-black
		   		hover:opacity-70 flex-col gap-2 rounded-xl
		   		bg-opacity-15 {TAG_COLORS[flowchart.tags[0]]}
		">
			<h2 class="font-medium lg:h-16">{flowchart.title}</h2>
			<div class="flex-row">
				{#each flowchart.tags as tag}
					<div class="p-1 text-white text-sm {TAG_COLORS[tag]} rounded">{tag}</div>
				{/each}
			</div>
			<p>Додано: {flowchart.created}</p>
			<div class="w-full h-2 bg-white rounded-full overflow-hidden">
				<div class="h-full {TAG_COLORS[flowchart.tags[0]]}" style="width: {flowchart.rating}%"></div>
			</div>
		</a>
	{/each}
</main>
<a href="/edit-flowchart" class="absolute right-8 bottom-8 p-3 bg-primary-300 rounded-xl shadow-xl">
	<Icon icon="ph:plus-bold" class="size-6 xl:size-10" />
</a>