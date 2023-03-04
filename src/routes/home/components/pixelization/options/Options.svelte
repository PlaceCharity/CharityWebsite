<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    function updatePixelated() {
        if (options.distanceMode === "8" && parseInt(options.ditherMode) > 5) {
            options.ditherMode = "0";
        }
        dispatch('updatePixelated');
    }

    let tab = 'colors';

    export let options;
</script>

<div class="w-full justify-center items-center flex">
    <div class="w-full md:max-w-[45vw] flex flex-col items-center m-2">
        <div class="tabs w-full flex-grow-0">
            <button class="tab tab-lifted tab-border-none tab-lg flex-1 font-patrickhand text-xl uppercase {tab === 'sample' ? 'tab-active' : ''}" on:click={() => tab = 'sample'}>Sample</button>
            <button class="tab tab-lifted tab-border-none tab-lg flex-1 font-patrickhand text-xl uppercase {tab === 'colors' ? 'tab-active' : ''}" on:click={() => tab = 'colors'}>Colors</button>
            <button class="tab tab-lifted tab-border-none tab-lg flex-1 font-patrickhand text-xl uppercase {tab === 'process' ? 'tab-active' : ''}" on:click={() => tab = 'process'}>Process</button>
        </div>
        <div class="bg-base-100 w-full flex items-center justify-center rounded-xl p-6 shadow-xl {tab === 'sample' ? 'rounded-tl-none' : ''} {tab === 'process' ? 'rounded-tr-none' : ''}">
            <div class="form-control w-full font-patrickhand">
                <div class={tab === 'sample' ? '' : 'hidden'}>
                    <div class="tabs tabs-boxed w-full flex-grow-0 my-2">
                        <button class="tab flex-1 font-patrickhand text-lg uppercase {options.scaleMode === 0 ? 'tab-active' : ''}" on:click={() => {options.scaleMode = 0; updatePixelated()}}>Absolute</button> 
                        <button class="tab flex-1 font-patrickhand text-lg uppercase {options.scaleMode === 1 ? 'tab-active' : ''}" on:click={() => {options.scaleMode = 1; updatePixelated()}}>Relative</button>
                    </div>
                    <div class="{options.scaleMode === 0 ? '' : 'hidden'}">
                        <label for="width" class="label pt-0">
                            <span class="label-text text-md">Width</span>
                            <input class="input input-bordered input-sm w-16" type="number" min="1" max="512" bind:value={options.width} on:change={updatePixelated} />
                        </label>
                        <input type="range" min="1" max="512" bind:value={options.width} on:change={updatePixelated} class="range" />
                        <label for="height" class="label pt-0">
                            <span class="label-text text-md">Height</span>
                            <input class="input input-bordered input-sm w-16" type="number" min="1" max="512" bind:value={options.height} on:change={updatePixelated} />
                        </label>
                        <input type="range" min="1" max="512" bind:value={options.height} on:change={updatePixelated} class="range" />
                    </div>
                    <div class="{options.scaleMode === 1 ? '' : 'hidden'}">
                        <label for="scaleX" class="label pt-0">
                            <span class="label-text text-md">Scale X</span>
                            <input class="input input-bordered input-sm w-16" type="number" min="1" max="32" bind:value={options.scaleX} on:change={updatePixelated} />
                        </label>
                        <input type="range" min="1" max="32" bind:value={options.scaleX} on:change={updatePixelated} class="range" />
                        <label for="scaleY" class="label pt-0">
                            <span class="label-text text-md">Scale Y</span>
                            <input class="input input-bordered input-sm w-16" type="number" min="1" max="32" bind:value={options.scaleY} on:change={updatePixelated} />
                        </label>
                        <input type="range" min="1" max="32" bind:value={options.scaleY} on:change={updatePixelated} class="range" />
                    </div>
                </div>
                <div class={tab === 'colors' ? '' : 'hidden'}>
                    <label for="distanceMode" class="label pt-0">
                        <span class="label-text text-md">Color Distance Algorithm</span>
                    </label>
                    <select id="distanceMode" bind:value={options.distanceMode} on:change={updatePixelated} class="select select-bordered text-xl w-full">
                        <option value=0>RGB (PxlsFiddle "Fast")</option>
                        <option value=1>CIE76</option>
                        <option value=2>CIE94</option>
                        <option value=3>CIEDE2000 (PxlsFiddle "Accurate")</option>
                        <option value=4>XYZ</option>
                        <option value=5>YCC</option>
                        <option value=6>YIQ</option>
                        <option value=7>YUV</option>
                        <option value=8>K-Means (Recommended!)</option>
                    </select>
                    <div class="divider"/>
                    <label for="ditherMode" class="label pt-0">
                        <span class="label-text text-md">Dithering Algorithm</span>
                    </label>
                    <select id="ditherMode" bind:value={options.ditherMode} on:change={updatePixelated} class="select select-bordered text-xl w-full mb-2">
                        <option value=0>No Dithering</option>
                        <option value=1>Bayer 8x8</option>
                        <option value=2>Bayer 4x4</option>
                        <option value=3>Bayer 2x2</option>
                        <option value=4>Cluster 8x8</option>
                        <option value=5>Cluster 4x4</option>
                        {#if options.distanceMode < 8}
                            <option value=6>Floyd-Steinberg (Per Component)</option>
                            <option value=7>Floyd-Steinberg (Distributed Error)</option>
                        {/if}
                    </select>
                    <div class="{options.ditherMode >= 1 && options.ditherMode <= 5 ? '' : 'hidden'}">
                        <label for="dither-amount" class="label pt-0">
                            <span class="label-text text-md">Dither Amount</span>
                            <input class="input input-bordered input-sm w-16" type="number" min="0" max="999" bind:value={options.dither} on:change={updatePixelated} />
                        </label>
                        <input type="range" min="0" max="999" bind:value={options.dither} on:change={updatePixelated} class="range" />
                    </div>
                    <div class="divider"/>
                    <label for="alpha" class="label pt-0">
                        <span class="label-text text-md">Alpha Threshold</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="0" max="255" bind:value={options.alphaThreshold} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="0" max="255" bind:value={options.alphaThreshold} on:change={updatePixelated} class="range" />
                </div>
                <div class={tab === 'process' ? '' : 'hidden'}>
                    <label for="brightness" class="label pt-0">
                        <span class="label-text text-md">Brightness</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="-255" max="255" bind:value={options.brightness} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="-255" max="255" bind:value={options.brightness} on:change={updatePixelated} class="range" />
                    <label for="contrast" class="label pt-0">
                        <span class="label-text text-md">Contrast</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="-255" max="255" bind:value={options.contrast} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="-255" max="255" bind:value={options.contrast} on:change={updatePixelated} class="range" />
                    <label for="saturation" class="label pt-0">
                        <span class="label-text text-md">Saturation</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="1" max="600" bind:value={options.saturation} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="1" max="600" bind:value={options.saturation} on:change={updatePixelated} class="range" />
                    <label for="gamma" class="label pt-0">
                        <span class="label-text text-md">Gamma</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="1" max="800" bind:value={options.gamma} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="1" max="800" bind:value={options.gamma} on:change={updatePixelated} class="range" />
                    <label for="sharpness" class="label pt-0">
                        <span class="label-text text-md">Sharpness</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="0" max="100" bind:value={options.sharpen} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="0" max="100" bind:value={options.sharpen} on:change={updatePixelated} class="range" />
                    <label for="hue" class="label pt-0">
                        <span class="label-text text-md">Hue</span>
                        <input class="input input-bordered input-sm w-16" type="number" min="-360" max="360" bind:value={options.hue} on:change={updatePixelated} />
                    </label>
                    <input type="range" min="-360" max="360" bind:value={options.hue} on:change={updatePixelated} class="range" />
                </div>
            </div>
        </div>
    </div>
</div>