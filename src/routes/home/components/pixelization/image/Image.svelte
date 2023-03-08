<script>
    import { _ } from "../../../../../services/i18n";
    import Upload from "./Upload.svelte";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function upload() {
        dispatch('upload', {
            image: image,
            original: original,
            pixelated: pixelated
        });
    }

    let tab = 'pixelated';

    let fileInput;
    let image = null;
    let original;
    let pixelated;

    function download() {
        var link = document.createElement('a');
        link.download = 'download.png';
        link.href = pixelated.toDataURL().replace("image/png", "image/octet-stream");
        link.click();
    }
</script>

<div class="w-full justify-center items-center flex">
    <div class="w-full md:max-w-[45vw] flex flex-col items-center m-2">
        <div class="tabs w-full flex-grow-0">
            <button class="tab tab-lifted tab-border-none tab-lg flex-1 font-patrickhand text-xl {tab === 'original' ? 'tab-active' : ''}" on:click={() => tab = 'original'}>{$_("pixelization.image.original")}</button>
            <button class="tab tab-lifted tab-border-none tab-lg flex-1 font-patrickhand text-xl {tab === 'pixelated' ? 'tab-active' : ''}" on:click={() => tab = 'pixelated'}>{$_("pixelization.image.pixelated")}</button>
        </div>
        <div class="bg-base-100 w-full flex flex-col items-center justify-center rounded-xl p-6 shadow-xl {tab === 'original' ? 'rounded-tl-none' : ''} {tab === 'pixelated' ? 'rounded-tr-none' : ''}">
            <div class="w-full {image !== null ? 'hidden' : ''}">
                <Upload bind:image={image} on:upload={upload} bind:fileInput={fileInput}/>
            </div>
            <canvas class="{image === null || tab === 'pixelated' ? 'hidden' : ''} max-w-full max-h-full cursor-pointer" bind:this={original} on:click={() => fileInput.click()}></canvas>
            <canvas class="{image === null || tab === 'original' ? 'hidden' : ''} max-w-full max-h-full [image-rendering:pixelated] cursor-pointer" bind:this={pixelated} on:click={() => fileInput.click()}></canvas>
            <button class="btn btn-outline w-full font-patrickhand font-normal normal-case text-xl m-2 {image === null || tab === 'original' ? 'hidden' : ''}" on:click={download}>
                {$_("pixelization.image.download")}&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"/></g></svg>
            </button>
        </div>
    </div>
</div>