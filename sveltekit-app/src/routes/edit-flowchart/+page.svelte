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
	import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

	const flowchartsCollection = collection(db, 'flowcharts');
	let flowcharts = [];

	onMount(() => {
		const q = query(
			flowchartsCollection,
			where("author", "==", $user.uid)
		);
		getDocs(q).then(snapshot => {
			flowcharts = snapshot.docs.map(doc => doc.data());
			console.log(flowcharts);
		});
	})


	function editQuestions () {
		addDoc(flowchartsCollection, { title: 'qoweiqowir oiqwq', author: $user.uid });
	}
</script>

<style>
	input {
		@apply rounded-md;
	}
</style>

<div class="size-full flex flex-col gap-4">
	<div class="flex-grow overflow-hidden max-h-16 has-[:checked]:max-h-96 bg-primary-100 rounded-lg transition-[max-height]">
		<label class="flex justify-center items-center text-white font-semibold h-16 bg-primary-500 rounded-lg">
			Алгоритм
			<input type="checkbox" class="hidden">
		</label>
		<div class="p-2 space-y-6">
			<label class="block">
				Алгоритм:
				<select name="" id="" class="px-2 py-1 rounded-lg">
					{#each flowcharts as flowchart}
						<option value={flowchart.id}>{flowchart.title}</option>
					{/each}
				</select>
			</label>
			<label>
				Заголовок: <input type="text">
			</label>
			<button class="w-full">
				Редагувати питання
			</button>
		</div>
	</div>
	<div class="has-[:checked]:flex-grow bg-green-400 rounded-lg transition-[height]">
		<label class="flex justify-center items-center text-white h-16 bg-fuchsia-700 rounded-lg">
			Accordeon
			<input type="checkbox" class="hidden">
		</label>
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