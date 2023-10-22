<script lang="ts">
	export let value: string = '';
</script>

<form on:submit|preventDefault>
	<input
		name="search"
		type="search"
		placeholder="Search for location..."
		class="shrink"
		bind:value
	/>
</form>
