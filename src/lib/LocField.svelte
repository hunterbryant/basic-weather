<script lang="ts">
	import { location, apiData } from './store';

	export let value: string = '';

	async function validateLocation() {
		try {
			apiData.set({ daily: '' });

			const response = await fetch(
				`https://geocode.maps.co/search?q={${value}}`
			);

			const firstCity = (await response.json())[0];

			if (!firstCity) {
				location.set({
					name: value,
					lat: 0,
					lon: 0,
					error: `Coun't find location ${value}...`,
				});
				throw new Error('The api reponse couldnt match the city');
			}

			location.set({
				name: firstCity.display_name,
				lat: firstCity.lat,
				lon: firstCity.lon,
				error: undefined,
			});
		} catch (error) {
			console.log(error);
		}
	}
</script>

<form on:submit|preventDefault={validateLocation}>
	<input
		name="search"
		type="search"
		placeholder="Search for location..."
		class="shrink"
		bind:value
	/>
	<button type="submit"> Search </button>
</form>
