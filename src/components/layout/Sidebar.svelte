<script>
    import { openFile, playground, activeFileIndex } from "../../playground";
    import DOMPurify from 'isomorphic-dompurify';
    import { marked } from 'marked';
    import hljs from 'highlight.js'
    import { get, writable } from "svelte/store";
    import { propertyStore } from 'svelte-writable-derived'


    marked.setOptions({
        highlight: function(code) {
            return hljs.highlightAuto(code).value;
        }
    });

    let readme_html;
    let parse_error_message = "";

    function loadReadme(file) {

        try {
            readme_html = DOMPurify.sanitize(marked.parse(file.contents))
            parse_error_message = ''
        } catch (error) {
            readme_html = "";
            parse_error_message = error.toString()
        }
    }

    $: {

        let _openFile = get(playground).files[$activeFileIndex]
        
        if (_openFile.filename == '.readme.md') {
            loadReadme($openFile);
        } else {
            let readme = get(playground).files.find(file => file.filename == ".readme.md")

            if (readme != null) {
                loadReadme(readme)
            } else {
                parse_error_message = ''
                readme_html = null;
            };
        }
    }


</script>

<main class:hide={readme_html == null}>
    {@html readme_html}
    {#if parse_error_message != ""}
        <div class="parse-error">{parse_error_message}</div>
    {/if}
</main>

<style>
    main {
        background-color: #191919;
        width: 400px;
        height: 100%;
        padding: 0 1em;
        border-top: 1px solid #252525;
    }

    .parse-error {
        background-color: #f003;
        border: 1px solid #fff3;
        padding: 1em;
    }
</style>