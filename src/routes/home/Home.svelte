<script>
    import Pixelization from "./components/pixelization/Pixelization.svelte";
    let alert = true;

    function handleAnchorClick(event) {
		event.preventDefault()
		const link = event.currentTarget;
		const anchorId = new URL(link.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		window.scrollTo({
			top: anchor.offsetTop,
			behavior: 'smooth'
		});
	}
</script>
<div>
    <div class="flex flex-col items-center justify-center bg-base-100">
        <div class="alert alert-warning shadow-lg w-fit p-0 transition-all duration-300 ease-out overflow-hidden mx-4 {alert === true ? 'max-h-96' : 'max-h-0'}">
            <div class="p-2">
                <span class="material-icons-round">warning</span>
                <span class="font-patrickhand text-xl text-center">Charity is in Beta! Some features may not be complete!</span>
                <button class="btn btn-warning btn-circle" on:click={() => alert = false}>
                    <span class="material-icons-round">close</span>
                </button>
            </div>
        </div>
        <h1 class="font-comingsans text-8xl tracking-wide mb-8 text-center">Charity</h1>
        <p class="font-patrickhand text-4xl mb-8 text-center">Pxls Templates, Information, and Utilities</p>
        <div class="flex flex-col sm:flex-row items-center">
            <a href="#pixelization" class="btn btn-outline btn-wide font-patrickhand normal-case text-xl m-2" on:click={handleAnchorClick}>Create a Template</a>
            <button class="btn btn-outline btn-wide btn-disabled font-patrickhand normal-case text-xl m-2">
                Add our Discord Bot&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"></path></svg>
            </button>
        </div>
    </div>
    <svg class="bg-base-100" viewBox="0 -25 1200 145" preserveAspectRatio="none">
        <path class="fill-base-200" d="M-5 150V27.35A600.21 600.21 0 00321.39 56.44C379.39 45.65 435.55 26.31 493.39 14.58 575.78-2.14 661.58-3.15 743.84 14.19 823.78 31 906.67 72 985.66 92.83 1055.71 111.31 1132.19 118.92 1205 95.83V150Z"></path>
        <path class="stroke-[#f8a5a8] stroke-charity-red fill-transparent stroke-[5]" d="M-5 27.35A600.21 600.21 0 00321.39 56.44C379.39 45.65 435.55 26.31 493.39 14.58 575.78-2.14 661.58-3.15 743.84 14.19 823.78 31 906.67 72 985.66 92.83 1055.71 111.31 1132.19 118.92 1205 95.83"></path>
    </svg>
    <Pixelization/>
    <svg class="bg-base-200" viewBox="0 -25 1200 145" preserveAspectRatio="none">
        <path class="fill-base-100" d="M-5 39 28.5 32C57 25 114 11 171.2 5.7 228.3.3 285.7 3.7 342.8 22.7 400 41.7 457 76.3 514.2 95.8 571.3 115.3 628.7 119.7 685.8 103.8 743 88 800 52 857.2 41.7 914.3 31.3 971.7 46.7 1028.8 63.7 1086 80.7 1143 99.3 1171.5 108.7L1205 118V150H-5Z"></path>
        <path class="stroke-[#f1b5f7] stroke-charity-red fill-transparent stroke-[5]" d="M-5 39 28.5 32C57 25 114 11 171.2 5.7 228.3.3 285.7 3.7 342.8 22.7 400 41.7 457 76.3 514.2 95.8 571.3 115.3 628.7 119.7 685.8 103.8 743 88 800 52 857.2 41.7 914.3 31.3 971.7 46.7 1028.8 63.7 1086 80.7 1143 99.3 1171.5 108.7L1205 118"></path>
    </svg>
</div>