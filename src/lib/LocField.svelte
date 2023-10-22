<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { debounceInput } from "./debounce";

  export let value: string = "";

  const dispatch = createEventDispatcher();

  const handleInput = debounceInput((e) => {
    const inputValue = (e.target as HTMLInputElement).value;
    dispatch("inputChange", { value: inputValue });
  }, 500);
</script>

<form on:submit|preventDefault>
  <input
    name="search"
    type="search"
    placeholder="Search for location..."
    class="shrink"
    on:input={handleInput}
  />
</form>
