<script>
	import { onMount } from 'svelte';

	let dataW = [
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
				{ answer: 'Надзвичайно', nextQuestion: 6 },
				{ answer: 'Було б непогано', nextQuestion: 7 },
				{ answer: 'Скоріше так', nextQuestion: 8 },
				{ answer: 'Ні', nextQuestion: 9 },
				{ answer: 'Ні', nextQuestion: 9 }
			]
		},
		{
			id: 3,
			question: 'Чи подобаються вам low- та no-code рішення?',
			answers: [
				{ answer: 'Абсолютно!', nextQuestion: 6 },
				{ answer: 'Напевно так', nextQuestion: 7 },
				{ answer: 'Напевно ні', nextQuestion: 8 },
				{ answer: 'Точно ні', nextQuestion: 9 }
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

	let currentFlowchart;
	let current = undefined;

	import { db, user } from '$lib/_firebase.js';
	import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

	const flowchartsCollection = collection(db, 'flowcharts');
	const questionsCollection = collection(db, 'questions');
	let flowcharts = [];
	let flowchartsSnapshot;

	onMount(() => {
		const q = query(
			flowchartsCollection,
			where("author", "==", $user.uid)
		);
		getDocs(q).then(snapshot => {
			flowchartsSnapshot = snapshot.docs;
			flowcharts = snapshot.docs.map(doc => {
				let d = doc.data();
				d.id = doc.id;
				return d;
			});
			console.log(flowcharts);
		});
	})

	let selectedFlowchartId;
	let flowchartTitle = '';

	let selectFlowchartAccordeon = true;
	let editFlowchartAccordeon = false;
	let questionsAccordeon = false;
	let editQuestionAccordeon = false;
	let selectAnswerAccordeon = false;
	let editAnswerAccordeon = false;

	class Question {
		_doc = null;
		_uid = null;
		text = '';
		answers = [];

		initFromDoc (doc) {
			this._doc = doc;
			this._uid = doc.id;
			let data = doc.data();
			this.text = data.text;
			this.answers = data.answers;
			return this;
		}
		findByUID (uid) {

		}
		save () {
			return updateDoc(this._doc, {
				text: this.text,
				answers: this.answers
			})
		}
	}

	function editFlowchart () {
		if (selectedFlowchartId == '#new') {
			console.log('creating');
			addDoc(flowchartsCollection, { title: flowchartTitle, author: $user.uid });
			fetchQuestions()
		} else {
			console.log('existing');
			updateDoc(doc(flowchartsCollection, selectedFlowchartId), { title: flowchartTitle });
			fetchQuestions()
		}
	}

	function editQuestion () {
		if (selectedQuestion.id == '#new') {
			console.log('creating');
			addDoc(questionsCollection, {
				id: questions.length + 1,
				text: selectedQuestion.text,
				author: $user.uid,
				flowchart_id: selectedFlowchartId,
				answers: [],
			});
		} else {
			console.log('existing');
			updateDoc(doc(questionsCollection, selectedQuestion.uid), { text: selectedQuestion.text });
			editQuestionAccordeon = false;
			selectAnswerAccordeon = true;
		}
	}

	function editAnswer () {
		console.log('answers:', selectedQuestion.answers)
		updateDoc(doc(questionsCollection, selectedQuestion.id), { answers: selectedQuestion.answers });
		selectAnswerAccordeon = true;
		editAnswerAccordeon = false;
	}

	function chooseFlowchart (flowchart) {
		console.log(flowchart);
		selectedFlowchartId = flowchart.id;
		flowchartTitle = flowchart.title;
		selectFlowchartAccordeon = false;
		editFlowchartAccordeon = true;
	}

	let selectedQuestion = { id: null, text: null, answers: [] };

	function chooseQuestion (question) {
		console.log(question);
		selectedQuestion = question;
		questionsAccordeon = false;
		editQuestionAccordeon = true;
	}

	let selectedAnswer = {};
	function chooseAnswer (answer) {
		console.log(answer);
		selectedAnswer = answer;
		selectAnswerAccordeon = false;
		editAnswerAccordeon = true;
	}

	let questions = [];
	function fetchQuestions () {
		const q = query(
			questionsCollection,
			where("flowchart_id", "==", selectedFlowchartId)
		);
		getDocs(q).then(snapshot => {
			editFlowchartAccordeon = false;
			questionsAccordeon = true;

			let questionsSnapshot = snapshot.docs;
			questions = snapshot.docs.map(doc => {
				let d = doc.data();
				d.uid = doc.id;
				return d;
			});
			console.log(questions);
		});

	}
</script>

<div class="size-full flex flex-col gap-4">
	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-72 bg-purple-100 rounded-lg transition-[max-height]">
		<label class="flex justify-center items-center text-white font-semibold h-12 bg-purple-500 rounded-lg">
			Алгоритм
			<input bind:checked={selectFlowchartAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			{#each flowcharts as flowchart}
				<button on:click={() => chooseFlowchart(flowchart)}>
					{flowchart.title}
				</button>
			{/each}
			<button on:click={() => chooseFlowchart({ id: '#new', title: ''})}>
				НОВИЙ АЛГОРИТМ
			</button>
		</div>
	</div>

	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-72 bg-red-100 rounded-lg transition-[max-height]">
		<label class="flex justify-center items-center text-white font-semibold h-12 bg-red-500 rounded-lg">
			Редагувати Алгоритм
			<input bind:checked={editFlowchartAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			<input bind:value={flowchartTitle} type="text">
			<button on:click={editFlowchart}>Редагувати питання</button>
		</div>
	</div>

	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-72 bg-orange-100 rounded-lg transition-[max-height]">
		<label class="flex justify-center items-center text-white font-semibold h-12 bg-orange-500 rounded-lg">
			Питання
			<input bind:checked={questionsAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			{#each questions as question}
				<button on:click={() => chooseQuestion(question)}>
					{question.id}. {question.text}
				</button>
			{/each}
			<button on:click={() => chooseQuestion({ id: '#new', text: ''})}>
				НОВЕ ПИТАННЯ
			</button>
		</div>
	</div>

	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-72 bg-yellow-100 rounded-lg transition-[max-height]">
		<label class="flex justify-center items-center text-white font-semibold h-12 bg-yellow-500 rounded-lg">
			Редагувати Питання
			<input bind:checked={editQuestionAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			<input bind:value={selectedQuestion.text} type="text">
			<button on:click={editQuestion}>Редагувати питання</button>
		</div>
	</div>

	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-72 bg-lime-100 rounded-lg transition-[max-height]">
		<label class="flex justify-center items-center text-white font-semibold h-12 bg-lime-500 rounded-lg">
			Відповіді
			<input bind:checked={selectAnswerAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			{#each selectedQuestion.answers as answer}
				<button on:click={() => chooseAnswer(answer)}>
					{answer.text}
				</button>
			{/each}
			<button on:click={() => chooseAnswer({ id: '#new', text: ''})}>
				НОВА ВІДПОВІДЬ
			</button>
		</div>
	</div>

	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-72 bg-green-100 rounded-lg transition-[max-height]">
		<label class="flex justify-center items-center text-white font-semibold h-12 bg-green-500 rounded-lg">
			Редагувати Відповідь
			<input bind:checked={editAnswerAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			<input bind:value={selectedAnswer.text} type="text">
			<label>
				<input bind:value={selectedAnswer.next_question} type="text">
			</label>
			<button on:click={editAnswer}>Зберегти відповідь</button>
		</div>
	</div>
<!--	<div class="flex-1 min-h-0 bg-teal-100 rounded-lg">-->
<!--		<div class="p-2 size-full overflow-y-scroll">-->
<!--			<h2 class="text-center font-semibold py-2">Питання</h2>-->
<!--			<div class="flex flex-col gap-4">-->
<!--				{#each data as question, index}-->
<!--					<button on:click={() => current = index}-->
<!--							class="bg-teal-300 rounded-lg p-2 w-full"-->
<!--					>-->
<!--						{question.id}. {question.question}-->
<!--					</button>-->
<!--				{/each}-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!--	<div class="flex-1 min-h-0 bg-amber-100 rounded-lg">-->
<!--		<div class="p-2 size-full overflow-y-scroll">-->
<!--			<h2 class="text-center font-semibold py-2">Відповіді запитання {current}</h2>-->
<!--			{#if current === undefined}-->
<!--				<p>Виберіть запитання вище, щоб побачити варіанти відповіді</p>-->
<!--			{:else}-->
<!--				<div class="flex flex-col gap-4">-->
<!--					{#each data[current].answers as answer, index}-->
<!--						<div class="p-2 bg-amber-300 rounded-lg space-y-2">-->
<!--							<input bind:value={answer.answer} type="text" class="p-1 w-full bg-amber-50">-->
<!--							<div>-->
<!--								<span>Наступне питання:</span>-->
<!--								<input bind:value={answer.nextQuestion} type="text" class="p-1 w-8 bg-amber-50">-->
<!--							</div>-->
<!--						</div>-->
<!--					{/each}-->
<!--				</div>-->
<!--			{/if}-->
<!--		</div>-->
<!--	</div>-->
</div>