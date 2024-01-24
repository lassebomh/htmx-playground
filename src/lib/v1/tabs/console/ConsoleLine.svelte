<script>
	import JSONNode from 'svelte-json-tree';
	import ConsoleTable from './ConsoleTable.svelte';

	/** @type {import('./console').Log} */
	export let log;
	export let level = 1;

	function toggle_group_collapse() {
		log.collapsed = !log.collapsed;
	}
</script>

{#if log.args && log.level === 'table'}
	<ConsoleTable data={log.args[0]} columns={log.args[1]} />
{/if}

<button
	class="log console-{log.level}"
	style="padding-left: {level * 12}px"
	on:click={log.level === 'group' ? toggle_group_collapse : undefined}
>
	{#if log.count && log.count > 1}
		<span class="count">{log.count}x</span>
	{/if}

	{#if log.level === 'trace' || log.level === 'assert'}
		<button class="arrow" class:expand={!log.collapsed} on:click={toggle_group_collapse}>
			▶
		</button>
	{/if}

	{#if log.level === 'assert'}
		<span class="assert">Assertion failed:</span>
	{/if}

	{#if log.level === 'clear'}
		<span class="info">Console was cleared</span>
	{:else if log.level === 'unclonable'}
		<span class="info error">Message could not be cloned. Open devtools to see it</span>
	{:else if log.level === 'group'}
		<div class="arrow" class:expand={!log.collapsed}>▶</div>
		<span class="title">{log.label}</span>
	{:else if log.level.startsWith('system')}
		{#each log.args ?? [] as arg}
			{arg}
		{/each}
	{:else if log.args && log.level === 'table'}
		<JSONNode value={log.args[0]} />
	{:else}
		{#each log.args ?? [] as arg}
			<JSONNode value={arg} />
		{/each}
	{/if}
	{#each new Array(level - 1) as _, idx}
		<div class="outline" style="left: {idx * 15 + 15}px" />
	{/each}
</button>

{#if log.level === 'group' && !log.collapsed}
	{#each log.logs ?? [] as childLog}
		<svelte:self log={childLog} level={level + 1} />
	{/each}
{/if}

{#if (log.level === 'trace' || log.level === 'assert') && !log.collapsed}
	<div class="trace">
		{#each log.stack?.split('\n').slice(2) ?? '' as stack}
			<div>{stack.replace(/^\s*at\s+/, '')}</div>
		{/each}
	</div>
{/if}

<style>
	.log {
		/* border-bottom: 0.5px solid var(--sk-back-4); */
		padding: 10px 10px 8px;
		margin: 2px 4px;
		display: flex;
		position: relative;
		font-size: 12px;
		font-family: var(--sk-font-mono);
		background-color: transparent;
		border: none;
		/* width: 100%; */
	}

	.log:global(.console-log + .console-log), .log:global(.console-log:first-child) {
		margin: 5px 0;
		padding-bottom: 0;
		border-top: 1px solid #fff1;
	}

	.log:global(.console-log:first-child) {
		margin-top: 0;
	}


	.log > :global(ul > ul) {
		margin-top: 8px;
	}

	.log > :global(*) {
		margin-right: 10px;
		font-family: var(--sk-font-mono);
	}

	.console-warn,
	.console-system-warn {
		background: hsla(50, 100%, 95%, 0.4);
		border-radius: 4px;
		border-color: #fff4c4;
	}

	.console-error,
	.console-assert {
		background: hsla(2, 100%, 65%, 0.178);
		border-radius: 4px;
		border-color: #fed6d7;
	}

	.console-group,
	.arrow {
		cursor: pointer;
		user-select: none;
	}

	.console-trace,
	.console-assert {
		border-bottom: none;
	}

	.console-assert + .trace {
		background: #fff0f0;
		border-radius: 4px;
		border-color: #fed6d7;
	}

	.trace {
		border-bottom: 1px solid #eee;
		font-size: 12px;
		font-family: var(--sk-font-mono);
		padding: 4px 0 2px;
	}

	.trace > :global(div) {
		margin-left: 15px;
	}

	.count {
		color: var(--sk-text-3, #999);
		font-size: 12px;
		line-height: 1.2;
	}

	.info {
		color: var(--sk-text-2, #666);
		font-family: var(--sk-font) !important;
		font-size: 12px;
	}

	.error {
		color: #da106e; /* todo make this a var */
	}

	.outline {
		border-left: 1px solid #9c9cab;
		position: absolute;
		top: 0;
		bottom: -1px;
	}

	.arrow {
		position: absolute;
		font-size: 0.6em;
		transition: 150ms;
		transform-origin: 50% 50%;
		transform: translateY(1px) translateX(-50%);
	}

	.arrow.expand {
		transform: translateY(1px) translateX(-50%) rotateZ(90deg);
	}

	.title {
		font-family: var(--sk-font-mono);
		font-size: 13px;
		font-weight: bold;
		padding-left: 11px;
		height: 19px;
	}

	.assert {
		padding-left: 11px;
		font-weight: bold;
		color: #da106e;
	}
</style>