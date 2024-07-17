<template>
<main class="page-wrapper">  
  <!-- Loader-->
  <!--loader / -->  
  <!-- Sign In Modal-->
  <signin />
  <!-- Sign Up Modal-->
  <signup />
  <!-- Nav bar -->
  <toolbar />
  <!-- Hero-->
  <hero />
  <!-- Services-->
  <contracts />
  <!-- Property categories-->
  <categories />
  <hr class="mt-n1 mb-5 d-md-none">
  <!-- Top offers (carousel)-->
  <offers :estates="getMainData" />
  <!-- Recently added-->
  <lastInserts />
  <!-- Footer-->
  <isFooter />
  <CookieControl :locale="$store.state.lang" />
</main>
</template>
  
<script>

import {mapGetters} from 'vuex'
  
import calculatorModal from '~/components/modals/calculatorModal.vue'
import categories from '~/components/home/categories.vue'  
import contracts from '~/components/home/contracts.vue'
import isFooter from '~/components/main/_footer.vue'
import hero from '~/components/home/hero/hero.vue'
import lastInserts from '~/components/home/lastInserts.vue'
/*import loader from '~/components/main/loader.vue'*/
import offers from '~/components/home/offers.vue'
import signin from '~/components/modals/signin.vue'
import signup from '~/components/modals/signup.vue'
import toolbar from '~/components/main/header.vue'  

export default {
  name: 'index',
  components: {    
    calculatorModal,
    categories,
    contracts,
    isFooter,
    hero,
    lastInserts,
    /*loader,*/
    offers,
    signin,
    signup,
    toolbar
  },
  data() {
    return{
      cookies: this.$cookies,
      lang: this.$store.state.lang,
      estates: []
    }
  },
  middleware: ['middleware'],
  computed: {
    ...mapGetters({
      getMainData: 'mainDataStore/getEstates',
      getImages: 'mainDataStore/getImages'
    })   
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.detectViewport)  
  },
  created() {
    window.addEventListener('resize', this.detectViewport)
  },
  mounted: function() {
    console.log('control: mounted index')//This object: ', this)
    //this.detectViewport()
    this.extractsImages(this.getImages, this.getMainData)
    // Definisci una serie di frasi per gli annunci casuali
    function generaCodiceAnnuncio() {
      var lettere = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var numeri = '0123456789';
      var codiceAnnuncio = '';
      // Genera tre lettere casuali
      for (var i = 0; i < 3; i++) {
        var indiceLetteraCasuale = Math.floor(Math.random() * lettere.length);
        codiceAnnuncio += lettere.charAt(indiceLetteraCasuale);
      }
      // Genera tre numeri casuali
      for (var j = 0; j < 3; j++) {
        var indiceNumeroCasuale = Math.floor(Math.random() * numeri.length);
        codiceAnnuncio += numeri.charAt(indiceNumeroCasuale);
      }
      return codiceAnnuncio;
    }
    // Esempio di utilizzo
    var codiceCasuale = generaCodiceAnnuncio();
    console.log('test',codiceCasuale);
  }   
}
</script>