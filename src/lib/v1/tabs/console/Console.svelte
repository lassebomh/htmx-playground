<script lang="ts">
	import JSONNode from 'svelte-json-tree';
    import type { Log } from './console';

	export let logs: Log[];
	export let clear_logs: CallableFunction;
</script>

<div class="container">
	<button disabled={logs.length == 0} on:click={_ => clear_logs()} class="clear-button icon-button">
		<i class="codicon codicon-circle-slash"></i>
	</button>
	{#each logs as log}
		<div style="font-family: monospace;" class="log console-{log.level}">
			{#if log.args?.length == 1 && typeof log.args[0] == 'string'}
				{log.args[0]}
			{:else}
				{#each log.args ?? [] as arg}
					<JSONNode value={arg} />
				{/each}
			{/if}
		</div>
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
		padding: 10px 16px;
		font-size: 14px;
		line-height: 1.5;
		color: #fffc;
	}

	.clear-button {
		position: absolute;
		top: 4px;
		right: 4px;
		font-size: 24px;
		z-index: 10;
	}

	.log {
		
	}

	.container > :global(*) {
		text-align: left;
		
		--sk-font-mono: 'Courier New', Courier, monospace;
	}
</style>