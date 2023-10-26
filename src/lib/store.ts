import { writable, derived, get } from "svelte/store";

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

// Custom store approach

const formatResponse = (
  data: any
): Array<{
  date: string;
  high: number;
  low: number;
}> => {
  let constructorObjectArray = [];

  if (data.daily) {
    let length = data.daily.time.length;

    for (let i = 0; i < length; i++) {
      constructorObjectArray[i] = {
        date: data.daily.time[i],
        high: data.daily.temperature_2m_max[i],
        low: data.daily.temperature_2m_min[i],
      };
    }
  }

  return constructorObjectArray;
};

function Forecast<T extends any>(fetcher: () => Promise<T>) {
  let { subscribe, set } = writable<T | null>(null);
  return {
    subscribe,
    fetchData: async () => set(await fetcher()),
  };
}

export const forecast = Forecast(async () => {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York"
  );

  return formatResponse(await response.json());
});

// 'a' should be typed according to the return type of the function passed to Forecast()
const a = get(forecast);
