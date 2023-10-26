import { writable, derived, get } from 'svelte/store';

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

type ForecastData = Array<{
  date: string;
  high: number;
  low: number;
}>

const formatResponse = (
  data: any
): ForecastData => {
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
    fetch: () => fetcher().then(set),
  };
}

/* Examples of how this store can be used (check console.logs) */

// Create a forecast fetcher store by feeding in function to handle fetching and formatting results
export const forecast = Forecast(async () => {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York"
  );
  
  return formatResponse(await response.json());
});


// Forecasts can be subscribed to and used in components or in ts files ($forecast or get(forecast))
// (fully typed)
const typedValue = get(forecast)

// Fetch promises can be awaited in a svelte file with the '#await :then' block
const promise = forecast.fetch()

// These forecast fetchers can be created for different cities/longitudes-latitudes
export const latLongForecast = (lat: string, long: string) => {
  return Forecast(async () => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`
    );
  
    return formatResponse(await response.json());
  })
}

export const cityFetcher = (cityName: string) => {
  // Replace with function to convert city name to lat long
  // Map approximate longitudes for these cities
  const [lat, long]  = (() => {
    switch(cityName) {
      case "New York":
        return ["40.7143", "-74.006"];
      case "Los Angeles":
        return ["34.0522", "-118.2437"];
      case "Chicago":
        return ["41.8781", "-87.6298"];
      default:
        return ["0", "0"];
    }
  })()

  return latLongForecast(lat, long)
}


// Multiple city Forecasts can be saved in an object (for fetching + getting)
// This general structure can be stored in local storage for 'saving' cities
const cities = {
  "New York": cityFetcher("New York"),
  "Los Angeles": cityFetcher("Los Angeles"),
  "Chicago": cityFetcher("Chicago"),

  // etc...
}

// Can easiy reference a city's forecast by name
const ny = get(cities["New York"])

console.log("New York forecast starting store state:", ny)

// Then easily fetch and subscribe to the forecast
if (!ny) {
  console.log("NY forecast not yet fetched - fetching now")
  const result = cities["New York"].fetch()
}

cities["New York"].subscribe((data) => {
  if (!data) return
  console.log("New York forecast store updated:", data)
})



