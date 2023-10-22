<script lang="ts">
	import './app.css';
	import Temp from './lib/Temp.svelte';
	import LocField from './lib/LocField.svelte';

	let exampleForecastObject: Array<{
		date: String;
		high: number;
		low: number;
	}> = [
		{ date: '2023-10-21', high: 17.5, low: 7.1 },
		{ date: '2023-10-22', high: 13.5, low: 6.2 },
		{ date: '2023-10-23', high: 14.1, low: 7.3 },
		{ date: '2023-10-24', high: 17.5, low: 7.1 },
		{ date: '2023-10-25', high: 13.5, low: 6.2 },
		{ date: '2023-10-26', high: 14.1, low: 7.3 },
		{ date: '2023-10-27', high: 14.1, low: 7.3 },
	];

	let weekday: Array<string> = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
</script>

<main
	class="container mx-auto flex flex-col justify-center gap-10 content-center w-screen h-screen"
>
	<h1 class="text-xl not-italic">New York</h1>

	<LocField />

	<table class="flex flex-row justify-self-stretch justify-between">
		{#each exampleForecastObject as day, i}
			<tr class="flex flex-col justify-center">
				<Temp value={day.high} />
				<p class="text-center">
					{weekday[new Date(day.date).getDay()]}
				</p>
				<Temp value={day.low} />
			</tr>
		{/each}
	</table>
</main>
