<script lang="ts">
	import ConsoleLine from './ConsoleLine.svelte';
    import type { Log } from './console';

	export let logs: Log[];
	export let clear_logs: CallableFunction;
</script>

<div class="container">
	<button disabled={logs.length == 0} on:click={_ => clear_logs()} class="clear-button icon-button">
		<i class="codicon codicon-circle-slash"></i>
	</button>
	{#each logs as log}
		<ConsoleLine {log} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		flex-grow: 1;
		padding-bottom: 8px;
		position: relative;
	}

	.clear-button {
		position: absolute;
		top: 4px;
		right: 4px;
		font-size: 24px;
		z-index: 10;
	}

	.container > :global(*) {
		text-align: left;
		
		--sk-font-mono: 'Courier New', Courier, monospace;
		--json-tree-li-line-height: 1.4;
		--json-tree-font-size: 13px;
		--json-tree-property-color: #72a2d3;
		--json-tree-string-color: #6cd1c7;
		--json-tree-symbol-color: #6cd1c7;
		--json-tree-boolean-color: #9681f7;
		--json-tree-function-color: #e59b6f;
		--json-tree-number-color: #9681f7;
		--json-tree-label-color: #dbdbdb;
		--json-tree-arrow-color: #e8eaed;
		--json-tree-null-color: #81868a;
		--json-tree-undefined-color: #81868a;
		--json-tree-date-color: #9ca0a5;
		--json-tree-operator-color: #e8eaed;
		--json-tree-regex-color: #6cd1c7;
	}
</style>