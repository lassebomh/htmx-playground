import { writable } from 'svelte/store'

export let playground = writable(null)
export let openFile = writable(null);
export let activeFileIndex = writable(null);
export let srcdoc = writable(null)
