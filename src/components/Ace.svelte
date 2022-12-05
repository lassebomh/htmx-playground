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

        editor.setOptions({
            fontSize: '12pt',
            wrap: true,
            indentedSoftWrap: true,
            // showLineNumbers: false,
            theme: "ace/theme/monokai"

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
                    'html': "ace/mode/nunjucks",
                    'json': "ace/mode/json",
                    'md': "ace/mode/markdown",
                }
                editor.session.setMode(fileModes[get(filename).split('.').pop()])
                editor.session.setValue(get(contents))
            }
        })
    })


</script>

<main bind:this={container}></main>

<style>
    main {
        /* height: 100%; */
        width: 100%;
        flex-grow: 1;
    }
</style>