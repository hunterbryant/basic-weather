<script lang="ts">
  import "./app.css";
  import Temp from "./lib/Temp.svelte";
  import LocField from "./lib/LocField.svelte";

  let exampleForecastObject: Array<{
    date: String;
    high: number;
    low: number;
  }> = [
    { date: "2023-10-21", high: 17.5, low: 7.1 },
    { date: "2023-10-22", high: 13.5, low: 6.2 },
    { date: "2023-10-23", high: 14.1, low: 7.3 },
    { date: "2023-10-24", high: 17.5, low: 7.1 },
    { date: "2023-10-25", high: 13.5, low: 6.2 },
    { date: "2023-10-26", high: 14.1, low: 7.3 },
    { date: "2023-10-27", high: 14.1, low: 7.3 },
  ];

  let weekday: Array<string> = ["S", "M", "T", "W", "T", "F", "S"];

  let searchTerm: string | undefined;

  // To implement
  function autoComplete(term: string) {
    return term;
  }

  async function fetchMockAPI(searchTerm: string) {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  let results: Promise<any>;
  const fetchWeather = async (e) => {
    searchTerm = e.detail.value;

    // Autocomplete city before fetching weather
    const autoCompleted = autoComplete(searchTerm);
    console.log("Search for for city: ", autoCompleted);

    // Set fetch call to
    results = fetchMockAPI(autoCompleted);
    // forecastResults = results;
  };

  $: console.log(results);
</script>

<main
  class="container mx-auto flex flex-col justify-center gap-10 content-center w-screen h-screen"
>
  <h1 class="text-xl not-italic">New York</h1>

  <LocField on:inputChange={fetchWeather} />
  {#if searchTerm}
    {#await results}
      <i class="text-gray-400">Searching city {searchTerm}...</i>
    {:then value}
      {#if value}
        <p class="text-gray-400">Found city {searchTerm}!</p>
      {:else}
        <p class="text-gray-400">City {searchTerm} not found!</p>
      {/if}
    {:catch error}
      <p class="text-gray-400">Error: {error.message}</p>
    {/await}
  {/if}

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
