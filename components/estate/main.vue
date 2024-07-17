<template>
  <div class="row gy-5 pt-lg-2">
    <div class="col-lg-7">
      <div class="d-flex flex-column">
        <!-- Carousel with slides count-->
        <div class="order-lg-1 order-2">
          <div class="tns-carousel-wrapper">
            <div class="tns-slides-count text-light">
              <i class="fi-image fs-lg me-2"></i>
              <div class="ps-1">
                <span class="tns-current-slide fs-5 fw-bold"></span>
                <span class="fs-5 fw-bold">/</span>
                <span class="tns-total-slides fs-5 fw-bold"></span>
              </div>
            </div>

            <div v-if="images[0] != 'noimage'">
              <no-ssr>
                <vue-flux
                  :options="fluxOptions"
                  :images="getEstateImages"
                  :transitions="vfTransitions"
                  ref="slider"
                  ><!-- :images="estates[idx].imgs" -->
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
          <!-- Thumbnails nav-->
          <!--
          <ul class="tns-thumbnails mb-4" id="thumbnails">
            <li class="tns-thumbnail">
              <img src="~assets/img/real-estate/single/th09.jpg" alt="Thumbnail" />
            </li>
            <li class="tns-thumbnail">
              <img src="~assets/img/real-estate/single/th10.jpg" alt="Thumbnail" />
            </li>
            <li class="tns-thumbnail">
              <img src="~assets/img/real-estate/single/th11.jpg" alt="Thumbnail" />
            </li>
            <li class="tns-thumbnail">
              <img src="~assets/img/real-estate/single/th12.jpg" alt="Thumbnail" />
            </li>
            <li class="tns-thumbnail">
              <div
                class="d-flex flex-column align-items-center justify-content-center h-100"
              >
                <i class="fi-play-circle fs-4 mb-1"></i><span>Play video</span>
              </div>
            </li>
          </ul>
          -->
        </div>
        <!-- Page title + Features-->
        <div class="order-lg-2 order-1 pt-5">
          <h1 class="h2 mb-2">{{ cptlz(toLwCs(estate_main[0].nome)) }}</h1>
          <p class="mb-2 pb-1 fs-lg">
            {{ estate_main[0].tipo_immobile }} in {{ estate_main[0].contratto }} a
            {{ estate_sub[0].citta }}
          </p>
          <ul class="d-flex mb-4 pb-lg-2 list-unstyled">
            <li class="me-3 pe-3 border-end">
              <b class="me-1">{{ estate_sub[0].stanze }}</b
              ><i class="fi-bed mt-n1 lead align-middle text-muted"></i>
            </li>
            <li class="me-3 pe-3 border-end">
              <b class="me-1">{{ estate_sub[0].bagni }}</b
              ><i class="fi-bath mt-n1 lead align-middle text-muted"></i>
            </li>
            <li class="me-3 pe-3 border-end">
              <b class="me-1">2</b
              ><i class="fi-car mt-n1 lead align-middle text-muted"></i>
            </li>
            <li>
              <b>{{ estate_sub[0].mq }} </b>m.q.
            </li>
          </ul>
        </div>
      </div>
      <!-- Overview-->
      <h2 class="h5">Descrizione</h2>
      <p class="mb-4 pb-2">{{ estate_main[0].descrizione }}</p>
      <!-- Rental agent-->
      <!--<rentalAgent />-->
    </div>
    <!-- Sidebar with details-->
    <aside class="col-lg-5">
      <div class="ps-lg-5">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div>
            <span class="badge bg-success me-2 mb-2">Verified</span
            ><span class="badge bg-info me-2 mb-2">New</span>
          </div>
          <div class="text-nowrap">
            <button
              class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle ms-2 mb-2"
              type="button"
              data-bs-toggle="tooltip"
              title="aggiungi ai favoriti"
            >
              <i class="fi-heart"></i>
            </button>
            <div class="dropdown d-inline-block" data-bs-toggle="tooltip" title="Share">
              <button
                class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle ms-2 mb-2"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i class="fi-share"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-end my-1">
                <!--
                <a href="#" onclick="
                  FB.ui({
                    method: 'share',
                    href: 'https://your-link.com',
                  }, function(response){});
                ">Share on Facebook</a>
                -->
                <button class="dropdown-item" type="button" @click="shareLink()">
                  <i class="fi-facebook fs-base opacity-75 me-2"></i>Facebook
                </button>
                <button class="dropdown-item" type="button">
                  <i class="fi-twitter fs-base opacity-75 me-2"></i>Twitter
                </button>
                <button class="dropdown-item" type="button">
                  <i class="fi-instagram fs-base opacity-75 me-2"></i>Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
        <h3 class="h5 mb-2">Prezzo:</h3>
        <h2 class="h3 mb-4 pb-2">
          {{ convertCurrency(prices.prezzo)}}
          <span class="d-inline-block ms-1 fs-base fw-normal text-body"><!--/month--></span>
        </h2>
        <!-- Property details-->
        <div class="card border-0 bg-secondary mb-4">
          <div class="card-body">
            <h5 class="mb-0 pb-3">Dettagli Immobile</h5>
            <ul class="list-unstyled mt-n2 mb-0">
              <li class="mt-2 mb-0">
                <b>Tipologia: </b>{{ estate_main[0].tipo_immobile }}
              </li>
              <li class="mt-2 mb-0"><b>Stanze: </b>{{ estate_sub[0].stanze }}</li>
              <li class="mt-2 mb-0"><b>Bagni: </b>{{ estate_sub[0].bagni }}</li>
              <li class="mt-2 mb-0"><b>Superfice: </b>{{ estate_sub[0].mq }} m.q.</li>
              <li class="mt-2 mb-0">
                <b>Spese condominiali: </b>€ {{ prices.spese_accessorie }}
              </li>
              <li class="mt-2 mb-0">
                <b>Anno costruzione: </b
                >{{
                  estate_details[0].anno === "0000"
                    ? "Non Disponibile"
                    : estate_details[0].anno
                }}
              </li>
              <li class="mt-2 mb-0">
                <b>Ascensore: </b>{{ estate_details[0].ascensore == 1 ? "Si" : "No" }}
              </li>
              <li class="mt-2 mb-0">
                <b>Condizioni: </b>{{ estate_details[0].condizione }}
              </li>
              <li class="mt-2 mb-0"><b>Arredato: </b>{{ estate_details[0].arredato }}</li>
              <li class="mt-2 mb-0">
                <b>Riscaldamento: </b>{{ estate_details[0].riscaldamento }}
              </li>
              <li class="mt-2 mb-0">
                <b>Posto Auto: </b>{{ estate_details[0].posto_auto == 1 ? "Si" : "No" }}
              </li>
              <li class="mt-2 mb-0">
                <b>Giardino: </b>{{ estate_details[0].giardino == 1 ? "Si" : "No" }}
              </li>
              <div v-if="estate_details[0].giardino == 1">
                <li class="mt-2 mb-0">
                  <b>Giardino: </b>{{ estate_details[0].giardino_mq }}
                </li>
              </div>
              <li class="mt-2 mb-0">
                <b>Box Auto: </b>{{ estate_details[0].box_auto == 1 ? "Si" : "No" }}
              </li>
              <div v-if="estate_details[0].box_auto == 1">
                <li class="mt-2 mb-0">
                  <b>Box Auto mq: </b>{{ estate_details[0].box_auto_mq }} mq
                </li>
              </div>
            </ul>
          </div>
        </div>
        <nuxt-link to="/contact-form" class="btn btn-lg btn-primary w-100 mb-3"
          >Prenota una visita</nuxt-link
        >
        <!--<a class="btn btn-lg btn-primary w-100 mb-3" href="#">Prenota una visita</a>-->
        <a class="d-inline-block mb-4 pb-2 text-decoration-none" href="#">
          <i class="fi-help me-2 mt-n1 align-middle"></i>Frequently asked questions
        </a>
        <!-- Amenities
              <div class="card border-0 bg-secondary mb-4">
                <div class="card-body">
                  <h5>Amenities</h5>
                  <ul class="list-unstyled row row-cols-md-2 row-cols-1 gy-2 mb-0 text-nowrap">
                    <li class="col"><i class="fi-wifi mt-n1 me-2 fs-lg align-middle"></i>WiFi</li>
                    <li class="col"><i class="fi-thermometer mt-n1 me-2 fs-lg align-middle"></i>Heating</li>
                    <li class="col"><i class="fi-dish mt-n1 me-2 fs-lg align-middle"></i>Dishwasher</li>
                    <li class="col"><i class="fi-parking mt-n1 me-2 fs-lg align-middle"></i>Parking place</li>
                    <li class="col"><i class="fi-snowflake mt-n1 me-2 fs-lg align-middle"></i>Air conditioning</li>
                    <li class="col"><i class="fi-iron mt-n1 me-2 fs-lg align-middle"></i>Iron</li>
                    <li class="col"><i class="fi-tv mt-n1 me-2 fs-lg align-middle"></i>TV</li>
                    <li class="col"><i class="fi-laundry mt-n1 me-2 fs-lg align-middle"></i>Laundry</li>
                    <li class="col"><i class="fi-cctv mt-n1 me-2 fs-lg align-middle"></i>Security cameras</li>
                    <li class="col"><i class="fi-no-smoke mt-n1 me-2 fs-lg align-middle"></i>No smocking</li>
                  </ul>
                  <div class="collapse" id="seeMoreAmenities">
                    <ul class="list-unstyled row row-cols-md-2 row-cols-1 gy-2 pt-2 mb-0 text-nowrap">
                      <li class="col"><i class="fi-double-bed mt-n1 me-2 fs-lg align-middle"></i>Double bed</li>
                      <li class="col"><i class="fi-bed mt-n1 me-2 fs-lg align-middle"></i>Single bed</li>
                    </ul>
                  </div><a class="collapse-label collapsed d-inline-block mt-3" href="#seeMoreAmenities" data-bs-toggle="collapse" data-bs-label-collapsed="Show more" data-bs-label-expanded="Show less" role="button" aria-expanded="false" aria-controls="seeMoreAmenities"></a>
                </div>
              </div>
              -->
        <!-- Not included in rent
        <div class="card border-0 bg-secondary mb-4">
          <div class="card-body">
            <h5>Not included in rent</h5>
            <ul class="list-unstyled row row-cols-md-2 row-cols-1 gy-2 mb-0 text-nowrap">
              <li class="col">
                <i class="fi-swimming-pool mt-n1 me-2 fs-lg align-middle"></i>Swimming
                pool
              </li>
              <li class="col">
                <i class="fi-cafe mt-n1 me-2 fs-lg align-middle"></i>Restaurant
              </li>
              <li class="col">
                <i class="fi-spa mt-n1 me-2 fs-lg align-middle"></i>Spa lounge
              </li>
              <li class="col">
                <i class="fi-cocktail mt-n1 me-2 fs-lg align-middle"></i>Bar
              </li>
            </ul>
          </div>
        </div>
        -->
        <div class="card border-0 bg-secondary mb-4">
          <div class="card-body">
            <h5>Classificazione energetica</h5>
            <div class="energy-class pt-1">
              <div class="a"></div>
              <div class="b"></div>
              <div class="c"></div>
              <div class="d"></div>
              <div class="e"></div>
              <div class="f"></div>
              <div class="g"></div>
              <span id="e-class"></span>
            </div>
          </div>
        </div>
        <!-- Post meta-->
        <ul class="d-flex mb-4 list-unstyled fs-sm">
          <!--<li class="me-3 pe-3 border-end">Published: <b>Dec 9, 2020</b></li>{{ formatDateEn('2020-12-25') }}-->
          <li class="me-3 pe-3 border-end">
            Pubblicato: <b>{{ formatDateEn(estate_main[0].data_pubblicazione) }}</b>
          </li>
          <li class="me-3 pe-3 border-end">Ad number: <b>681013232</b></li>
          <li class="me-3 pe-3">Views: <b>48</b></li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>

