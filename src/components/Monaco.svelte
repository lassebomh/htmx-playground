<script lang="ts">
    import type monaco from 'monaco-editor';
    import { editor as Editor } from 'monaco-editor';
    import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
    import theme from '../assets/sharpdark.json'
    import { onMount } from 'svelte';
    import { get, type Writable } from 'svelte/store';
  
    export let contents: Writable<string>;
  
    let container: HTMLDivElement = null;
    let editor: monaco.editor.IStandaloneCodeEditor;

    onMount(async () => {
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                return new tsWorker();
            }
        };
  
        Editor.defineTheme('sharpdark', theme as unknown as monaco.editor.IStandaloneThemeData)
        Editor.setTheme('sharpdark')
        
        editor = Editor.create(container, {
            value: get(contents),
            language: 'javascript',
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

<div bind:this={container} class="me" />

<style>
    .me { height: inherit; width: 100%; }
</style>