<script>
    import { Link } from "svelte-routing";
    import Login from "../routes/login/Login.svelte";
    import {theme} from '../store.js';
    let checked = $theme === 'light';

    function changeTheme() {
        if ($theme === 'dark') {
            theme.set('light');
        } else {
            theme.set('dark');
        }
    }

    export let auth;
</script>
<div class="navbar bg-base-100">
    <div class="flex-1">
        <Link class="btn btn-ghost" to="/">
            <span class="normal-case font-comingsans text-3xl tracking-wider">Charity</span>
            <img class="h-full" src="assets/images/charity.png" alt="Charity Logo">
        </Link>
    </div>
    <Link class="btn font-patrickhand text-lg {auth !== null && auth.pxls !== null && auth.discord !== null && auth !== undefined && auth.pxls !== undefined && auth.discord !== undefined ? 'btn-ghost' : ''}" to="/login">
    {#if auth !== null && auth.pxls !== null && auth.discord !== null && auth !== undefined && auth.pxls !== undefined && auth.discord !== undefined}
        <span class="hidden font-patrickhand text-lg normal-case sm:inline-flex">Logged in as&nbsp;<b>{auth.pxls.username}</b></span>
    {:else}
        LOGIN
    {/if}
    </Link>
    <label class="btn btn-ghost swap swap-rotate mx-1">
        <input type="checkbox" checked={checked} on:change={changeTheme}/>
        <span class="material-icons-round swap-on w-10 h-10 text-4xl">light_mode</span>
        <span class="material-icons-round swap-off w-10 h-10 text-4xl">dark_mode</span>
    </label>
</div>