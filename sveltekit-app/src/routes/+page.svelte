<script>
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const TAG_COLORS = {
		'Бізнес': 'bg-red-600',
		'Навчання': 'bg-orange-600',
		'Програмування': 'bg-sky-600',
		'Технології': 'bg-fuchsia-600',
		'Інше': 'bg-green-600'
	}
	// let data = [
	// 	{
	// 		'id': 1,
	// 		'title': 'Який фреймворк для розробки кросплатформеного додатка вибрати?',
	// 		'rating': 45,
	// 		'added': '2024-03-13',
	// 		'tags': ['Бізнес']
	// 	},
	// 	{
	// 		'title': 'Куди найкраще вступити на ІТ в 2024',
	// 		'rating': 80,
	// 		'added': '2024-03-11',
	// 		'tags': ['Навчання']
	// 	},
	// 	{
	// 		'id': 2,
	// 		'title': 'Перша мова програмування',
	// 		'rating': 85,
	// 		'added': '2024-03-03',
	// 		'tags': ['Програмування']
	// 	},
	// 	{
	// 		'id': 3,
	// 		'title': 'Підбір оптимальної операційної системи!',
	// 		'rating': 70,
	// 		'added': '2024-03-07',
	// 		'tags': ['Технології']
	// 	},
	// 	{
	// 		'title': 'Куди сходити на перше побачення?',
	// 		'rating': 45,
	// 		'added': '2024-03-09',
	// 		'tags': ['Інше']
	// 	},
	// 	{
	// 		'title': 'Перша мова програмування',
	// 		'rating': 85,
	// 		'added': '2024-03-03',
	// 		'tags': ['Програмування']
	// 	},
	// 	{
	// 		'title': 'Підбір оптимальної операційної системи!',
	// 		'rating': 70,
	// 		'added': '2024-03-07',
	// 		'tags': ['Технології']
	// 	},
	// 	{
	// 		'title': 'Куди найкраще вступити на ІТ в 2024',
	// 		'rating': 80,
	// 		'added': '2024-03-11',
	// 		'tags': ['Навчання']
	// 	},
	// ]

	//

	function any(iterable) {
		for (let index = 0; index < iterable.length; index++) {
			if (iterable[index]) return true;
		}
		return false;
	}


	import { collectionStore } from '$lib/_firebase.js';
	import { orderBy } from 'firebase/firestore';

	let flowcharts = collectionStore('flowcharts', orderBy('created', 'desc'));

	$: flowchartsFiltered = $flowcharts.filter(f => {
		if (selectedTags.length !== 0) {
			return any(selectedTags.map(t => f.tags.includes(t)));
		}
		return true;
	})
	let selectedTags = [];
</script>

<div class="flex flex-row gap-2 mb-3">
	{#each Object.keys(TAG_COLORS) as tag}
		<label class="p-1 text-white text-sm {TAG_COLORS[tag]} rounded bg-opacity-35 has-[:checked]:bg-opacity-100 cursor-pointer">
			{tag}
			<input type="checkbox" bind:group={selectedTags} value={tag} class="hidden">
		</label>
	{/each}
</div>
<main class="w-full flex flex-col gap-6 max-h-full overflow-y-auto">
	{#each flowchartsFiltered as flowchart}
		<a href="/flowchart/{flowchart.id}" class="w-full p-4 text-black hover:text-black hover:opacity-70 flex flex-col gap-2 rounded-xl bg-opacity-15 {TAG_COLORS[flowchart.tags[0]]}">
			<h2 class="font-medium">{flowchart.title}</h2>
			<div class="flex flex-row">
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
<a href="/edit-flowchart" class="absolute right-8 bottom-8 p-3 bg-teal-300 rounded-xl shadow-xl">
	<Icon icon="ph:plus-bold" class="size-6" />
</a>