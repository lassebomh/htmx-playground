<script lang="ts">
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let name: string;
	export let file: Writable<string>;

	onMount(() => {
		console.log('mount', name);

		return () => {
			console.log('unmount', name);
		};
	});
</script>

<p>{name}: <input type="text" bind:value={$file} /></p>
