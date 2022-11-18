

<script lang="ts">
    import GoldenLayout from 'svelte-golden-layout';
	import type { LayoutConfig, ResolvedLayoutConfig, VirtualLayout } from 'golden-layout';
    import { get, type Writable } from 'svelte/store';
	import { propertyStore } from 'svelte-writable-derived';

    import { sandbox } from './lib/store'

    import './assets/goldenlayout-theme.css';

    import Monaco from "./lib/Monaco.svelte";
    import Sidebar from "./lib/Sidebar.svelte";
    import TestFile from './lib/TestFile.svelte';
    import Sandbox from './lib/Sandbox.svelte';

    const components = { Sidebar, Monaco, TestFile, Sandbox };
	let goldenLayout: VirtualLayout;
    
    let layout: Writable<LayoutConfig> = propertyStore(sandbox, 'layout');

    // $: $layout = {
    //     root: {
    //         type: 'stack',
    //         isClosable: false,
    //         content: Object.keys(get(sandbox).files).map(filename => {
    //             return {
    //                 type: 'component',
    //                 title: filename,
    //                 componentType: 'Monaco',
    //                 componentState: {
    //                     filename,
    //                 },
    //             }}
    //         ),
    //     }
    // };

	function handleSave() {
		console.log(goldenLayout.saveLayout());
	}

	function handleRestore() {
        console.log('try restore');
        
		// layout = saved as unknown as LayoutConfig;
	}

</script>

<main>
    <div class="sidebar">
		<h1>Config</h1>
		<p>
			<button on:click={handleSave}>Save Layout</button>
			<!-- <button on:click={handleRestore} disabled={saved === undefined}>Restore Layout</button> -->
		</p>
		{#each Object.entries($sandbox.files) as [filename, content]}
			<pre>File: {filename}</pre>
            <pre>{content}</pre>
            <br/>
		{/each}
		<h2>Saved Layout</h2>
		<!-- {#if saved !== undefined}
			<pre>{JSON.stringify(saved, undefined, 2)}</pre>
		{:else}
			<p>(none)</p>
		{/if} -->
    </div>
    <div class="layout-container">
        <GoldenLayout bind:goldenLayout config={get(layout)} let:componentType let:componentState>
            <svelte:component this={components[componentType]} {...componentState} />
        </GoldenLayout>
    </div>
</main>

<style>
    .layout-container {
        width: 100%;
        height: 100%;
        border-left: 4px solid #151515;
    }

    .sidebar {
        /* overflow: hidden scroll; */
        width: 300px;
    }

    main {
        display: flex;
        width: 200px;
        width: inherit;
        height: inherit;
        background-color: #222222;
    }
</style>
