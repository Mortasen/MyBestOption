<script>
	import { onMount } from 'svelte';

	import { db, user } from '$lib/_firebase.js';
	import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

	import { Flowchart, Question } from '$lib/types.js';

	const flowchartsCollection = collection(db, 'flowcharts');
	const questionsCollection = collection(db, 'questions');


	let selectFlowchartAccordeon = true;
	let editFlowchartAccordeon = false;
	let questionsAccordeon = false;
	let editQuestionAccordeon = false;
	let selectAnswerAccordeon = false;
	let editAnswerAccordeon = false;



	let flowcharts = [];

	onMount(() => {
		const q = query(
			flowchartsCollection,
			where("author", "==", $user.uid)
		);
		getDocs(q).then(snapshot => {
			flowcharts = snapshot.docs.map(doc => Flowchart.initFromDoc(doc));
			console.log('flowcharts:', flowcharts);
		});
	})

	let selectedFlowchart = new Flowchart();

	function chooseFlowchart (flowchart) {
		if (flowchart !== undefined)
			selectedFlowchart = flowchart;
		selectFlowchartAccordeon = false;
		editFlowchartAccordeon = true;
	}

	function saveFlowchart () {
		if (selectedFlowchart._uid === null) {
			selectedFlowchart.createDoc(flowcharts, $user.uid);
		} else {
			selectedFlowchart.save();
		}
		fetchQuestions()
	}





	let questions = [];
	function fetchQuestions () {
		const q = query(
			questionsCollection,
			where("flowchart_id", "==", selectedFlowchart._uid)
		);
		getDocs(q).then(snapshot => {
			editFlowchartAccordeon = false;
			questionsAccordeon = true;

			let questionsSnapshot = snapshot.docs;
			questions = snapshot.docs.map(doc => Question.initFromDoc(doc));
			console.log(questions);
		});

	}

	let selectedQuestion = new Question();

	function chooseQuestion (question) {
		if (question !== undefined)
			selectedQuestion = question;
		console.log('chooseQuestion:', question);
		questionsAccordeon = false;
		editQuestionAccordeon = true;
	}

	function saveQuestion () {
		if (selectedQuestion._uid === null) {
			selectedQuestion.createDoc(questions.length + 1, questions, $user.uid, selectedFlowchart._uid);
		} else {
			selectedQuestion.save();
		}
		editQuestionAccordeon = false;
		selectAnswerAccordeon = true;
	}


	let selectedAnswerIndex = null;
	let selectedAnswer = { text: '', next_question: null };

	function chooseAnswer (answerIndex) {
		console.log('q', selectedQuestion);
		console.log('answerIndex:', answerIndex);
		if (answerIndex === undefined) {
			let answer = { text: '', next_question: null };
			selectedAnswerIndex = selectedQuestion.answers.length;
			console.log('undef', selectedAnswerIndex);
			selectedQuestion.answers = [...selectedQuestion.answers, answer];
		} else {
			selectedAnswerIndex = answerIndex;
		}
		console.log('selectedAnswerIndex:', selectedAnswerIndex);
		selectAnswerAccordeon = false;
		editAnswerAccordeon = true;
	}

	function saveAnswer () {
		console.log('SAVE selectedAnswer:', selectedAnswerIndex);
		// selectedQuestion.answers = selectedQuestion.answers;
		console.log('question:', selectedQuestion);
		selectedQuestion.save();
		selectAnswerAccordeon = true;
		editAnswerAccordeon = false;
	}
</script>

<style>
	#top > div {
		@apply overflow-hidden max-h-12 has-[:checked]:max-h-screen bg-purple-100 rounded-lg transition-all shadow-lg;
	}

	#top > div > label {
        @apply flex justify-center items-center text-white font-semibold h-12 rounded-lg cursor-pointer hover:opacity-90;
	}
</style>

<div id="top" class="size-full flex flex-col gap-4">
	<div>
		<label class="bg-purple-500">
			Алгоритм
			<input bind:checked={selectFlowchartAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			{#each flowcharts as flowchart}
				<button on:click={() => chooseFlowchart(flowchart)} class="bg-purple-400 hover:bg-purple-600">
					{flowchart.title}
				</button>
			{/each}
			<button on:click={() => chooseFlowchart()} class="bg-purple-400 hover:bg-purple-600">
				НОВИЙ АЛГОРИТМ
			</button>
		</div>
	</div>

	<div>
		<label class="bg-red-500">
			Редагувати Алгоритм
			<input bind:checked={editFlowchartAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			<input bind:value={selectedFlowchart.title} type="text">
			<button on:click={saveFlowchart} class="bg-red-400 hover:bg-red-600">Редагувати питання</button>
		</div>
	</div>

	<div>
		<label class="bg-orange-500">
			Питання
			<input bind:checked={questionsAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			{#each questions as question}
				<button on:click={() => chooseQuestion(question)} class="bg-orange-400 hover:bg-orange-600">
					{question.id}. {question.text}
				</button>
			{/each}
			<button on:click={() => chooseQuestion()} class="bg-orange-400 hover:bg-orange-600">
				НОВЕ ПИТАННЯ
			</button>
		</div>
	</div>

	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-screen bg-yellow-100 rounded-lg transition-[max-height]">
		<label class="flex justify-center items-center text-white font-semibold h-12 bg-yellow-500 rounded-lg">
			Редагувати Питання
			<input bind:checked={editQuestionAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			<input bind:value={selectedQuestion.text} type="text">
			<button on:click={saveQuestion} class="bg-yellow-400 hover:bg-yellow-600">Редагувати питання</button>
		</div>
	</div>

	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-screen bg-lime-100 rounded-lg transition-[max-height]">
		<label class="flex justify-center items-center text-white font-semibold h-12 bg-lime-500 rounded-lg">
			Відповіді
			<input bind:checked={selectAnswerAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			{#each selectedQuestion.answers as answer, index}
				<button on:click={() => chooseAnswer(index)} class="bg-lime-400 hover:bg-lime-600">
					{answer.text}
				</button>
			{/each}
			<button on:click={() => chooseAnswer()} class="bg-lime-400 hover:bg-lime-600">
				НОВА ВІДПОВІДЬ
			</button>
		</div>
	</div>

	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-screen bg-green-100 rounded-lg transition-[max-height]">
		<label class="flex justify-center items-center text-white font-semibold h-12 bg-green-500 rounded-lg">
			Редагувати Відповідь
			<input bind:checked={editAnswerAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="p-2 flex flex-col gap-2">
			{#if selectedQuestion.answers && selectedAnswerIndex !== null}
				<input bind:value={selectedQuestion.answers[selectedAnswerIndex].text} type="text">
				<label>
					<input bind:value={selectedQuestion.answers[selectedAnswerIndex].next_question} type="text">
				</label>
				<button on:click={saveAnswer} class="bg-green-400 hover:bg-green-600">Зберегти відповідь</button>
			{/if}
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