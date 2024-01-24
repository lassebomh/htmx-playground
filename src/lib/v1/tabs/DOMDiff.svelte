<script lang='ts'>
    import { onMount } from 'svelte';
    import monaco from '../editor'

    import { html_beautify } from 'js-beautify'

    export let domDiffHistory: string[];

    let prettify = true;
    let container: HTMLDivElement;
    let diffEditor: monaco.editor.IStandaloneDiffEditor;

    function prettifyHTML(html: string): string {
        return html_beautify(html, {
            indent_size: 2,
        })
    }

    function updateDOMDiff(domDiffHistory: string[], prettify: boolean) {
        let oldViewState = diffEditor.saveViewState()
        let oldDiffModel = diffEditor.getModel()

        if (domDiffHistory.length > 0) {
            let originalModel;
            let modifiedModel;

            let original = prettify ? prettifyHTML(domDiffHistory[0]) : domDiffHistory[0]

            originalModel = monaco.editor.createModel(original, "text/html")
            
            if (domDiffHistory.length > 1) {
                let modified = prettify ? prettifyHTML(domDiffHistory[1]) : domDiffHistory[1]
                modifiedModel = monaco.editor.createModel(modified, "text/html")
            } else {
                modifiedModel = originalModel
            }
            
            diffEditor.setModel({
                original: originalModel,
                modified: modifiedModel,
            })
        }

        if (oldDiffModel) {
            oldDiffModel.modified.dispose()
            oldDiffModel.original.dispose()
        }
        if (oldViewState) {
            diffEditor.restoreViewState(oldViewState);
        }
    }

    $: {
        if (diffEditor) updateDOMDiff(domDiffHistory, prettify)
    }

    onMount(() => {
        diffEditor = monaco.editor.createDiffEditor(
            container,
            {
                enableSplitViewResizing: false,
                renderSideBySide: false,
                automaticLayout: true,
                theme: 'vs-dark',
                minimap: {enabled: false},
                renderOverviewRuler: false,
                lineNumbers: 'off',
            }
        );
    })
</script>

<main>
    <div class="domdiff" bind:this={container} />
    <div class="prettify-toggler">
        <input type="checkbox" id="prettify" bind:checked={prettify}>
        <label for="prettify">Prettify HTML</label>
    </div>
</main>

<style>
    main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		position: relative;
    }

    .domdiff {
        height: 100%;
    }

    .prettify-toggler {
        position: absolute;
        top: 0;
        right: 0;
        padding: 8px;
        color: white;
    }
</style>