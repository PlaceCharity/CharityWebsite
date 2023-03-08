<script>
    import { _ } from "../../services/i18n";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function refreshAuth() {
        dispatch('refreshAuth');
    }

    function logOut() {
        dispatch('logOut');
    }

    export let auth;
</script>
<div class="flex flex-col grow justify-center align-middle items-center">
    <div class="flex flex-col grow md:flex-row items-center">
        <div class="card md:min-w-96 bg-neutral text-neutral-content m-4">
            <div class="card-body items-center text-center">
                {#if auth === null || auth.pxls === null || auth === undefined || auth.pxls === undefined}
                    <h2 class="card-title text-3xl font-patrickhand font-normal">{$_("login.pxls.card.title")}</h2>
                    <p class="text-xl font-patrickhand font-normal">{$_("login.pxls.card.description")}</p>
                    <div class="card-actions justify-center">
                        <a class="btn btn-ghost" href="https://pxls.space/signin/discord?redirect=1" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"></path></svg></a>
                        <a class="btn btn-ghost" href="https://pxls.space/signin/vk?redirect=1" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M23.45 5.948c.166-.546 0-.948-.795-.948H20.03c-.668 0-.976.347-1.143.73c0 0-1.335 3.196-3.226 5.272c-.612.602-.89.793-1.224.793c-.167 0-.418-.191-.418-.738V5.948c0-.656-.184-.948-.74-.948H9.151c-.417 0-.668.304-.668.593c0 .621.946.765 1.043 2.513v3.798c0 .833-.153.984-.487.984c-.89 0-3.055-3.211-4.34-6.885C4.45 5.288 4.198 5 3.527 5H.9c-.75 0-.9.347-.9.73c0 .682.89 4.07 4.145 8.551C6.315 17.341 9.37 19 12.153 19c1.669 0 1.875-.368 1.875-1.003v-2.313c0-.737.158-.884.687-.884c.39 0 1.057.192 2.615 1.667C19.11 18.216 19.403 19 20.405 19h2.625c.75 0 1.126-.368.91-1.096c-.238-.724-1.088-1.775-2.215-3.022c-.612-.71-1.53-1.475-1.809-1.858c-.389-.491-.278-.71 0-1.147c0 0 3.2-4.426 3.533-5.929Z" clip-rule="evenodd"></path></svg></a>
                        <a class="btn btn-ghost" href="https://pxls.space/signin/reddit?redirect=1" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="1.06em" height="1em" viewBox="0 0 1792 1696"><path fill="currentColor" d="M1792 846q0 58-29.5 105.5T1683 1024q12 46 12 96q0 155-106.5 287T1298 1615.5T898 1692t-399.5-76.5t-290-208.5T102 1120q0-47 11-94q-51-25-82-73.5T0 846q0-82 58-140.5T199 647q85 0 145 63q218-152 515-162L975 27q3-13 15-21t26-5l369 81q18-37 54-59.5T1518 0q62 0 106 43.5t44 105.5t-44 106t-106 44t-105.5-43.5T1369 150l-334-74l-104 472q300 9 519 160q58-61 143-61q83 0 141 58.5t58 140.5zM418 1045q0 62 43.5 106t105.5 44t106-44t44-106t-44-105.5T567 896q-61 0-105 44t-44 105zm810 355q11-11 11-26t-11-26q-10-10-25-10t-26 10q-41 42-121 62t-160 20t-160-20t-121-62q-11-10-26-10t-25 10q-11 10-11 25.5t11 26.5q43 43 118.5 68t122.5 29.5t91 4.5t91-4.5t122.5-29.5t118.5-68zm-3-205q62 0 105.5-44t43.5-106q0-61-44-105t-105-44q-62 0-106 43.5t-44 105.5t44 106t106 44z"></path></svg></a>
                        <a class="btn btn-ghost" href="https://pxls.space/signin/tumblr?redirect=1" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6.27 7.63A5.76 5.76 0 0 0 10.815 2h3.03v5.152h3.637v3.636h-3.636v5.454c0 .515.197 1.207.909 1.667c.474.307 1.484.458 3.03.455V22h-4.242a4.545 4.545 0 0 1-4.546-4.545v-6.667H6.27V7.63z"></path></svg></a>
                        <a class="btn btn-ghost" href="https://pxls.space/signin/google?redirect=1" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"></path></svg></a>
                    </div>
                    <button class="btn btn-ghost absolute top-0 right-0 m-2" on:click={refreshAuth}><span class="material-icons-round">refresh</span></button>
                {:else if auth.discord === null || auth.discord === undefined}
                    <h2 class="card-title gap-0 text-3xl font-patrickhand font-normal">{$_("login.discord.card.title", {values: { username: auth.pxls.username}})}</h2>
                    <p class="text-xl font-patrickhand font-normal">{$_("login.discord.card.description", {values: { username: auth.pxls.username}})}</p>
                    <div class="card-actions justify-center">
                        <a href="https://charity.pxls.space/api/auth" class="btn btn-outline btn-wide text-neutral-content font-patrickhand font-normal normal-case text-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"></path></svg>
                            &nbsp;{$_("login.discord.card.button")}
                        </a>
                    </div>
                {:else}
                    <h2 class="card-title text-3xl font-patrickhand font-normal">{$_("login.complete.card.title")}</h2>
                    <p class="text-xl font-patrickhand font-normal">{$_("login.complete.card.description", {values: { username: auth.pxls.username}})}</p>
                    <button class="btn btn-outline btn-wide text-neutral-content font-patrickhand font-normal normal-case text-xl" on:click={logOut}>
                        {$_("login.complete.card.button")}
                    </button>
                {/if}
            </div>
        </div>
        <ul class="steps md:steps-vertical mx-4 text-xl font-patrickhand font-normal">
            <li class="step step-primary">{$_("login.pxls.label")}</li>
            <li class="step {auth !== null && auth.pxls !== null && auth !== undefined && auth.pxls !== undefined ? 'step-primary' : ''}">{$_("login.discord.label")}</li>
            <li class="step {auth !== null && auth.pxls !== null && auth.discord !== null && auth !== undefined && auth.pxls !== undefined && auth.discord !== undefined ? 'step-primary' : ''}">{$_("login.complete.label")}</li>
        </ul>
    </div>
    <svg class="bg-base-100" viewBox="0 -25 1200 145" preserveAspectRatio="none">
        <path class="fill-base-100" d="M-5 39 28.5 32C57 25 114 11 171.2 5.7 228.3.3 285.7 3.7 342.8 22.7 400 41.7 457 76.3 514.2 95.8 571.3 115.3 628.7 119.7 685.8 103.8 743 88 800 52 857.2 41.7 914.3 31.3 971.7 46.7 1028.8 63.7 1086 80.7 1143 99.3 1171.5 108.7L1205 118V150H-5Z"></path>
        <path class="stroke-[#f1b5f7] stroke-charity-red fill-transparent stroke-[5]" d="M-5 39 28.5 32C57 25 114 11 171.2 5.7 228.3.3 285.7 3.7 342.8 22.7 400 41.7 457 76.3 514.2 95.8 571.3 115.3 628.7 119.7 685.8 103.8 743 88 800 52 857.2 41.7 914.3 31.3 971.7 46.7 1028.8 63.7 1086 80.7 1143 99.3 1171.5 108.7L1205 118"></path>
    </svg>
</div>
