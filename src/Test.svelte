<script lang="ts">
    import Resizer from "./components/Resizer.svelte";

    let direction = 'ew'
</script>

<Resizer startSize={2} endSize={1}>
    <div class="box1" slot="start">

    </div>
    <div class="box2" slot="end">

    </div>
</Resizer>

<style>
    .box1 {
        background-color: darkred;
        width: 100%;
        height: 100%;
    }
    .box2 {
        background-color: darkgreen;
        width: 100%;
        height: 100%;
    }
</style>