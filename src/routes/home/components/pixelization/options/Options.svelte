<script>
    import { _ } from '../../../../../services/i18n';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    function updatePixelated() {
        if (options.distanceMode === "8" && parseInt(options.ditherMode) > 5) {
            options.ditherMode = "0";
        }
        dispatch('updatePixelated');
    }

    function reset() {
        options = {
            scaleMode: 1,
            width: 128,
            height:128,
            scaleX: 1,
            scaleY: 1,
            distanceMode: "0",
            ditherMode: "0",
            dither: 64,
            alphaThreshold: 128,
            brightness: 0,
            contrast: 0,
            saturation: 100,
            gamma: 100,
            sharpen: 0,
            hue: 0,
            palette: "0"
        }
        updatePixelated();
    }

    let tab = 'colors';

    export let options;
</script>

<div class="w-full justify-center items-center flex">
    <div class="w-full md:max-w-[45vw] flex flex-col items-center m-2">
        <div class="tabs w-full flex-grow-0">
            <button class="tab tab-lifted tab-border-none tab-lg flex-1 font-patrickhand font-normal text-xl {tab === 'sample' ? 'tab-active' : ''}" on:click={() => tab = 'sample'}>{$_("pixelization.options.sample.name")}</button>
            <button class="tab tab-lifted tab-border-none tab-lg flex-1 font-patrickhand font-normal text-xl {tab === 'colors' ? 'tab-active' : ''}" on:click={() => tab = 'colors'}>{$_("pixelization.options.colors.name")}</button>
            <button class="tab tab-lifted tab-border-none tab-lg flex-1 font-patrickhand font-normal text-xl {tab === 'process' ? 'tab-active' : ''}" on:click={() => tab = 'process'}>{$_("pixelization.options.process.name")}</button>
        </div>
        <div class="bg-base-100 w-full flex items-center justify-center rounded-xl p-6 shadow-xl {tab === 'sample' ? 'rounded-tl-none' : ''} {tab === 'process' ? 'rounded-tr-none' : ''}">
            <div class="form-control w-full font-patrickhand font-normal">
                <div class={tab === 'sample' ? '' : 'hidden'}>
                    <label for="palette" class="label pt-0">
                        <span class="label-text text-md">{$_("pixelization.options.sample.palette.label")}</span>
                    </label>
                    <select id="palette" bind:value={options.palette} on:change={updatePixelated} class="select select-bordered text-xl w-full font-normal">
                        <option value=0>{$_("pixelization.options.sample.palette.pxls")}</option>
                        <option value=1>{$_("pixelization.options.sample.palette.rplace1")}</option>
                        <option value=2>{$_("pixelization.options.sample.palette.rplace2")}</option>
                        <option value=3>{$_("pixelization.options.sample.palette.rplace3")}</option>
                    </select>
                    <div class="divider"/>
                    <div class="tabs tabs-boxed w-full flex-grow-0 my-2">
                        <button class="tab flex-1 font-patrickhand font-normal text-lg {options.scaleMode === 0 ? 'tab-active' : ''}" on:click={() => {options.scaleMode = 0; updatePixelated()}}>{$_("pixelization.options.sample.absolute.name")}</button> 
                        <button class="tab flex-1 font-patrickhand font-normal text-lg {options.scaleMode === 1 ? 'tab-active' : ''}" on:click={() => {options.scaleMode = 1; updatePixelated()}}>{$_("pixelization.options.sample.relative.name")}</button>
                    </div>
                    <div class="{options.scaleMode === 0 ? '' : 'hidden'}">
                        <label for="width" class="label pt-0">
                            <span class="label-text text-md">{$_("pixelization.options.sample.absolute.width")}</span>
                            <input class="input input-bordered input-sm w-16" type="number" min="1" max="512" bind:value={options.width} on:change={updatePixelated} />
                        </label>
                        <input type="range" min="1" max="512" bind:value={options.width} on:change={updatePixelated} class="range" />
                        <label for="height" class="label pt-0">
                            <span class="label-text text-md">{$_("pixelization.options.sample.absolute.height")}</span>
                            <input class="input input-bordered input-sm w-16" type="number" min="1" max="512" bind:value={options.height} on:change={updatePixelated} />
                        </label>
                        <input type="range" min="1" max="512" bind:value={options.height} on:change={updatePixelated} class="range" />
                    </div>
                    <div class="{options.scaleMode === 1 ? '' : 'hidden'}">
                        <label for="scaleX" class="label pt-0">
                            <span class="label-text text-md">{$_("pixelization.options.sample.relative.scaleX")}</span>
                            <input class="input input-bordered input-sm w-16" type="number" min="1" max="32" bind:value={options.scaleX} on:change={updatePixelated} />
                        </label>
                        <input type="range" min="1" max="32" bind:value={options.scaleX} on:change={updatePixelated} class="range" />
                        <label for="scaleY" class="label pt-0">
                            <span class="label-text text-md">{$_("pixelization.options.sample.relative.scaleY")}</span>
                            <input class="input input-bordered input-sm w-16" type="number" min="1" max="32" bind:value={options.scaleY} on:change={updatePixelated} />
                        </label>
                        <input type="range" min="1" max="32" bind:value={options.scaleY} on:change={updatePixelated} class="range" />
                    </div>
                </div>
                <div class={tab === 'colors' ? '' : 'hidden'}>
                    <label for="distanceMode" class="label pt-0">
                        <span class="label-text text-md">{$_("pixelization.options.colors.colorDistanceAlg.label")}</span>
                    </label>
                    <select id="distanceMode" bind:value={options.distanceMode} on:change={updatePixelated} class="select select-bordered text-xl w-full font-normal">
                        <option value=0>{$_("pixelization.options.colors.colorDistanceAlg.rgb")}</option>
                        <option value=1>{$_("pixelization.options.colors.colorDistanceAlg.cie76")}</option>
                        <option value=2>{$_("pixelization.options.colors.colorDistanceAlg.cie94")}</option>
                        <option value=3>{$_("pixelization.options.colors.colorDistanceAlg.ciede2000")}</option>
                        <option value=4>{$_("pixelization.options.colors.colorDistanceAlg.xyz")}</option>
                        <option value=5>{$_("pixelization.options.colors.colorDistanceAlg.ycc")}</option>
                        <option value=6>{$_("pixelization.options.colors.colorDistanceAlg.yiq")}</option>
                        <option value=7>{$_("pixelization.options.colors.colorDistanceAlg.yuv")}</option>
                        <option value=8>{$_("pixelization.options.colors.colorDistanceAlg.kMeans")}</option>
                    </select>
                    <div class="divider"/>
                    <label for="ditherMode" class="label pt-0">
                        <span class="label-text text-md">{$_("pixelization.options.colors.ditherAlg.label")}</span>
                    </label>
                    <select id="ditherMode" bind:value={options.ditherMode} on:change={updatePixelated} class="select select-bordered text-xl w-full mb-2 font-normal">
                        <option value=0>{$_("pixelization.options.colors.ditherAlg.none")}</option>
                        <option value=1>{$_("pixelization.options.colors.ditherAlg.bayer8x8")}</option>
                        <option value=2>{$_("pixelization.options.colors.ditherAlg.bayer4x4")}</option>
                        <option value=3>{$_("pixelization.options.colors.ditherAlg.bayer2x2")}</option>
                        <option value=4>{$_("pixelization.options.colors.ditherAlg.cluster8x8")}</option>
                        <option value=5>{$_("pixelization.options.colors.ditherAlg.cluster4x4")}</option>
                        {#if options.distanceMode < 8}
                            <option value=6>{$_("pixelization.options.colors.ditherAlg.floydSteinbergPerComponent")}</option>
                            <option value=7>{$_("pixelization.options.colors.ditherAlg.floydSteinbergDistributedError")}</option>
                        {/if}
                    </select>
                    <div class="{options.ditherMode >= 1 && options.ditherMode <= 5 ? '' : 'hidden'}">
                        <label for="dither-amount" class="label pt-0">
                            <span class="label-text text-md">{$_("pixelization.options.colors.ditherAmount")}</span>
                            <input class="input input-bordered input-sm w-16" type="number" min="0" max="999" bind:value={options.dither} on:change={updatePixelated} />
                        </label>
                        <input type="range" min="0" max="999" bind:value={options.dither} on:change={updatePixelated} class="range" />
                    </div>
                    <div class="divider"/>
                    <label for="alpha" class="label pt-0">
                        <span class="label-text text-md">{$_("pixelization.options.colors.alphaThreshold")}</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="0" max="255" bind:value={options.alphaThreshold} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="0" max="255" bind:value={options.alphaThreshold} on:change={updatePixelated} class="range" />
                </div>
                <div class={tab === 'process' ? '' : 'hidden'}>
                    <label for="brightness" class="label pt-0">
                        <span class="label-text text-md">{$_("pixelization.options.process.brightness")}</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="-255" max="255" bind:value={options.brightness} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="-255" max="255" bind:value={options.brightness} on:change={updatePixelated} class="range" />
                    <label for="contrast" class="label pt-0">
                        <span class="label-text text-md">{$_("pixelization.options.process.contrast")}</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="-255" max="255" bind:value={options.contrast} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="-255" max="255" bind:value={options.contrast} on:change={updatePixelated} class="range" />
                    <label for="saturation" class="label pt-0">
                        <span class="label-text text-md">{$_("pixelization.options.process.saturation")}</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="1" max="600" bind:value={options.saturation} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="1" max="600" bind:value={options.saturation} on:change={updatePixelated} class="range" />
                    <label for="gamma" class="label pt-0">
                        <span class="label-text text-md">{$_("pixelization.options.process.gamma")}</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="1" max="800" bind:value={options.gamma} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="1" max="800" bind:value={options.gamma} on:change={updatePixelated} class="range" />
                    <label for="sharpness" class="label pt-0">
                        <span class="label-text text-md">{$_("pixelization.options.process.sharpness")}</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="0" max="100" bind:value={options.sharpen} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="0" max="100" bind:value={options.sharpen} on:change={updatePixelated} class="range" />
                    <label for="hue" class="label pt-0">
                        <span class="label-text text-md">{$_("pixelization.options.process.hue")}</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="-360" max="360" bind:value={options.hue} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="-360" max="360" bind:value={options.hue} on:change={updatePixelated} class="range" />
                </div>
            </div>
        </div>
        <div class="flex flex-row w-full justify-end">
            <button class="btn normal-case font-patrickhand font-normal text-xl my-2" on:click={reset}>
                {$_("pixelization.options.reset")}
            </button>
        </div>
    </div>
</div>