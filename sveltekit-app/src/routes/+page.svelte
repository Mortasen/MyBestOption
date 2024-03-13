<script>
	const TAG_COLORS = {
		'Бізнес': 'bg-red-200',
		'Навчання': 'bg-orange-200',
		'Програмування': 'bg-sky-200',
		'Технології': 'bg-fuchsia-200',
		'Інше': 'bg-yellow-200'
	}
	let data = [
		{
			'title': 'Який фреймворк для розробки кросплатформеного додатка вибрати?',
			'rating': 45,
			'added': '2024-03-13',
			'tags': ['Бізнес']
		},
		{
			'title': 'Перша мова програмування',
			'rating': 85,
			'added': '2024-03-03',
			'tags': ['Програмування']
		},
		{
			'title': 'Підбір оптимальної операційної системи!',
			'rating': 70,
			'added': '2024-03-07',
			'tags': ['Технології']
		},
		{
			'title': 'Куди найкраще вступити на ІТ в 2024',
			'rating': 80,
			'added': '2024-03-11',
			'tags': ['Навчання']
		},
		{
			'title': 'Який фреймворк для розробки кросплатформеного додатка вибрати?',
			'rating': 45,
			'added': '2024-03-13',
			'tags': ['Бізнес']
		},
		{
			'title': 'Перша мова програмування',
			'rating': 85,
			'added': '2024-03-03',
			'tags': ['Програмування']
		},
		{
			'title': 'Підбір оптимальної операційної системи!',
			'rating': 70,
			'added': '2024-03-07',
			'tags': ['Технології']
		},
		{
			'title': 'Куди найкраще вступити на ІТ в 2024',
			'rating': 80,
			'added': '2024-03-11',
			'tags': ['Навчання']
		},
	]
</script>

<main class="w-full flex flex-col gap-6 max-h-full overflow-scroll">
	{#each data as flowchart}
		<div class="w-full p-4 flex flex-col gap-2 rounded-xl {TAG_COLORS[flowchart.tags[0]]}">
			<h2 class="font-medium">{flowchart.title}</h2>
			<p>Додано: {flowchart.added}</p>
			<div class="w-full h-2 bg-white rounded-full overflow-hidden">
				<div class="h-full bg-green-900" style="width: {flowchart.rating}%"></div>
			</div>
		</div>
	{/each}
</main>
<a href="/edit-flowchart" class="absolute right-8 bottom-8 text-3xl w-14 h-14 bg-teal-300 rounded-xl shadow-xl">
	+
</a>