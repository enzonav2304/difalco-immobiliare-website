<template>
  <!-- Recently viewed-->
  <section class="container mb-5 pb-2 pb-lg-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h3 mb-0">Visti di recente</h2>
      <nuxt-link class="btn btn-link fw-normal d-none d-lg-block p-0" to="/estates/all-last-viewed">Vedi tutti<i class="fi-arrow-long-right ms-2"></i></nuxt-link>
    </div>
    <div
      class="tns-carousel-wrapper tns-controls-outside-xxl tns-nav-outside tns-nav-outside-flush mx-n2"
    >
      <!--<vue-tiny-slider class="tns-carousel-inner row gx-4 mx-0 pt-3 pb-4" v-bind="carousel_options" :test="special_offers">-->
      <div class="row gx-4 mx-0 pt-3 pb-4">
        <div class="col tns item" v-for="(i, idx) in recently_viewed" :key="idx">
          <!-- Item-->
          <div class="card shadow-sm card-hover border-0 h-100" v-if="i !== null">
            <div class="card-img-top card-img-hover">
              <nuxt-link class="img-overlay" :to="build_url(i.id)"></nuxt-link>
              <div class="position-absolute start-0 top-0 pt-3 ps-3">
                <span class="d-table badge bg-success mb-1">Verified</span
                ><span class="d-table badge bg-info">New</span>
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
              <div v-if="recently_viewed[idx].imgs != 'noimage'">                
                <span :src="test_image2(recently_viewed[idx].imgs)" />
                <img class="my-img" :src="recently_viewed[idx].imgs.slice(2, 3)" />
              </div>
              <div v-else>
                <img class="no-image" :src="noimage" />
              </div>
              <!--<img class="my-img" src="~assets/img/real-estate/catalog/01.jpg" alt="Image">-->
            </div>            
            <div class="card-body position-relative pb-3">
              <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
                {{ i.contratto }}
              </h4>
              <h3 class="h6 mb-2 fs-base" @click="build_img_array(i.id)">
                <nuxt-link class="nav-link stretched-link" :to="build_url(i.id)"
                  >{{ cptlz(toLwCs(i.nome)) }} | {{ i.mq }} m.q.</nuxt-link
                >
              </h3>

              <p class="mb-2 fs-sm text-muted">{{ i.zone }}, 92100</p>
              <div class="fw-bold">
                <i class="fi-cash mt-n1 me-2 lead align-middle opacity-70"></i
                >{{ convertCurrency(i.prezzo) }}
              </div>
            </div>
            <div
              class="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap"
            >
              <span class="d-inline-block mx-1 px-2 fs-sm"
                >3<i class="fi-bed ms-1 mt-n1 fs-lg text-muted"></i></span
              ><span class="d-inline-block mx-1 px-2 fs-sm"
                >2<i class="fi-bath ms-1 mt-n1 fs-lg text-muted"></i></span
              ><span class="d-inline-block mx-1 px-2 fs-sm"
                >2<i class="fi-car ms-1 mt-n1 fs-lg text-muted"></i
              ></span>
            </div>
          </div>
          <div class="card shadow-sm card-hover border-0 h-100 hide" v-else>
            <div class="card-img-top card-img-hover">
              <nuxt-link class="img-overlay" to="/"></nuxt-link>
              <div class="position-absolute start-0 top-0 pt-3 ps-3">
                <span class="d-table badge bg-success mb-1">Verified</span
                ><span class="d-table badge bg-info">New</span>
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
              <div >
                <img class="no-image" :src="noimage" />
              </div>
              <!--<img class="my-img" src="~assets/img/real-estate/catalog/01.jpg" alt="Image">-->
            </div>            
            <div class="card-body position-relative pb-3">
              <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
                Dummy text
              </h4>
              <h3 class="h6 mb-2 fs-base" @click="build_img_array(i.id)">
                <nuxt-link class="nav-link stretched-link" to="/"
                  >Dummy text</nuxt-link
                >
              </h3>

              <p class="mb-2 fs-sm text-muted">Dummy location, 92100</p>
              <div class="fw-bold">
                <i class="fi-cash mt-n1 me-2 lead align-middle opacity-70"></i
                >500000
              </div>
            </div>
            <div
              class="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap"
            >
              <span class="d-inline-block mx-1 px-2 fs-sm"
                >3<i class="fi-bed ms-1 mt-n1 fs-lg text-muted"></i></span
              ><span class="d-inline-block mx-1 px-2 fs-sm"
                >2<i class="fi-bath ms-1 mt-n1 fs-lg text-muted"></i></span
              ><span class="d-inline-block mx-1 px-2 fs-sm"
                >2<i class="fi-car ms-1 mt-n1 fs-lg text-muted"></i
              ></span>
            </div>
          </div>         
        </div>
      </div>
      <!--</vue-tiny-slider>-->
    </div>
  </section>
