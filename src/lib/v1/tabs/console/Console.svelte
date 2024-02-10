<script lang="ts">
	import JSONNode from 'svelte-json-tree';
    import type { Log } from './console';

	export let logs: Log[];

	export let clearLogs: CallableFunction;
</script>

<div class="container">
	<button disabled={logs.length == 0} on:click={_ => clearLogs()} class="clear-button icon-button">
		<i class="codicon codicon-circle-slash"></i>
	</button>
	{#each logs as log}
		<div style="font-family: monospace;" class="log console-{log.level}">
			{#if (typeof log.args[0]) == 'string'}
				<pre>{log.args[0]}</pre>
			{:else if (log.level == 'error')}
				<pre>{log.args[0].message}</pre>
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
		font-size: 14px;
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
		padding: 3px 8px;
		line-height: 1.5;
	}

	.log pre {
		margin: 0;
		white-space: pre-wrap;
	}

	.console-warn,
	.console-system-warn {
		background: hsla(50, 100%, 95%, 0.4);
		border-color: #fff4c4;
	}

	.console-error,
	.console-assert {
		background: hsla(2, 100%, 65%, 0.178);
		border-color: #fed6d7;
	}

	.container > :global(*) {
		text-align: left;
		
		--sk-font-mono: 'Courier New', Courier, monospace;
	}
</style>