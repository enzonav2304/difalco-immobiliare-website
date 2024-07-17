<template>
<div class="modal fade" id="advanced-search-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered p-2 my-0 mx-auto" style="max-width: 950px;">
        <div class="modal-content">
            <div class="modal-body px-0 py-2 py-sm-0">
                <button class="btn-close position-absolute top-0 end-0 mt-3 me-3" type="button" data-bs-dismiss="modal"></button>
                <h1>Hallo!!</h1>
                <sideBar />
            </div>
        </div>
    </div>
</div>   
   
</template>

<script>
import sideBar from '~/components/estates/sideBar.vue'
export default {
    component: {
        sideBar
    }    
}
</script>