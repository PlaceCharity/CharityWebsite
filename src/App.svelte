<script>
    import { onMount } from 'svelte';
    import { Router, Route } from "svelte-routing";
    import {theme} from './store.js';

    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";

    import Home from "./routes/home/Home.svelte";
    import Login from './routes/login/Login.svelte';
    import NotFound from "./routes/NotFound.svelte";

    let auth = null;

    async function refreshAuth() {
        const response = await fetch('http://localhost:1677/api/whoami', {
            method: 'GET',
            credentials: 'include'
        });
        auth = await response.json();
        console.log(auth);
    }

    onMount(refreshAuth);

    export let url = "";
</script>

<Router {url}>
    <div data-theme="{$theme === 'light' ? 'garden' : 'dark'}" class="flex flex-col min-h-screen">
        <div class="flex flex-col grow h-full">
            <Header auth={auth}/>
            <Route path="/" component={Home} />
            <Route path="/login"><Login auth={auth} on:refreshAuth={refreshAuth} /></Route>
            <Route component={NotFound} />
        </div>
        <Footer />
    </div>
</Router>
