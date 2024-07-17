<template>
  <div class="row g-4 py-4">
    <!-- Item-->
    <div v-if="getResultNull" class="overflow-hidden p-3 mt-0 pt-0 p-md-5 m-md-3 text-center bg-light">
      <div class="col-md-5 p-lg-5 mx-auto my-5">
        <h1 class="h2 mb-2">Nessun immobile</h1>
        <p class="lead fw-normal">Utilizza la barra laterale per una nuova ricerca oppure vai alla Home</p>
        <!--<a class="btn btn-primary" href="#">Home</a>-->
        <button class="btn btn-primary" type="button" @click="resetSearch()">Search</button>
      </div>
    </div>    
    <div class="col-sm-6 col-xl-4" v-for="(i, idx) in estates" :key="idx">
      <div v-if="!getResultNull" class="card shadow-sm card-hover border-0 h-100">
        <div class="tns-carousel-wrapper card-img-top card-img-hover">
          <a class="img-overlay" href="real-estate-single-v1.html"></a>
          <div class="position-absolute start-0 top-0 pt-3 ps-3">
            <span class="d-table badge bg-success mb-1">Verified</span>
            <span class="d-table badge bg-info">New</span>
          </div>
          <div class="content-overlay end-0 top-0 pt-3 pe-3">
            <button
              class="btn btn-icon btn-light btn-xs text-primary rounded-circle"
              type="button"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="aggiungi ai favoriti"
            >
              <i class="fi-heart"></i>
            </button>
          </div>
          <div v-if="estates[idx].imgs != 'noimage'">
            <no-ssr>
              <vue-flux
                :options="fluxOptions"
                :images="estates[idx].imgs"
                :transitions="vfTransitions"
                ref="slider"
              >
                <template v-slot:controls>
                  <flux-controls />
                </template>
              </vue-flux>
            </no-ssr>
          </div>
          <div v-else>
            <!--<img :src="noimage" style="width:360px; height:300;"/>-->
            <img class="no-image" :src="noimage" />
          </div>
        </div>
        <div class="card-body position-relative pb-3">
          <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
            {{ i.contratto }}
          </h4>
          <h3 class="h6 mb-2 fs-base" @click="build_img_array(i.id)">
            <!--<a class="nav-link stretched-link" :href="'/estate/' + i.id">{{i.nome}} | {{i.mq}} m.q.</a>-->
            <nuxt-link class="nav-link stretched-link" :to="build_url(i.id)"
              >{{ cptlz(toLwCs(i.nome)) }} | {{ i.mq }} m.q.</nuxt-link
            >
          </h3>
          <p class="mb-2 fs-sm text-muted">{{i.tipo_immobile}} - {{ i.zone }}, 92100</p>
          <div class="fw-bold">
            <i class="fi-cash mt-n1 me-2 lead align-middle opacity-70"></i
            >{{ convertCurrency(i.prezzo) }}
          </div>
          <!--
                <div class="fw-bold"><i class="fi-cash mt-n1 me-2 lead align-middle opacity-70"></i>€{{i.prezzo}}</div>
                -->
        </div>
        <div
          class="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap"
        >
          <span class="d-inline-block mx-1 px-2 fs-sm"
            >{{ i.stanze }}<i class="fi-bed ms-1 mt-n1 fs-lg text-muted"></i
          ></span>
          <span class="d-inline-block mx-1 px-2 fs-sm"
            >{{ i.bagni }}<i class="fi-bath ms-1 mt-n1 fs-lg text-muted"></i
          ></span>
          <span class="d-inline-block mx-1 px-2 fs-sm"
            >1<i class="fi-car ms-1 mt-n1 fs-lg text-muted"></i
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { VueFlux, FluxControls } from "vue-flux/dist-ssr/vue-flux.umd.min.js";
import "vue-flux/dist-ssr/vue-flux.css";

export default {
  components: {
    VueFlux,
    FluxControls,
  },
  data() {
    return {
      slider_model: [],
      noimage: require("/assets/img/noimage.png"),
      fluxOptions: {
        autoplay: false,
      },
      item_img_array: null,
      fluxImages_: [],
      vfTransitions: ["fade", "cube", "book", "wave"],
      tests: [
        {
          title: "List User",
          url: `/user/function/listUser/${this.$route.params.id}`,
        },
      ],
    };
  },
  props: {
    estates: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters({
      //getMainData: 'mainDataStore/getEstates'
      getImages: "mainDataStore/getImages",
      myAppGetter: 'appStore/_getter'
    }),
    getResultNull() {
      return this.myAppGetter('search_result_0')
    },
  },
  mounted: function () {
    console.log("control: mounted main component")
    //this.getStatusSearch()
    this.$store.watch(
      (state, getters) => this.myAppGetter('search_result_0'),
      (newValue, oldValue) => {
        console.log('>> debug getter: ' + newValue)
        console.log('>> debug getter: ' + oldValue)
        //this.numberItemsFound()
      }
    )
    console.log("control: image state is null? ", this.isNull(this.getImages))
    /*
    if(!this.isEmpty(this.getImages)) {
      console.log('debug getImages: ', this.getImages)
    }
    console.log('empty img array? ', this.isEmpty(this.getImages))
    */
    console.log('control: createSlider and loadLazyImages')
    this.createSlider()
    this.loadLazyImages()
  },
  methods: {
    createSlider: function () {
      /* compare imgs arrays of objects with items arrays of objects, and assign img array to the item obj by id*/
      /*
      console.log("control: create slider function...")
      console.log("control: extracts images...")
      this.extractsImages(this.getImages, this.estates)
      */
      //store.getters['mainDataStore/getEstates']
      //store.getters['mainDataStore/getImages']
      /* create the slider model by the number of not null array of images */
      let array = []
      //this.f_map(this.rejectNullObject(this.estates, 'id_immobile', 'id'), () => array.push(0))
      /* this is old */
      console.log("control: build v-model slider empty items array...")
      this.estates.map(() => array.push(0))
      return (this.slider_model = array)
    },
    build_url: function (id) {
      return `/estate/${id}`;
    },
    toLwCs: function (x) {
      if(x) {
        return x.toLowerCase()
      }
      
    },
    cptlz: function (str) {
      if(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
      
    },
    resetSearch: function() {
      //console.log('> debug: get localstorage global_search')
      this.clearStorage()
      this.$store.commit('appStore/setSearchOptions', {})
      this.$store.commit('appStore/setActiveSearch', false)
      this.$store.commit('mainDataStore/setFilteredItems', {})
      this.clearLocalStorage()
      //this.result_search = 0
      console.log('> debug: reset search, pushing home')
      //this.$eventBus.$emit('search-result', this.getLocalStorageArray('global_search'))        
      this.$router.push('/')
    },
    /*convertCurrency: function (){
      return this.convertCurrency
    }*/
  },
};
</script>
