<script lang="ts">
	import './app.css';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Temp from './lib/Temp.svelte';
	import LocField from './lib/LocField.svelte';
	import { location, apiData, formattedResponse } from './lib/store';

	let currentLocation: string;
	location.subscribe((data) => {
		currentLocation = data.name;
	});

	let forecast: Array<{
		date: string;
		high: number;
		low: number;
	}> = [];

	formattedResponse.subscribe(($formattedResponse) => {
		forecast = $formattedResponse;
	});

	const weekday: Array<string> = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	onMount(async () => {
		const response = await fetch(
			'https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York'
		);
		apiData.set(await response.json());
		forecast = get(formattedResponse);
	});
</script>

<main
	class="container mx-auto flex flex-col justify-center gap-10 content-center w-screen h-screen"
>
	<h1 class="text-xl not-italic">{currentLocation}</h1>

	<LocField />

	<table class="flex flex-row justify-self-stretch justify-between">
		{#each forecast as day, i}
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
