import { writable, derived } from 'svelte/store';

export const apiData = writable<{ daily: any }>();

export const location = writable<{
	name: string;
	lat: number;
	lon: number;
}>({ name: 'New York', lat: 40.7143, lon: -74.006 });

location.subscribe(async ($location) => {
	try {
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${$location.lat}&longitude=${$location.lon}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`
		);

		apiData.set(await response.json());
	} catch (error) {
		console.log(error);
	}
});

export const formattedResponse = derived(apiData, ($apiData) => {
	type WeatherObject = {
		date: string;
		high: number;
		low: number;
	};

	let constructorObjectArray: WeatherObject[] = [];

	if ($apiData?.daily) {
		let length = $apiData.daily.time.length;

		for (let i = 0; i < length; i++) {
			constructorObjectArray[i] = {
				date: $apiData.daily.time[i],
				high: $apiData.daily.temperature_2m_max[i],
				low: $apiData.daily.temperature_2m_min[i],
			};
		}
	}

	return constructorObjectArray;
});
