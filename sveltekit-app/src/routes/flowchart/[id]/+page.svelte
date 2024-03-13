<script>
	export let data;

	let flowchart = {
		'id': 1,
		'title': 'Який фреймворк для розробки кросплатформеного додатка вибрати?',
		'rating': 45,
		'added': '2024-03-13',
		'tags': ['Бізнес']
	};

	let questionsPassed = 0;
	$: progress = questionsPassed < 3 ? questionsPassed / 4 : (questionsPassed < 7 ? questionsPassed / (questionsPassed + 2) : questionsPassed / (questionsPassed + 1));

	let questions = [
		{
			id: 1,
			question: 'Чи знайомі ви з веб-технологіями?',
			answers: [
				{ answer: 'Так', nextQuestion: 2 },
				{ answer: 'Дещо', nextQuestion: 3 },
				{ answer: 'Ні', nextQuestion: 4 }
			]
		},
		{
			id: 2,
			question: 'Чи важливо вам мати можливість оновлювати застосунок без перевірки?',
			answers: [
				{ answer: 'Надзвичайно', nextQuestion: 1 },
				{ answer: 'Було б непогано', nextQuestion: 7 },
				{ answer: 'Скоріше так', nextQuestion: 8 },
				{ answer: 'Ні', nextQuestion: 9 },
				{ answer: 'Ні', nextQuestion: 9 }
			]
		},
		{
			id: 2,
			question: 'Чи важливо вам мати можливість оновлювати застосунок без перевірки?',
			answers: [
				{ answer: 'Надзвичайно', nextQuestion: 6 },
				{ answer: 'Було б непогано', nextQuestion: 7 },
				{ answer: 'Скоріше так', nextQuestion: 8 },
				{ answer: 'Ні', nextQuestion: 9 }
			]
		},
		{
			id: 2,
			question: 'Чи важливо вам мати можливість оновлювати застосунок без перевірки?',
			answers: [
				{ answer: 'Надзвичайно', nextQuestion: 6 },
				{ answer: 'Було б непогано', nextQuestion: 7 },
				{ answer: 'Скоріше так', nextQuestion: 8 },
				{ answer: 'Ні', nextQuestion: 9 }
			]
		},
		{
			id: 2,
			question: 'Чи важливо вам мати можливість оновлювати застосунок без перевірки?',
			answers: [
				{ answer: 'Надзвичайно', nextQuestion: 6 },
				{ answer: 'Було б непогано', nextQuestion: 7 },
				{ answer: 'Скоріше так', nextQuestion: 8 },
				{ answer: 'Ні', nextQuestion: 9 }
			]
		},
		{
			id: 2,
			question: 'Чи важливо вам мати можливість оновлювати застосунок без перевірки?',
			answers: [
				{ answer: 'Надзвичайно', nextQuestion: 6 },
				{ answer: 'Було б непогано', nextQuestion: 7 },
				{ answer: 'Скоріше так', nextQuestion: 8 },
				{ answer: 'Ні', nextQuestion: 9 }
			]
		},
	]
	let currentId = 1;
	$: currentQuestion = questions.find(q => q.id === currentId);

	function chooseAnswer (answer) {
		currentId = answer.nextQuestion;
		questionsPassed++;
	}
</script>

<div class="size-full flex flex-col gap-4">
	<p class="text-center">{flowchart.title}</p>
	<div class="h-24 flex flex-col justify-center">
		<h2 class="text-center font-medium text-xl">{currentQuestion.question}</h2>
	</div>
	<div class="w-full h-4 rounded-full bg-white border-2 border-teal-900 mb-4">
		<div class="h-full bg-teal-700" style="width: {progress * 100}%;" />
	</div>
	<div class="flex flex-col gap-6">
		{#each currentQuestion.answers as answer}
			<button on:click={() => chooseAnswer(answer)}
					class="p-4 bg-teal-200 rounded-lg text-lg font-medium hover:bg-teal-500 transition">
				{answer.answer}
			</button>
		{/each}
	</div>
</div>