<script>
    import { _ } from '../../../../services/i18n';
    import Image from "./image/Image.svelte";
    import Options from "./options/Options.svelte";

    let bitmap;
    let original;
    let pixelated;

    const api = {
        version: Module.cwrap('version', 'number', []),
        create_buffer: Module.cwrap('create_buffer', 'number', ['number', 'number']),
        destroy_buffer: Module.cwrap('destroy_buffer', '', ['number']),
        process: Module.cwrap('process', '', ['number', 'number', 'number', 'number']),
        free_result: Module.cwrap('free_result', '', ['number']),
        get_result_pointer: Module.cwrap('get_result_pointer', 'number', []),
        get_result_size: Module.cwrap('get_result_size', 'number', []),
    };

    function upload(e) {
        createImageBitmap(e.detail.image).then(btmp => {
            e.detail.original.width = btmp.width;
            e.detail.original.height = btmp.height;
            const ctx = e.detail.original.getContext('2d');
            ctx.drawImage(btmp, 0, 0);
            bitmap = ctx.getImageData(0, 0, btmp.width, btmp.height);
            original = e.detail.original;
            pixelated = e.detail.pixelated;
            updatePixelated();
        });
    }

    let options = {
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

    function updatePixelated() {
        const p = api.create_buffer(bitmap.width, bitmap.height);
        Module.HEAP8.set(bitmap.data, p);
        api.process(p, bitmap.width, bitmap.height, options.scaleMode, options.width, options.height, options.scaleX, options.scaleY, parseInt(options.distanceMode), parseInt(options.ditherMode), options.dither, options.alphaThreshold, options.brightness, options.contrast, options.saturation, options.gamma, options.sharpen, options.hue, parseInt(options.palette));
        const resultPointer = api.get_result_pointer();
        const resultSize = api.get_result_size();
        const resultView = new Uint8Array(Module.HEAP8.buffer, resultPointer, resultSize);
        const result = new Uint8Array(resultView);
        api.free_result(resultPointer);
        api.destroy_buffer(p);

        const blob = new Blob([result], {type: 'image/png'});
        createImageBitmap(blob).then(bitmap => {
            pixelated.width = bitmap.width;
            pixelated.height = bitmap.height;
            if (bitmap.width > bitmap.height) {
                pixelated.style.width = `${bitmap.width*(original.width/original.height)}px`;
            }
            if (bitmap.height >= bitmap.width) {
                pixelated.style.width = `${original.width}px`;
            }
            const ctx = pixelated.getContext('2d');
            ctx.drawImage(bitmap, 0, 0);
        });
    }
</script>

<div id="pixelization" class="flex flex-col items-center justify-center bg-base-200">
    <h2 class="font-comingsans font-extrabold text-6xl mb-4 text-center">{$_("pixelization.name")}</h2>
    <div class="flex flex-col md:flex-row w-full items-start">
        <Image on:upload={upload}/>
        <Options bind:options={options} on:updatePixelated={updatePixelated}/>
    </div>
</div>