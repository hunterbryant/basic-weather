<script lang="ts">
  import './app.css'
  import Counter from './lib/Counter.svelte'
  import Temp from './lib/Temp.svelte'
</script>

<main class="bg-slate-900 flex flex-row w-screen h-screen">
  <h1 class="text-xl not-italic">Basic Weather</h1>

  <div class="card">
    <Counter />
    <Temp />
  </div>
</main>
