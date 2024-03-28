<script>
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const TAG_COLORS = {
		'Бізнес': 'bg-red-200',
		'Навчання': 'bg-orange-200',
		'Програмування': 'bg-sky-200',
		'Технології': 'bg-fuchsia-200',
		'Інше': 'bg-green-200'
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
	import { auth, db, user, flowcharts } from '$lib/_firebase.js';
	// import { collection, getDocs, query, where } from 'firebase/firestore';
	//
	//
	// import { Flowchart } from '$lib/types.js';
	//
	//
	// const flowchartsCollection = collection(db, 'flowcharts');
	//
	//
	// let flowcharts = [];
	//
	// onMount(() => {
	// 	const q = query(
	// 		flowchartsCollection,
	// 	);
	// 	getDocs(q).then(snapshot => {
	// 		flowcharts = snapshot.docs.map(doc => Flowchart.initFromDoc(doc));
	// 		console.log('flowcharts:', flowcharts);
	// 	});
	// })


	import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";

	// // const q = query(collection(db, "flowcharts"), where("state", "==", "CA"));
	// const unsubscribe = onSnapshot(flowchartsCollection, (querySnapshot) => {
	// 	flowcharts = [];
	// 	querySnapshot.forEach((doc) => {
	// 		flowcharts.push(doc.data());
	// 	});
	// 	console.log("Current cities in CA: ", cities.join(", "));
	// });

	function addFlowchart() {
		// addDoc(
		// 	flowchartsCollection,
		// 	{
		// 		title: '123456789',
		// 		rating: 50,
		// 		added: '2024-02-13',
		// 		tags: ['Бізнес'],
		// 	},
		// );
		flowcharts.add(
			{
				title: '123456789',
				rating: 50,
				added: '2024-02-13',
				tags: ['Бізнес'],
			},
		);
	}
</script>

<button on:click={addFlowchart}>

</button>
<main class="w-full flex flex-col gap-6 max-h-full overflow-scroll">
	{#each $flowcharts as flowchart}
		<a href="/flowchart/{flowchart.id}" class="w-full p-4 text-black hover:text-black hover:opacity-70 flex flex-col gap-2 rounded-xl {TAG_COLORS[flowchart.tags[0]]}">
			<h2 class="font-medium">{flowchart.title}</h2>
			<p>Додано: {flowchart.created}</p>
			<div class="w-full h-2 bg-white rounded-full overflow-hidden">
				<div class="h-full bg-green-900" style="width: {flowchart.rating}%"></div>
			</div>
		</a>
	{/each}
</main>
<a href="/edit-flowchart" class="absolute right-8 bottom-8 p-3 bg-teal-300 rounded-xl shadow-xl">
	<Icon icon="ph:plus-bold" class="size-6" />
</a>