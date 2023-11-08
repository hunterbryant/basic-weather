<script lang="ts">
	import { location } from './store';

	export let value: string = '';

	async function validateLocation() {
		try {
			const response = await fetch(
				`https://geocode.maps.co/search?q={${value}}`
			);

			const firstCity = (await response.json())[0];

			if (!firstCity) {
				throw new Error('The api reponse couldnt match the city');
			}

			location.set({
				name: firstCity.display_name,
				lat: firstCity.lat,
				lon: firstCity.lon,
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
