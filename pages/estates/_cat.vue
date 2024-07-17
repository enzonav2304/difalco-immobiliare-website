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
          <mainComponent :estates="paginatedEstates" :pagename="setPagename"/>
          <!-- Pagination-->
          <nav v-if="!getResultNull" class="border-top pb-md-4 pt-4 mt-2" aria-label="Pagination">
            <ul class="pagination mb-1">
              <li class="page-item"><span class="page-link page-link-static">{{currentPage}} / {{ totalPages }}</span></li>
              <!--
              <li class="page-item d-sm-none">
                <span class="page-link page-link-static">{{currentPage}} / {{ totalPages }}</span>
              </li>
              -->
              <li class="page-item" :class="{'disabled': currentPage === 1 }">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="previousPage">
                  <i class="fi-chevron-left"></i>
                </a>
              </li>
              <li class="page-item d-none d-sm-block" :class="{'active': currentPage === 1}" aria-current="page">
                <a class="page-link" href="#" @click.prevent="goToPage(1)">1<span class="visually-hidden">(current)</span></a>
              </li>
              <li class="page-item d-none d-sm-block" :class="{'active': currentPage === page}" v-for="page in visiblePages" :key="page" aria-current="page">
                <a v-if="page !== -1" class="page-link" :class="{'active': currentPage === page }" href="#" @click="goToPage(page)">
                  {{ page }}<span v-if="currentPage == page" class="visually-hidden">(current)</span>                                   
                </a>                
              </li>              
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
                  <i class="fi-chevron-right"></i>
                </a>
              </li>
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
      pagename: '',
      currentPage: 1,
      pageSize: 9
    }
  },
  middleware: ['middleware'],
  computed: {
    ...mapGetters({
      getEstates : 'mainDataStore/getFilteredEstates',
      navObj: 'appStore/getNavObj',      
      myGetter: 'mainDataStore/_getter',
      myAppGetter: 'appStore/_getter'
    }),
    paginatedEstates() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.getEstates.slice(start, end)
    },
    setPagename: function() {
      let obj = this.navObj.find(element => element.pagename !== null)
      return this.pagename = obj.pagename
    },
    totalPages: function() {
      return Math.ceil(this.getEstates.length / this.pageSize)
    },
    getResultNull() {
      return this.myAppGetter('search_result_0')
    },
    visiblePages: function() {
      const range = []
      const totalVisiblePages = 5
      let startPage = Math.max(2, this.currentPage - Math.floor(totalVisiblePages / 2))
      let endPage = Math.min(this.totalPages, this.currentPage + Math.floor(totalVisiblePages / 2))
      //let endPage = Math.min(this.totalPages - 1, this.currentPage + Math.floor(totalVisiblePages / 2))
      console.log('range:', startPage)
      console.log('range:', endPage)
      if (startPage > 2) {
        range.push(1)
        if (startPage > 3) {
          range.push(-1)
        }
      }
      for (let i = startPage; i <= endPage; i++) {
        range.push(i)
      }
      if (endPage < this.totalPages - 1) {
        if (endPage < this.totalPages - 2) {
          range.push(-1)
        }
        range.push(this.totalPages)
      }
      console.log('range: ', range)
      return range
    }
  },
  mounted: function() {    
    if(this.getEstates) {
      console.log(this.filterCollectionByArray(this.getEstates, 'ville'))
      console.log('control: mounted _cat page')
      //this.paginate(this.getEstates)
    }
  },
  methods: {
    returnWhatIWant: function(obj, val) {
      return this.arrayType(obj, val)
    },
    goToPage: function(page) {
      console.log('control: page range ', page)
      if (page === -1) {
        return
      }
      return this.currentPage = page
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        console.log('control: going next page')
        this.currentPage++
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        console.log('control: going 1 page back')
        this.currentPage--
      }
    }
    /*
    paginate: function (array) {
      const nextPage = array.length === 10
      const posts = nextPage ? array.slice(0, -1) : array
      this.posts = posts
      this.nextPage = nextPage
      return { nextPage, posts }
    },
    */
  }
}
</script>