import Vue from 'vue'
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
      noimage: require("/assets/img/noimage.png"),
      isFBReady: false,
      viewed_ids: null,
      fluxOptions: {
        autoplay: false,
      },
      fluxImages: [
        "/img/real-estate/single/09.jpg",
        "/img/real-estate/single/10.jpg",
        "/img/real-estate/single/11.jpg",
        "/img/real-estate/single/12.jpg",
      ],
      vfTransitions: ["fade", "cube", "book", "wave"],
      carousel_options: {
        navAsThumbnails: true,
        navContainer: "#thumbnails",
        gutter: 12,
        responsive: {
          0: { controls: false },
          500: { controls: true },
        },
      },
    };
  },
  props: {
    estate_main: {
      type: Array,
    },
    estate_sub: {
      type: Array,
    },
    prices: {
      type: Object,
    },
    estate_details: {
      type: Array,
    },
    images: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters({
      myGetter: "mainDataStore/_getter",
    }),
    getEstateImages: function () {
      //let record = obj.find(element => element.active === true)
      return this.myGetter("images_estate_array");
    }
  },
  created: function() {
    if (process.env.NODE_ENV === 'production') {
      this.pageUrl = window.location.href;
    } else {
      this.pageUrl = 'https://www.difalcoimmobiliare.it/estate/325'
    }
  },
  mounted: function () {
    console.log("mounted component estate_main");
    const y = this.estate_details[0].id_classe;
    const x = document.querySelector("#e-class");
    x.className = y.toLowerCase();
    /* test storage */
    if (!this.isEmpty(this.getLocalStorageArray("viewed-estates"))) {
      console.log("viewed localStorage is not empty");
      this.viewed_ids = this.getLocalStorageArray("viewed-estates");
      /*
      let nums = this.viewed_ids.map(function (str) {
        // using map() to convert array of strings to numbers
        return parseInt(str);
      });
      */
      if (!this.viewed_ids.includes(this.estate_main[0].id)) {
        this.pushLocalStorageArrayItem("viewed-estates", this.estate_main[0].id);
      }
    } else {
      this.pushLocalStorageArrayItem("viewed-estates", this.estate_main[0].id);
    }
    this.isFBReady = Vue.FB != undefined
    window.addEventListener('fb-sdk-ready', this.onFBReady)
  },
  beforeDestroy: function () {
    window.removeEventListener('fb-sdk-ready', this.onFBReady)
  },
  methods: {
    toLwCs: function (x) {
      return x.toLowerCase();
    },
    cptlz: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    formatDateEn(date) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
    onFBReady: function () {
      this.isFBReady = true
    },
    
    shareLink: function() {
      if (!this.isFBReady) {
        console.log("Facebook SDK is not ready yet.")
        return
      }
      FB.ui({
        method: 'share',
        //href: 'https://facebook.com/enzo.nav.7',
        href: window.location.href
      }, function(response){})
    }
    
    /*shareLink: function() {
      if (!this.isFBReady) {
        console.log("Facebook SDK is not ready yet.")
        return
      }
      let shareUrl = '';
      if (process.env.NODE_ENV === 'production') {
        console.log('env: ', process.env.NODE_ENV)
        shareUrl = window.location.href
        console.log('env: ', shareUrl)
      } else {
        console.log('env: ', process.env.NODE_ENV)
        shareUrl = 'https://www.difalcoimmobiliare.it'
        console.log('env: ', shareUrl)
      }
      FB.ui({
        method: 'share',
        href: shareUrl,
      }, function(response){})
    }*/
  }
}
</script>
