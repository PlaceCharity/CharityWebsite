<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let files;
    export let image;
    export let fileInput;

    function upload() {
        image = files[0]
        dispatch('upload');
    }
</script>

<div class="flex flex-col my-4">
    <input type="file" class="file-input file-input-bordered w-full max-w-xs font-patrickhand text-xl" accept=".png,.jpg" bind:this={fileInput} bind:files on:change={upload}/>
</div>