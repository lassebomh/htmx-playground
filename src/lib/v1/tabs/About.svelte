<script lang="ts">
    export let title: string;
    export let readmeHtml: string | null = null;
</script>

<main>
    <h1>{title}</h1>
    <article>
        {@html readmeHtml}
    </article>
</main>

<style>
    main {
        padding: 8px;
    }

    h1 {
        margin: 0;
        font-size: 1.5em;
    }
</style>