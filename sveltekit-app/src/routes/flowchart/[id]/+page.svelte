<script>
	import { db, collectionStore, user } from '$lib/_firebase.js';

	import { doc, updateDoc, where } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let data;

	// Initial data to display while loading
	let flowchart = {
		'id': 1,
		'title': 'Який фреймворк для розробки кросплатформеного додатка вибрати?',
		'rating': 45,
		'added': '2024-03-13',
		'tags': ['Бізнес']
	};

	// Progress bar
	let questionsPassed = 0;
	// When there are less than 3 questions, progress is calculated differently
	$: progress = currentQuestion.answers.length ? (questionsPassed < 2 ? questionsPassed / 3 : questionsPassed / (questionsPassed + 1)): 1;

	// Get questions for this flowchart
	let questions = collectionStore('questions', where('flowchart_id', '==', data.id));

	// Get current question
	let currentIndex = 0;
	$: currentQuestion = getCurrentQuestion($questions, currentIndex);

	onMount(() => {
		currentIndex = 1;
	})

	function getCurrentQuestion (questions, currentIndex) {
		/**
		 * Finds the current question by index
		 */
		// console.log('Questions:', questions);
		// console.log('Index', currentIndex);
		let res = questions.find(q => q.index == currentIndex);
		console.log('res', res);
		return res || {answers: []};
	}

	function chooseAnswer (answer) {
		/**
		 * Chooses an answer and moves to the next question
		 */
		console.log('Next question:', answer.next_question);
		currentIndex = answer.next_question;
		questionsPassed++;
	}
</script>

<div class="size-full flex flex-col gap-4 md:px-24 lg:px-48 xl:px-72">
	<p class="text-center">{flowchart.title}</p>
	<div class="h-24 flex flex-col justify-center">
		<h2 class="text-center font-medium text-xl">{currentQuestion.text}</h2>
	</div>
	<div class="w-full h-4 rounded-full bg-white border-2 border-teal-900 mb-4">
		<div class="h-full bg-primary-700" style="width: {progress * 100}%;" />
	</div>
	<div class="flex flex-col gap-6">
		{#if currentQuestion.answers.length}
			{#each currentQuestion.answers as answer}
				<button on:click={() => chooseAnswer(answer)}
						class="p-4 bg-primary-200 rounded-lg text-lg font-medium hover:bg-primary-500 transition">
					{answer.text}
				</button>
			{/each}
		{:else}
			<div>
				<h3>Оцініть пройдений алгоритм: <span class="font-bold">{flowchart.rating}</span></h3>
				<div>
					<input type="range" min="0" max="100" step="5" bind:value={flowchart.rating} />
				</div>
			</div>
			<button on:click={() => updateDoc(doc(db, 'flowcharts', data.id), { rating: flowchart.rating })}
					class="w-full text-center text-black hover:text-black p-4 bg-primary-200 rounded-lg text-lg font-medium hover:bg-primary-500 transition">
				Залишити відгук
			</button>
			<a href="/" class="w-full text-center text-black hover:text-black p-4 bg-primary-200 rounded-lg text-lg font-medium hover:bg-primary-500 transition">
				Вийти в меню
			</a>
		{/if}
	</div>
</div>