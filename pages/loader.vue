<template>
    <div class="page-loading active">
        <div class="page-loading-inner">
            <div class="page-spinner"></div><span>Loading...</span>
        </div>
    </div>
</template>
    
<script>
export default {
    mounted: function() {
        window.onload = function () {
            var preloader = document.querySelector('.page-loading')
            preloader.classList.remove('active')
            setTimeout(function () {
                preloader.remove()
            }, 2000)
        }
    }
}
</script>