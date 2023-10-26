import { writable, derived } from 'svelte/store';

export let apiData = writable({});

export const formattedResponse = derived(apiData, ($apiData) => {
	let constructorObjectArray = [];

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
