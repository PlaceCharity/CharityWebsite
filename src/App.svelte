<script>
    import { onMount } from 'svelte';
    import { Router, Route } from "svelte-routing";
    import { theme, locale } from './store.js';
    import { setupI18n, isLocaleLoaded } from './services/i18n';

    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";

    import Home from "./routes/home/Home.svelte";
    import Login from './routes/login/Login.svelte';
    import NotFound from "./routes/NotFound.svelte";

    $: if (!$isLocaleLoaded) {
        if ($locale === null || $locale === undefined) locale.set('en');
        setupI18n({ withLocale: $locale });
    }

    let auth = null;

    async function refreshAuth() {
        const response = await fetch('http://localhost:1677/api/whoami', {
            method: 'GET',
            credentials: 'include'
        });
        auth = await response.json();
    }

    function logOut() {
        auth = null;
    }

    onMount(refreshAuth);

    export let url = "";
</script>

<Router {url}>
    {#if $isLocaleLoaded}
        <div data-theme="{$theme === 'light' ? 'garden' : 'dark'}" class="flex flex-col min-h-screen">
            <div class="flex flex-col grow h-full">
                <Header auth={auth} on:localeChanged={e => setupI18n({ withLocale: e.detail }) }/>
                <Route path="/" component={Home} />
                <Route path="/login"><Login auth={auth} on:refreshAuth={refreshAuth} on:logOut={logOut} /></Route>
                <Route component={NotFound} />
            </div>
            <Footer />
        </div>
    {:else}
        <div class="flex h-screen justify-center items-center">
            <h1 class="font-comingsans text-6xl sm:text-7xl md:text-8xl lg:text-9xl">Loading...</h1>
        </div>
    {/if}
</Router>
