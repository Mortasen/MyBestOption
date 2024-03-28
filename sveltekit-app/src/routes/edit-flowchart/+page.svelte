<script>
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	import { db, user, collectionStore } from '$lib/_firebase.js';
	import { where, orderBy } from 'firebase/firestore';

	import { Flowchart, Question } from '$lib/types.js';
	import { writable } from 'svelte/store';


	let selectFlowchartAccordeon = true;
	let editFlowchartAccordeon = false;

	let selectQuestionAccordeon = false;
	let editQuestionAccordeon = false;

	let selectAnswerAccordeon = false;
	let editAnswerAccordeon = false;



	let flowcharts = writable(null);

	onMount(() => {
		console.log('onMount', $user.uid);
		flowcharts = collectionStore('flowcharts', where("author", "==", $user.uid));
	});

	let selectedFlowchart = new Flowchart();

	function selectFlowchart (flowchart) {
		selectFlowchartAccordeon = false;
		if (flowchart !== undefined) {
			selectedFlowchart = flowchart;
			fetchQuestions();
			selectQuestionAccordeon = true;
		} else {
			editFlowchartAccordeon = true;
		}
		console.log('Flowchart chosen:', selectedFlowchart);
	}

	function saveFlowchart () {
		editFlowchartAccordeon = false;
		if (selectedFlowchart.id === undefined) {
			flowcharts.add(selectedFlowchart.data($user.uid));
			selectFlowchartAccordeon = true;
		} else {
			flowcharts.update(selectedFlowchart.id, selectedFlowchart);
			fetchQuestions();
			selectQuestionAccordeon = true;
		}
	}




	let questions = writable(null);

	function fetchQuestions () {
		console.log('Fetch questions:', selectedFlowchart.id);
		questions = collectionStore('questions',
			where("flowchart_id", "==", selectedFlowchart.id),
			orderBy('index')
		);
	}

	let selectedQuestion = new Question();

	function selectQuestion (question) {
		selectQuestionAccordeon = false;
		if (question !== undefined) {
			selectedQuestion = question;
			selectAnswerAccordeon = true;
		} else {
			editQuestionAccordeon = true;
		}
		console.log('Question chosen:', selectedQuestion);
	}

	function saveQuestion () {
		console.log('Question to save:', selectedQuestion);
		editQuestionAccordeon = false;
		if (selectedQuestion.id === undefined) {
			let index = Math.max(0, ...$questions.map(o => o.index)) + 1;
			questions.add(selectedQuestion.data(
				index,
				$user.uid,
				selectedFlowchart.id
			));
			selectQuestionAccordeon = true;
		} else {
			questions.update(selectedQuestion.id, selectedQuestion);
			selectAnswerAccordeon = true;
		}
	}




	// let questions = writable(null);
	// function fetchQuestions () {
	// 	console.log('fetchQuestions', $user.uid);
	// 	questions = collectionStore('questions', where("flowchart_id", "==", selectedFlowchart.id));
	// 	// const q = query(
	// 	// 	questionsCollection,
	// 	// 	where("flowchart_id", "==", selectedFlowchart.id)
	// 	// );
	// 	// getDocs(q).then(snapshot => {
	// 	//
	// 	// 	let questionsSnapshot = snapshot.docs;
	// 	// 	questions = snapshot.docs.map(doc => Question.initFromDoc(doc));
	// 	// 	console.log(questions);
	// 	// });
	// }
	//
	// let selectedQuestion = new Question();
	//
	// function selectQuestion (question) {
	// 	if (question !== undefined)
	// 		selectedQuestion = question;
	// 	console.log('Question chosen:', question);
	// 	selectQuestionAccordeon = false;
	// 	editQuestionAccordeon = true;
	// }
	//
	// function saveQuestion () {
	// 	if (selectedQuestion._uid === null) {
	// 		selectedQuestion.createDoc(questions.length + 1, questions, $user.uid, selectedFlowchart._uid);
	// 	} else {
	// 		selectedQuestion.save();
	// 	}
	// 	editQuestionAccordeon = false;
	// 	selectAnswerAccordeon = true;
	// }


	let selectedAnswerIndex = null;
	let selectedAnswer = { text: '', next_question: null };

	function selectAnswer (answer) {
		selectAnswerAccordeon = false;
		if (answer === undefined) {
			selectedAnswer = { text: '', next_question: null };
		} else {
			selectedAnswer = answer;
		}
		editAnswerAccordeon = true;
	}

	function deleteAnswer (answer) {
		selectedQuestion.answers = selectedQuestion.answers.filter(a => a.index !== answer.index);
		questions.update(selectedQuestion.id, { answers: selectedQuestion.answers });
	}

	function saveAnswer () {
		editAnswerAccordeon = false;
		if (selectedAnswer.index === undefined) {
			selectedAnswer.index = Math.max(0, ...selectedQuestion.answers.map(o => o.index)) + 1;
			selectedQuestion.answers = [...selectedQuestion.answers, selectedAnswer];
			questions.update(selectedQuestion.id, { answers: selectedQuestion.answers });
		} else {
			questions.update(selectedQuestion.id, { answers: selectedQuestion.answers });
		}
		selectAnswerAccordeon = true;
	}

	// function selectAnswer (answerIndex) {
	// 	// console.log('Selected answer index:', answerIndex);
	// 	// console.log('q', selectedQuestion);
	// 	if (answerIndex === undefined) {
	// 		// let answer = { text: '', next_question: null };
	// 		// selectedAnswerIndex = selectedQuestion.answers.length;
	// 		// console.log('undef', selectedAnswerIndex);
	// 		// selectedQuestion.answers = [...selectedQuestion.answers, answer];
	// 	} else {
	// 		selectedAnswerIndex = answerIndex;
	// 	}
	// 	console.log('selectedAnswerIndex:', selectedAnswerIndex);
	// 	selectAnswerAccordeon = false;
	// 	editAnswerAccordeon = true;
	// }
	//
	// function saveAnswer () {
	// 	if
	// 	console.log('SAVE selectedAnswer:', selectedAnswerIndex);
	// 	// selectedQuestion.answers = selectedQuestion.answers;
	// 	console.log('question:', selectedQuestion);
	// 	selectedQuestion.save();
	// 	selectAnswerAccordeon = true;
	// 	editAnswerAccordeon = false;
	// }
