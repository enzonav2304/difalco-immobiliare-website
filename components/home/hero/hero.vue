<template>
<section class="container-fluid my-5 pt-5 pb-lg-4 px-xxl-4">
  <!--
  <div 
    class="jarallax card align-items-center justify-content-center border-0 p-md-5 p-4 bg-secondary overflow-hidden mt-n3" 
    style="min-height: 65vh; 
    background-image: url(https://www.difalcoimmobiliare.it/img/hero-bg.png);" 
    data-jarallax data-speed="0.5"
  >
  -->
  <div 
    class="jarallax card align-items-center justify-content-center border-0 p-md-5 p-4 bg-secondary overflow-hidden mt-n3" 
    :style="{ 'background-image': `url(${getImage})`, 'min-height': '65vh' }" 
    data-jarallax data-speed="0.5"
  >
    <span class="img-overlay opacity-40"></span>
    <div class="content-overlay" style="max-width: 856px;">
      <h1 class="display-5 mb-5 pb-md-3 px-md-3 text-white text-center">Immobiliare di Falco</h1>      
      <searchBar />
    </div>
  </div>
</section>
</template>

<script>

import searchBar from '~/components/home/hero/search.vue'

export default {
  name: 'hero',
  components: {
    searchBar
  },
  data() {
    return {
      windowWidth: 0,
      
    }
  },
  computed: {
    getImage() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 720) {
        //this.size = 1
        return require("@/static/img/hero-bg@480x334.png");
      } else if (this.windowWidth > 720 && this.windowWidth <= 1080) {
        //this.size = 2
        return require("@/static/img/hero-bg@1680x748.png");
      } else {
        this.size = 3
        return require("@/static/img/hero-bg.png");
      }
    }
  },
  methods: {
    _getImage: function(){
      return this.getImage
    }
  },
  mounted: function () {
    window.addEventListener("resize", this._getImage);
  }
}
</script>
