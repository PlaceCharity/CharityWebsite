<script>
    import { _ } from '../../../../services/i18n';
    import MainTemplate from './options/MainTemplate.svelte';
    import Modal from './options/Modal.svelte';    

    let template = {
        contact: "",
        templates: []
    }
    let modalOpen = false;
    let subTemplate;
</script>

<div id="place" class="flex flex-col items-center justify-center bg-base-200">
    <h2 class="font-comingsans font-extrabold text-6xl mb-4 text-center">{$_("place.createTemplate.name")}</h2>
    <MainTemplate bind:template bind:modalOpen bind:subTemplate />
    <Modal bind:template bind:modalOpen bind:subTemplate />
</div>