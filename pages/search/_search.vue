<template>
  <!-- Main -->
  <main class="page-wrapper">
    <!-- Sign In Modal-->
    <signin />
    <!-- Sign Up Modal-->
    <signup />
    <!-- Nav bar -->
    <toolbar />
    <!-- Navbar--> 
    <!-- Page content-->
    <!-- Page container-->
    <div class="container-fluid mt-5 pt-5 p-0">
      <div class="row g-0 mt-n3">
        <!-- Filters sidebar (Offcanvas on mobile)-->
        <sideBar />
        <!-- Page content-->
        <div class="col-lg-8 col-xl-9 position-relative overflow-hidden pb-5 pt-4 px-3 px-xl-4 px-xxl-5">
          <!-- Map popup-->
          <div class="map-popup invisible" id="map">
            <button 
              class="btn btn-icon btn-light btn-sm shadow-sm rounded-circle" 
              type="button" 
              data-bs-toggle-class="invisible" 
              data-bs-target="#map"
            >
              <i class="fi-x fs-xs"></i>
            </button>
            <div class="interactive-map" data-map-options-json="json/map-options-real-estate-rent.json"></div>
          </div>
          <!-- breadcrum -->
          <breadcrumb />
          <!-- Title-->
          <div class="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4">
            <h1 class="h2 mb-sm-0">{{setPagename}}</h1>
            <a class="d-inline-block fw-bold text-decoration-none py-1" href="#" data-bs-toggle-class="invisible" data-bs-target="#map">
              <i class="fi-map me-2"></i>Map view
            </a>
          </div>
          <!-- Sorting-->
          <headerMain />
          <!-- Catalog grid-->
          <mainComponent :estates="getEstates" :pagename="setPagename" />
          <!-- Pagination-->
          <nav class="border-top pb-md-4 pt-4 mt-2" aria-label="Pagination">
            <ul class="pagination mb-1">
              <li class="page-item d-sm-none"><span class="page-link page-link-static">1 / 5</span></li>
              <li class="page-item active d-none d-sm-block" aria-current="page"><span class="page-link">1<span class="visually-hidden">(current)</span></span></li>
              <li class="page-item d-none d-sm-block"><a class="page-link" href="#">2</a></li>
              <li class="page-item d-none d-sm-block"><a class="page-link" href="#">3</a></li>
              <li class="page-item d-none d-sm-block">...</li>
              <li class="page-item d-none d-sm-block"><a class="page-link" href="#">8</a></li>
              <li class="page-item"><a class="page-link" href="#" aria-label="Next"><i class="fi-chevron-right"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <!-- Footer-->
    <isFooter />
  </main>
  <!-- Filters sidebar toggle button (mobile)-->
  <!--<button class="btn btn-primary btn-sm w-100 rounded-0 fixed-bottom d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#filters-sidebar"><i class="fi-filter me-2"></i>Filters</button>
  <-- Back to top button--
  <a class="btn-scroll-top" href="#top" data-scroll><span class="btn-scroll-top-tooltip text-muted fs-sm me-2">Top</span><i class="btn-scroll-top-icon fi-chevron-up">   </i></a>
  -->

</template>


<script>

import {mapGetters} from 'vuex'

import breadcrumb from '~/components/main/breadcrumb.vue'
import headerMain from '~/components/estates/header.vue'
import isFooter from '~/components/main/_footer.vue'
import mainComponent from '~/components/estates/mainComponent.vue'
import sideBar from '~/components/estates/sideBar.vue'
import signin from '~/components/modals/signin.vue'
import signup from '~/components/modals/signup.vue'
import toolbar from '~/components/main/header.vue'

/* dummy */

export default {
  components: {
    breadcrumb,
    isFooter,
    toolbar,   
    signin,
    signup,
    sideBar,
    headerMain,
    mainComponent   
  },
  data() {
    return {
      estates: [],
      nav_obj: [],
      itemsFound: '',
      pagename: ''      
    }
  },
  middleware: ['middleware'],
  computed: {
    ...mapGetters({
      getEstates : 'mainDataStore/getFilteredEstates',
      navObj: 'appStore/getNavObj',      
      myGetter: 'mainDataStore/_getter'
    }),    
    setPagename: function() {
      let obj = this.navObj.find(element => element.pagename !== null)
      return this.pagename = obj.pagename
    }
  },
  mounted: function() {    
    if(this.getEstates) {
      console.log(this.filterCollectionByArray(this.getEstates, 'ville'))
    }
  },
  methods: {
    returnWhatIWant: function(obj, val) {
      return this.arrayType(obj, val)
    }
}
}

</script>

<style>
</style>

