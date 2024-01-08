<script lang="ts">
    import hljs from 'highlight.js'
    hljs.configure({ languages: ['http'] })

    export let log;

    let requestCodeHTML = "";
    let responseCodeHTML = "";

    $: {
        let requestCode = `${log.request.method} ${log.request.url} HTTP/1.1\n`
        for (let [key, value] of Object.entries(log.request.headers)) requestCode += `${key}: ${value}\n`;
        if (log.request.body) requestCode += "\n" + log.request.body + "\n"
    
        requestCodeHTML = hljs.highlight(requestCode, {language: 'http'}).value;
    
        let responseCode = `HTTP/1.1 ${log.response.status} ${log.response.statusText || ""}\n`
        for (let [key, value] of Object.entries(log.response.headers)) responseCode += `${key}: ${value}\n`;
        if (log.response.body) responseCode += "\n" + log.response.body + "\n"
    
        responseCodeHTML = hljs.highlight(responseCode, {language: 'http'}).value;
    }
</script>

<main>
    <div>
        <h4 class="title" style="border-top: 0;">Request</h4>
        <pre>{@html requestCodeHTML}</pre>
    </div>
    <div>
        <h4 class="title">Response</h4>
        <pre>{@html responseCodeHTML}</pre>
    </div>
</main>

<style>
    pre {
        padding: 16px;
        margin: 0;
        white-space: pre-line;
    }
    
    main {
        height: 100%;
        flex-grow: 1;
        overflow-y: auto;
        font-family: monospace;
    }

    .title {
        padding: 8px;
        margin: 0;
        color: #fff9;
        font-weight: 400;
        border-bottom: 1px #fff3 solid;
        border-top: 1px #fff3 solid;
    }
</style>