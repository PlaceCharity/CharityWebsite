<svelte:head>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/base16/edge-dark.min.css">
</svelte:head>

<script>
    import { onMount, beforeUpdate } from 'svelte';

    beforeUpdate(updateCode);
    onMount(updateCode);

    function updateCode() {
        if (document.getElementById('json')) {
		    templateJSON = JSON.stringify(template, null, 2).split("\n");

            document.getElementById('json').innerHTML = '';
            for (let i = 0; i < templateJSON.length; i++) {
                const jsonElement = document.getElementById('json');
                const pre = document.createElement('pre');
                const code = document.createElement('code');
                pre.setAttribute('data-prefix', i + 1);
                code.className = 'language-json contents';
                code.innerText = templateJSON[i];
                pre.appendChild(code);
                jsonElement.appendChild(pre);
            }
        }

        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
        document.head.append(script);

        script.onload = function() {
            hljs.highlightAll();
            script.remove();
        };
    }

    function createTemplate() {
        template.templates.push({ name: "", sources: [], x: 0, y: 0 });
        modalOpen = true;
        subTemplate = template.templates.filter(temp => temp.sources.length === 0)[0];
        template = template;
    }

    function editTemplate(temp) {
        modalOpen = true;
        subTemplate = temp;
        template = template;
    }

    function removeTemplate() {
        template.templates.pop();
        template = template;
    }

    export let template;
    export let modalOpen;
    export let subTemplate;

    let templateJSON = JSON.stringify(template, null, 2).split("\n");
</script>

<div class="flex flex-col md:flex-row w-full items-start">
    <div class="w-full justify-center items-center flex">
        <div class="bg-base-100 w-full flex items-center justify-center rounded-xl p-6 shadow-xl m-4">
            <div class="form-control w-full font-patrickhand font-normal">
                <label for="contact" class="label">
                    <span class="label-text">Contact Information</span>
                </label>
                <input type="text" placeholder="Type here..." class="input input-bordered w-full mb-2" bind:value={template.contact}/>
                <div class="collapse collapse-arrow bg-base-200 rounded-md mb-2">
                    <input type="checkbox" checked />
                    <div class="collapse-title text-xl font-medium">
                      Templates
                    </div>
                    <div class="collapse-content">
                        <div class="w-full">
                            {#each template.templates as subTemp}
                                <button class="btn btn-outline w-full mb-2" on:click={editTemplate(subTemp)}>{subTemp.name}</button>
                            {/each}
                        </div>
                        <button class="btn" on:click={createTemplate}>Add Template</button>
                        <button class="btn {template.templates.length > 0 ? '' : 'btn-disabled'}" on:click={removeTemplate}>Remove Template</button>
                    </div>
                </div>
                
                
            </div>
        </div>
    </div>
    <div class="w-full justify-center items-center flex">
        <div id="json" class="mockup-code w-full m-4"></div>
    </div>
</div>