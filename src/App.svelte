<script lang="ts">
	import './app.css';
	import Temp from './lib/Temp.svelte';
	import LocField from './lib/LocField.svelte';
	import Spinner from './lib/Spinner.svelte';
	import { get } from 'svelte/store';
	import { location, formattedResponse } from './lib/store';

	let forecast: Array<{
		date: string;
		high: number;
		low: number;
	}>;

	formattedResponse.subscribe(($formattedResponse) => {
		forecast = $formattedResponse;
	});

	const weekday: Array<string> = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
</script>

<main
	class="container mx-auto flex flex-col justify-center gap-10 content-center w-screen h-screen"
>
	<h1 class="text-xl not-italic">{$location.name}</h1>

	<LocField />

	<table class="flex flex-row justify-self-stretch justify-between">
		{#if $location.error}
			<p class="text-red-500">{$location.error}</p>
		{:else if !forecast.length}
			<Spinner />
		{:else}
			{#each forecast as day, i}
				<tr class="flex flex-col justify-center">
					<Temp value={day.high} />
					<p class="text-center">
						{weekday[new Date(day.date).getDay()]}
					</p>
					<Temp value={day.low} />
				</tr>
			{/each}
		{/if}
	</table>
</main>