</template>

<script>

import { mapGetters } from "vuex"

export default {
  data() {
    return {
      noimage: require("/assets/img/noimage.png"),
      recently_viewed: null,
      tinySliderOptions: {
        controls: true,
        mouseDrag: true,
        loop: true,
        items: 5,
        swipeAngle: 45,
      },
      carousel_options: {
        items: 4,
        controls: true,
        responsive: {
          0: {
            items: 1,
          },
          500: {
            items: 2,
          },
          768: {
            items: 3,
          },
          992: {
            items: 4,
          },
        },
      },
    }
  },
  props: {
    estates: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters({
      myGetter: "mainDataStore/_getter",
    }),
  },
  mounted: function () {
    console.log("mounted recently viewed")
    //console.log("my array", this.getLocalStorageArray("test"))
    this.filterEstates()
    /*
    let x = items.filter((x) => nums.includes(x.id));
    let nums = this.viewed_ids.map(function (str) {
      // using map() to convert array of strings to numbers
      return parseInt(str);
    });
    */
  },
  methods: {
    doGrid: function(array) {
      let lenght = this.lengthObj(array)
      if(lenght == 0) {
        console.log('grid: false')
        return false
      } else {
        console.log('grid: true')
        let array = [...this.recently_viewed]
        let diff = 5 - lenght
        //diff <= 4 
        console.log('grid: recently viewed start', array)
        console.log('grid: diff', diff)
        for(let i = 0; i < diff; i++) {
          array.push(null)
        }
        console.log('grid: recently viewed end', array)
        this.recently_viewed = array
      }
    },
    filterEstates: function() {
      if (this.isEmpty(this.getLocalStorageArray("viewed-estates"))) {
        console.log("viewed localStorage is empty")
      } else {
        console.log("viewedlocalStorage is not empty")
        this.viewed_ids = this.getLocalStorageArray("viewed-estates")
        let items = this.estates
        try {
          let nums = this.viewed_ids
          let x = this.filterArrayByIdsArray(items, nums)
          /* @@@ alternatively @@@
          let x = items.filter(x=>ids.includes(x.id))
          console.log(x)
          */
          x = x.reverse()
          this.recently_viewed = x.slice(0, 5)
          this.doGrid(this.recently_viewed)
        } catch (e) {
          console.log(e)
        }
      }
    },
    build_url: function (id) {
      return `/estate/${id}`
    },
    toLwCs: function (x) {
      return x.toLowerCase()
    },
    cptlz: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    get_image: function (idx) {
      return this.recently_viewed[idx].imgs.slice(0, 1)
    },
    my_image: async function (idx) {
      await this.test_image(this.get_image(idx, idx))
    },
  }
}
</script>
<style scoped>
.my-img {
  /* 
  max-width: 100%
  max-height: 100%
  */
  width: 100%;
  height: 134px !important;
  overflow: hidden;
}
.hide{
  display: none;
}
</style>
