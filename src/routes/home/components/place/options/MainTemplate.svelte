<svelte:head>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/base16/edge-dark.min.css">
</svelte:head>

<script>
    import { _ } from '../../../../../services/i18n';
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

    function findJSONTemplateInParams(urlString) {
        const urlSearchParams = new URLSearchParams(urlString);
        const params = Object.fromEntries(urlSearchParams.entries());
        return params.jsontemplate ? params.jsontemplate : null;
    }

    let whitelistAdd = "";

    function whitelistTemplate() {
        try {
            const url = new URL(whitelistAdd);
            if (url.protocol === "http:" || url.protocol === "https:") {
                if (url.hash.substring(1).includes("jsontemplate") || url.search.substring(1).includes("jsontemplate")) {
                    template.whitelist.push(findJSONTemplateInParams(url.hash.substring(1)) || findJSONTemplateInParams(url.search.substring(1)));
                } else {
                    template.whitelist.push(whitelistAdd);
                }
                template = template;
            }
        } catch(e) {
            return;
        }
    }

    let blacklistAdd = "";

    function blacklistTemplate() {
        try {
            const url = new URL(blacklistAdd);
            if (url.protocol === "http:" || url.protocol === "https:") {
                if (url.hash.substring(1).includes("jsontemplate") || url.search.substring(1).includes("jsontemplate")) {
                    template.blacklist.push(findJSONTemplateInParams(url.hash.substring(1)) || findJSONTemplateInParams(url.search.substring(1)));
                } else {
                    template.blacklist.push(blacklistAdd);
                }
                template = template;
            }
        } catch(e) {
            return;
        }
    }

    let jsonImport = "";
    async function importTemplate() {
        try {
            let link = jsonImport;
            const url = new URL(jsonImport);
            if (url.protocol === "http:" || url.protocol === "https:") {
                if (url.hash.substring(1).includes("jsontemplate") || url.search.substring(1).includes("jsontemplate")) {
                    link = findJSONTemplateInParams(url.hash.substring(1)) || findJSONTemplateInParams(url.search.substring(1));
                }
            }
            const response = await fetch(`https://pxls.space/cors/${link}`, {
                method: 'GET'
            });
            const json = await response.json();
            if (json !== undefined && json !== null) {
                if (json.contact === undefined || json.contact === null) json.contact = "";
                if (json.templates === undefined || json.templates === null) json.templates = [];
                if (json.whitelist === undefined || json.whitelist === null) json.whitelist = [];
                if (json.blacklist === undefined || json.blacklist === null) json.blacklist = [];
                template = json;
            }
        } catch(e) {
            return;
        }
    }

    export let template;
    export let modalOpen;
    export let subTemplate;

    let templateJSON = JSON.stringify(template, null, 2).split("\n");
</script>

<div class="flex flex-col md:flex-row w-full items-start">
    <div class="w-full justify-center items-center flex m-4">
        <div class="bg-base-100 w-full flex items-center justify-center rounded-xl p-6 shadow-xl">
            <div class="form-control w-full font-patrickhand font-normal">
                <label for="contact" class="label">
                    <span class="label-text">{$_("place.createTemplate.contact.label")}</span>
                </label>
                <input type="text" placeholder={$_("place.createTemplate.contact.placeholder")} class="input input-bordered w-full mb-2" bind:value={template.contact}/>
                <div class="divider" />
                <div class="collapse collapse-arrow bg-base-200 rounded-md mb-2">
                    <input type="checkbox" checked />
                    <div class="collapse-title text-xl font-medium">
                        {$_("place.createTemplate.templates.label")}
                    </div>
                    <div class="collapse-content">
                        <div class="w-full">
                            {#each template.templates as subTemp}
                                <button class="btn btn-outline w-full mb-2" on:click={editTemplate(subTemp)}>{subTemp.name}</button>
                            {/each}
                        </div>
                        <button class="btn" on:click={createTemplate}>{$_("place.createTemplate.templates.addTemplate")}</button>
                    </div>
                </div>
                <div class="collapse collapse-arrow bg-base-200 rounded-md mb-2">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">
                        {$_("place.createTemplate.whitelist.label")}
                    </div>
                    <div class="collapse-content">
                        <div class="w-full">
                            {#each template.whitelist as whitelisted}
                                <button class="btn btn-error w-full mb-2" on:click={() => {template.whitelist = template.whitelist.filter(wl => wl !== whitelisted)}}>{whitelisted}</button>
                            {/each}
                        </div>
                        <div class="{template.whitelist.length  > 0 ? 'divider' : 'hidden'}" />
                        <input type="text" placeholder={$_("place.createTemplate.whitelist.placeholder")} class="input input-bordered w-full mb-2" bind:value={whitelistAdd}/>
                        <button class="btn" on:click={whitelistTemplate}>{$_("place.createTemplate.whitelist.button")}</button>
                    </div>
                </div>
                <div class="collapse collapse-arrow bg-base-200 rounded-md mb-2">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">
                        {$_("place.createTemplate.blacklist.label")}
                    </div>
                    <div class="collapse-content">
                        <div class="w-full">
                            {#each template.blacklist as blacklisted}
                                <button class="btn btn-error w-full mb-2" on:click={() => {template.blacklist = template.blacklist.filter(wl => wl !== blacklisted)}}>{blacklisted}</button>
                            {/each}
                        </div>
                        <div class="{template.blacklist.length  > 0 ? 'divider' : 'hidden'}" />
                        <input type="text" placeholder={$_("place.createTemplate.blacklist.placeholder")} class="input input-bordered w-full mb-2" bind:value={blacklistAdd}/>
                        <button class="btn" on:click={blacklistTemplate}>{$_("place.createTemplate.blacklist.button")}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full justify-center items-center flex flex-col m-4">
        <div id="json" class="mockup-code w-full"></div>
        <div class="flex flex-row w-full justify-end mt-2">
            <input type="text" placeholder={$_("place.createTemplate.import.placeholder")} class="input input-bordered w-full mr-2" bind:value={jsonImport}/>
            <button class="btn" on:click={importTemplate}>{$_("place.createTemplate.import.button")}</button>
        </div>
    </div>
</div>