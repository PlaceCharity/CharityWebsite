<script>
    import { _ } from "../../../../../services/i18n";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let draggedOver = 0;
    let files;
    export let image;
    export let fileInput;

    function upload() {
        image = files[0];
        dispatch('upload');
    }

    function dropHandler(e) {
        if (e.dataTransfer.items && e.dataTransfer.items[0].kind === "file") {
            image = e.dataTransfer.items[0].getAsFile();
        } else {
            image = e.dataTransfer.files[0];
        }
        dispatch('upload');
    }

    function dragEnterHandler() {
        draggedOver++;
    }

    function dragLeaveHandler() {
        draggedOver--;
    }
</script>

<div class="my-4 relative w-full items-center" on:drop|preventDefault={dropHandler} on:dragover|preventDefault on:dragenter|preventDefault={dragEnterHandler} on:dragleave|preventDefault={dragLeaveHandler}>
    <label for="file" class="flex flex-col w-full border-2 border-base-content rounded-lg justify-center items-center text-center z-10 {draggedOver === 0 ? 'border-dotted': 'border-solid'}" >
        <p class="font-patrickhand font-normal text-2xl m-4 my-16">{$_("pixelization.image.upload")}</p>
    </label>
    <input id="file" type="file" class="hidden" accept=".png,.jpg" bind:this={fileInput} bind:files on:change={upload}/>
</div>