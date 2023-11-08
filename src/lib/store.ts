import { writable, derived } from 'svelte/store';

export const apiData = writable<{ daily: any }>();
export const location = writable<{
	name: string;
	lat: number;
	lon: number;
}>();

export const formattedResponse = derived(apiData, ($apiData) => {
	type WeatherObject = {
		date: string;
		high: number;
		low: number;
	};

	let constructorObjectArray: WeatherObject[] = [];

	if ($apiData.daily) {
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
