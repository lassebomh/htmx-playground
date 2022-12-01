<script>
    import { onMount } from "svelte";
    import { get, writable } from "svelte/store";
    import { propertyStore, writableDerived } from "svelte-writable-derived";

    export let file;

    let filename = propertyStore(file, 'filename')
    let contents = propertyStore(file, 'contents')

    let container;
    let editor;

    onMount(() => {
        // @ts-ignore
        editor = ace.edit(container);
        editor.setTheme("ace/theme/monokai");
        editor.setOptions({
            fontSize: '11pt',
        })

        editor.session.on('change', () => {
            contents.set(editor.session.getValue())
        });

        editor.session.on('changeMode', function(e, session){
            if ("ace/mode/javascript" === session.getMode().$id) {
                if (!!session.$worker) {
                    session.$worker.send("setOptions", [{
                        "esversion": 9,
                        "esnext": false,
                    }]);
                }
            }
        });
        
        editor.session.setValue(get(contents))

        filename.subscribe((value) => {
            if (editor && filename) {
                const fileModes = {
                    'js': "ace/mode/javascript",
                    'html': "ace/mode/nunjucks"
                }
                editor.session.setMode(fileModes[get(filename).split('.').pop()])
                editor.session.setValue(get(contents))
            }
        })
    })


</script>

<div bind:this={container}></div>

<style>
    div {
        height: inherit;
        width: 100%;
    }
</style>