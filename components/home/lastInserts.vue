<template>
  <section v-if="last_inserted" class="container pb-4 pt-1 mb-5">
    <div
      class="d-flex align-items-end align-items-lg-center justify-content-between mb-4 pb-md-2"
    >
      <div
        class="d-flex w-100 align-items-center justify-content-between justify-content-lg-start"
      >
        <h2 class="h3 mb-0 me-md-4">Ultimi inserimenti</h2>
        <div class="dropdown d-md-none" data-bs-toggle="select">
          <button
            class="btn btn-outline-secondary btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            <span class="dropdown-toggle-label">Houses</span>
          </button>
          <input type="hidden" />
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              <span class="dropdown-item-label">Apartments</span></a
            ><a class="dropdown-item" href="#">
              <span class="dropdown-item-label">Houses</span></a
            ><a class="dropdown-item" href="#">
              <span class="dropdown-item-label">Rooms</span></a
            ><a class="dropdown-item" href="#">
              <span class="dropdown-item-label">Commercial</span></a
            >
          </div>
        </div>
        <ul class="nav nav-tabs d-none d-md-flex ps-lg-2 mb-0">
          <li class="nav-item">
            <a class="nav-link fs-sm mb-2 mb-md-0" href="#">Apartments</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-sm active mb-2 mb-md-0" href="#">Houses</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-sm mb-2 mb-md-0" href="#">Rooms</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-sm mb-2 mb-md-0" href="#">Commercial</a>
          </li>
        </ul>
      </div>
      <nuxt-link class="btn btn-link fw-normal d-none d-lg-block p-0" to="/estates/all-last-inserted">Vedi tutti<i class="fi-arrow-long-right ms-2"></i></nuxt-link>
    </div>
    <div class="row g-4">
      <div class="col-md-6">
        <div
          class="card bg-size-cover bg-position-center border-0 overflow-hidden h-100"
          style="
            background-image: url(https://dl.dropboxusercontent.com/s/dik6g6eazzpgz1e/DSC_5411.JPG);
          "
        >
          <span class="img-gradient-overlay"></span>
          <div class="card-body content-overlay pb-0">
            <div class="d-flex">
              <span class="badge bg-success fs-sm me-2">Verified</span
              ><span class="badge bg-info fs-sm">New</span>
            </div>
          </div>
          <div class="card-footer content-overlay border-0 pt-0 pb-4">
            <div
              class="d-sm-flex justify-content-between align-items-end pt-5 mt-2 mt-sm-5"
            >
              <nuxt-link
                class="text-decoration-none text-light pe-2"
                :to="build_url(last_inserted[0]['id'])"
              >
                <div class="fs-sm text-uppercase pt-2 mb-1">In Vendita</div>
                <!--<h3 class="h5 text-light mb-1">{{cptlz(toLwCs(last_inserted[0].nome))}} | {{i.mq}} m.q.</h3>-->
                <h3 class="h5 text-light mb-1">
                  {{ cptlz(toLwCs(last_inserted[0]["nome"])) }}
                </h3>
                <div class="fs-sm opacity-70">
                  <i class="fi-map-pin me-1"></i>{{ last_inserted[0]["zone"] }}, 92100
                </div>
              </nuxt-link>
              <div class="btn-group ms-n2 ms-sm-0 mt-3">
                <nuxt-link
                  class="btn btn-primary px-3"
                  :to="build_url(last_inserted[0]['id'])"
                  style="height: 2.75rem"
                  >{{ convertCurrency(last_inserted[0]["prezzo"]) }}
                </nuxt-link>
                <button
                  class="btn btn-primary btn-icon border-end-0 border-top-0 border-bottom-0 border-light fs-sm"
                  type="button"
                >
                  <i class="fi-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div
          class="card bg-size-cover bg-position-center border-0 overflow-hidden mb-4"
          style="
            background-image: url(https://dl.dropboxusercontent.com/s/lmr2joh44hf1i69/DSC_5422.JPG);
          "
        >
          <span class="img-gradient-overlay"></span>
          <div class="card-body content-overlay pb-0">
            <span class="badge bg-info fs-sm">New</span>
          </div>
          <div class="card-footer content-overlay border-0 pt-0 pb-4">
            <div
              class="d-sm-flex justify-content-between align-items-end pt-5 mt-2 mt-sm-5"
            >
              <nuxt-link
                class="text-decoration-none text-light pe-2"
                :to="build_url(last_inserted[1]['id'])"
              >
                <div class="fs-sm text-uppercase pt-2 mb-1">For sale</div>
                <h3 class="h5 text-light mb-1">
                  {{ cptlz(toLwCs(last_inserted[1]["nome"])) }}
                </h3>
                <div class="fs-sm opacity-70">
                  <i class="fi-map-pin me-1"></i>{{ last_inserted[1]["zone"] }}, 92100
                </div></nuxt-link
              >
              <div class="btn-group ms-n2 ms-sm-0 mt-3">
                <nuxt-link
                  class="btn btn-primary px-3"
                  :to="build_url(last_inserted[1]['id'])"
                  style="height: 2.75rem"
                  >{{ convertCurrency(last_inserted[1]["prezzo"]) }}</nuxt-link
                >
                <button
                  class="btn btn-primary btn-icon border-end-0 border-top-0 border-bottom-0 border-light fs-sm"
                  type="button"
                >
                  <i class="fi-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="card bg-size-cover bg-position-center border-0 overflow-hidden"
          style="background-image: url(assets/img/real-estate/recent/03.jpg)"
        >
          <span class="img-gradient-overlay"></span>
          <div class="card-body content-overlay pb-0">
            <span class="badge bg-info fs-sm">New</span>
          </div>
          <div class="card-footer content-overlay border-0 pt-0 pb-4">
            <div
              class="d-sm-flex justify-content-between align-items-end pt-5 mt-2 mt-sm-5"
            >
              <nuxt-link
                class="text-decoration-none text-light pe-2"
                :to="build_url(last_inserted[2]['id'])"
              >
                <div class="fs-sm text-uppercase pt-2 mb-1">For sale</div>
                <h3 class="h5 text-light mb-1">
                  {{ cptlz(toLwCs(last_inserted[2]["nome"])) }}
                </h3>
                <div class="fs-sm opacity-70">
                  <i class="fi-map-pin me-1"></i>{{ last_inserted[2]["zone"] }}, 92100
                </div></nuxt-link
              >
              <div class="btn-group ms-n2 ms-sm-0 mt-3">
                <nuxt-link
                  class="btn btn-primary px-3"
                  :to="build_url(last_inserted[0]['id'])"
                  style="height: 2.75rem"
                  >{{ convertCurrency(last_inserted[2]["prezzo"]) }}</nuxt-link
                >
                >
                <button
                  class="btn btn-primary btn-icon border-end-0 border-top-0 border-bottom-0 border-light fs-sm"
                  type="button"
                >
                  <i class="fi-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else>loading</section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      /* last_inserted: null */
    };
  },
  computed: {
    ...mapGetters({
      myGetter: "mainDataStore/_getter",
    }),
    last_inserted: function () {
      return this.myGetter("last_inserted")
    },
  },
  mounted: function () {
    console.log("mounted last inseted");
  },
  methods: {
    build_url: function (id) {
      return `/estate/${id}`;
    },
    toLwCs: function (x) {
      return x.toLowerCase();
    },
    cptlz: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>