</script>

<style>
	#top > div {
		@apply flex flex-col min-h-0 rounded-lg transition-all shadow-lg;
	}

	#top > div > label {
        @apply flex justify-center items-center text-white font-semibold h-12 rounded-lg cursor-pointer hover:opacity-90;
	}

	#top > div > div {
        @apply flex flex-col gap-2;
	}
</style>

<div id="top" class="size-full flex flex-col gap-4">
	<div class="!bg-purple-100 has-[:checked]:flex-grow">
		<label class="peer bg-purple-400">
			Алгоритм {selectFlowchartAccordeon}
			<input bind:checked={selectFlowchartAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="overflow-hidden peer-has-[:checked]:overflow-y-auto max-h-0 peer-has-[:checked]:max-h-screen peer-has-[:checked]:p-2">
			{#if $flowcharts}
				{#each $flowcharts as flowchart}
					<div class="flex flex-nowrap">
						<button on:click={() => selectFlowchart(flowchart)}
								class="flex-grow bg-purple-300 hover:bg-purple-200">
							{flowchart.title}
						</button>
						<button on:click={() => flowcharts.del(flowchart.id)}
								class="ml-2 self-stretch flex-grow-0 px-2 flex justify-center items-center bg-purple-300 hover:bg-purple-200">
							<Icon icon="mingcute:close-line" class="size-6" />
						</button>
					</div>
				{/each}
				<button on:click={() => selectFlowchart()} class="bg-purple-300 hover:bg-purple-200">
					НОВИЙ АЛГОРИТМ
				</button>
			{:else}
				<p>Завантаження...</p>
			{/if}
		</div>
	</div>

	<div class="!bg-red-100">
		<label class="peer bg-red-400">
			Редагувати Алгоритм
			<input bind:checked={editFlowchartAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="overflow-hidden peer-has-[:checked]:overflow-y-auto max-h-0 peer-has-[:checked]:max-h-screen peer-has-[:checked]:p-2">
			<label>
				Заголовок:
				<textarea bind:value={selectedFlowchart.title} type="text" class="h-auto" />
			</label>
			<div>
				<p>Теги:</p>
				<label>
					<input type="checkbox">
					Бізнес
				</label>
				<label>
					<input type="checkbox">
					Технології
				</label>

			</div>
			<button on:click={saveFlowchart} class="bg-red-300 hover:bg-red-200">Зберегти алгоритм</button>
		</div>
	</div>

	<div class="!bg-orange-100">
		<label class="peer bg-orange-400">
			Питання
			<input bind:checked={selectQuestionAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="overflow-hidden peer-has-[:checked]:overflow-y-auto max-h-0 peer-has-[:checked]:max-h-screen peer-has-[:checked]:p-2">
			{#if $questions !== null}
				{#each $questions as question}
					<div class="flex flex-nowrap">
						<button on:click={() => selectQuestion(question)}
								class="flex-grow bg-orange-300 hover:bg-orange-500">
							{question.index}. {question.text}
						</button>
						<button on:click={() => questions.del(question.id)}
								class="ml-2 self-stretch flex-grow-0 px-2 flex justify-center items-center bg-orange-300 hover:bg-orange-500">
							<Icon icon="mingcute:close-line" class="size-6" />
						</button>
					</div>
				{/each}
				<button on:click={() => selectQuestion()} class="bg-orange-300 hover:bg-orange-500">
					НОВЕ ПИТАННЯ
				</button>
			{:else}
				<p>Спочатку виберіть алгоритм!</p>
			{/if}
		</div>
	</div>

	<div class="!bg-yellow-100">
		<label class="peer bg-yellow-500">
			Редагувати Питання
			<input bind:checked={editQuestionAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="overflow-hidden peer-has-[:checked]:overflow-y-auto max-h-0 peer-has-[:checked]:max-h-screen peer-has-[:checked]:p-2">
			<label>
				Питання:
				<textarea bind:value={selectedQuestion.text} type="text" class="h-auto" />
			</label>
			<button on:click={saveQuestion} class="bg-yellow-400 hover:bg-yellow-600">Зберегти питання</button>
		</div>
	</div>

	<div class="!bg-lime-100">
		<label class="peer bg-lime-400">
			Відповідь
			<input bind:checked={selectAnswerAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="overflow-hidden peer-has-[:checked]:overflow-y-auto max-h-0 peer-has-[:checked]:max-h-screen peer-has-[:checked]:p-2">
			{#if selectedQuestion.id !== null}
				{#each selectedQuestion.answers as answer}
					<div class="flex flex-nowrap">
						<button on:click={() => selectAnswer(answer)}
								class="flex-grow bg-lime-300 hover:bg-lime-200">
							{answer.text} → {answer.next_question}
						</button>
						<button on:click={() => deleteAnswer(answer)}
								class="ml-2 self-stretch flex-grow-0 px-2 flex justify-center items-center bg-lime-300 hover:bg-lime-200">
							<Icon icon="mingcute:close-line" class="size-6" />
						</button>
					</div>
				{/each}
				<button on:click={() => selectAnswer()} class="bg-lime-300 hover:bg-lime-200">
					НОВА ВІДПОВІДЬ
				</button>
			{:else}
				<p>Спочатку виберіть питання!</p>
			{/if}
		</div>
	</div>

	<div class="!bg-green-100">
		<label class="peer bg-green-500">
			Редагувати Відповідь
			<input bind:checked={editAnswerAccordeon} type="checkbox" class="hidden">
		</label>
		<div class="overflow-hidden peer-has-[:checked]:overflow-y-auto max-h-0 peer-has-[:checked]:max-h-screen peer-has-[:checked]:p-2">
			<label>
				Відповідь:
				<textarea bind:value={selectedAnswer.text} type="text" class="h-auto" />
			</label>
			<label>
				Наступне питання:
				<input bind:value={selectedAnswer.next_question} type="text" class="h-auto" />
			</label>
			<button on:click={saveAnswer} class="bg-green-400 hover:bg-green-600">
				Зберегти питання
			</button>
		</div>
	</div>

<!--	<div>-->
<!--		<label class="bg-orange-500">-->
<!--			Питання-->
<!--			<input bind:checked={questionsAccordeon} type="checkbox" class="hidden">-->
<!--		</label>-->
<!--		<div class="p-2 flex flex-col gap-2">-->
<!--			{#if questions}-->
<!--				{#each questions as question}-->
<!--					<button on:click={() => chooseQuestion(question)} class="bg-orange-400 hover:bg-orange-600">-->
<!--						{question.id}. {question.text}-->
<!--					</button>-->
<!--				{/each}-->
<!--				<button on:click={() => chooseQuestion()} class="bg-orange-400 hover:bg-orange-600">-->
<!--					НОВЕ ПИТАННЯ-->
<!--				</button>-->
<!--			{:else}-->
<!--				<p>Спочатку виберіть алгоритм!</p>-->
<!--		</div>-->
<!--	</div>-->

<!--	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-screen bg-yellow-100 rounded-lg transition-[max-height]">-->
<!--		<label class="flex justify-center items-center text-white font-semibold h-12 bg-yellow-500 rounded-lg">-->
<!--			Редагувати Питання-->
<!--			<input bind:checked={editQuestionAccordeon} type="checkbox" class="hidden">-->
<!--		</label>-->
<!--		<div class="p-2 flex flex-col gap-2">-->
<!--			<input bind:value={selectedQuestion.text} type="text">-->
<!--			<button on:click={saveQuestion} class="bg-yellow-400 hover:bg-yellow-600">Редагувати питання</button>-->
<!--		</div>-->
<!--	</div>-->

<!--	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-screen bg-lime-100 rounded-lg transition-[max-height]">-->
<!--		<label class="flex justify-center items-center text-white font-semibold h-12 bg-lime-500 rounded-lg">-->
<!--			Відповіді-->
<!--			<input bind:checked={selectAnswerAccordeon} type="checkbox" class="hidden">-->
<!--		</label>-->
<!--		<div class="p-2 flex flex-col gap-2">-->
<!--			{#each selectedQuestion.answers as answer, index}-->
<!--				<button on:click={() => chooseAnswer(index)} class="bg-lime-400 hover:bg-lime-600">-->
<!--					{answer.text}-->
<!--				</button>-->
<!--			{/each}-->
<!--			<button on:click={() => chooseAnswer()} class="bg-lime-400 hover:bg-lime-600">-->
<!--				НОВА ВІДПОВІДЬ-->
<!--			</button>-->
<!--		</div>-->
<!--	</div>-->

<!--	<div class="overflow-hidden max-h-12 has-[:checked]:max-h-screen bg-green-100 rounded-lg transition-[max-height]">-->
<!--		<label class="flex justify-center items-center text-white font-semibold h-12 bg-green-500 rounded-lg">-->
<!--			Редагувати Відповідь-->
<!--			<input bind:checked={editAnswerAccordeon} type="checkbox" class="hidden">-->
<!--		</label>-->
<!--		<div class="p-2 flex flex-col gap-2">-->
<!--			{#if selectedQuestion.answers && selectedAnswerIndex !== null}-->
<!--				<input bind:value={selectedQuestion.answers[selectedAnswerIndex].text} type="text">-->
<!--				<label>-->
<!--					<input bind:value={selectedQuestion.answers[selectedAnswerIndex].next_question} type="text">-->
<!--				</label>-->
<!--				<button on:click={saveAnswer} class="bg-green-400 hover:bg-green-600">Зберегти відповідь</button>-->
<!--			{/if}-->
<!--		</div>-->
<!--	</div>-->

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