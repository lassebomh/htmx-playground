<script lang="ts">
    import type monaco from 'monaco-editor';
    import theme from '../assets/sharpdark.json'
    import { editor as Editor } from 'monaco-editor';
	import { propertyStore } from 'svelte-writable-derived';


	import { onMount } from 'svelte';
	import { get, type Writable } from 'svelte/store';
    import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
    // import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
    // import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
    import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

    import { sandbox } from './store';

	export let filename: string;
	export let contents: Writable<string> = propertyStore(propertyStore(sandbox, 'files'), filename);

    let divEl: HTMLDivElement = null;
    let editor: monaco.editor.IStandaloneCodeEditor;
    
    onMount(async () => {
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                // if (label === 'json') {
                //     return new jsonWorker();
                // }
                // if (label === 'css' || label === 'scss' || label === 'less') {
                //     return new cssWorker();
                // }
                if (label === 'html' || label === 'handlebars' || label === 'razor') {
                    return new htmlWorker();
                }
                if (label === 'typescript' || label === 'javascript') {
                    return new tsWorker();
                }
                return new editorWorker();
            }
        };

        Editor.defineTheme('sharpdark', theme as unknown as monaco.editor.IStandaloneThemeData)
        Editor.setTheme('sharpdark')

        editor = Editor.create(divEl, {
            value: get(contents),
            language: {"js": 'javascript', "html": "html"}[filename.split('.')[1]],
            automaticLayout: true
        });

        editor.getModel().onDidChangeContent((event) => {
            contents.set(editor.getValue())
            editor.render();
        });

        return () => {
            editor.dispose();
        };
    });
</script>

<div bind:this={divEl} class="me" />

<style>
    .me { height: inherit; }
</style>