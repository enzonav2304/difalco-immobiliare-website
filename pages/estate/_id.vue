<template>
  <main class="page-wrapper">
    <!-- Sign In Modal-->
    <signin />
    <!-- Sign Up Modal-->
    <signup />
    <!-- Nav bar -->
    <toolbar />
    <!-- Page content-->
    <section class="container mt-5 mb-lg-5 mb-4 pt-5 pb-lg-5">
      <!-- Breadcrumb-->
      <breadcrumb :getItem="getItem" />
      <estate
        :estate_main="getItem"
        :estate_sub="getSubItem"
        :prices="getItemPrices"
        :estate_details="getDetailsItem"
        :images="getImages"
      /><!-- :pagename="setPagename"  -->
    </section>
    <!-- Recently Viweved -->
    <recents :estates="getEstates" />
    <!-- Footer-->
    <isFooter />
  </main>
</template>

<script>
import { mapGetters } from "vuex"

import breadcrumb from "~/components/main/breadcrumb.vue"
import isFooter from "~/components/main/_footer.vue"
import recents from "~/components/main/recentlyViewed.vue"
/*import rentalAgent from '~/components/estate/rentalAgent.vue'*/
import toolbar from "~/components/main/header.vue"
import signin from "~/components/modals/signin.vue"
import signup from "~/components/modals/signup.vue"
import estate from "~/components/estate/main.vue"
/*import review from '~/components/modals/addReview.vue'*/

export default {
  middleware: ["middleware"],
  components: {
    breadcrumb,
    isFooter,
    recents,
    toolbar,
    signin,
    signup,
    estate,
    /*review*/
  },
  data() {
    return {
      nav_obj: [],
      estates: [],
      pagename: "",
      pageUrl: '',
      carousel_options: {
        navAsThumbnails: true,
        navContainer: "#thumbnails",
        gutter: 12,
        responsive: {
          0: { controls: false },
          500: { controls: true },
        },
      },
    }
  },
  middleware: ["middleware"],
  computed: {
    ...mapGetters({
      myGetter: "mainDataStore/_getter",
      navObj: "appStore/getNavObj",
    }),
    getEstates: function () {
      return this.myGetter("estates")
    },
    getItem: function () {
      //let record = obj.find(element => element.active === true)
      return this.myGetter("item")
    },
    getSubItem: function () {
      return this.myGetter("sub_item")
    },
    getItemPrices: function () {
      return this.myGetter("price_item")
    },
    getDetailsItem: function () {
      //let record = obj.find(element => element.active === true)
      return this.myGetter("detail_item")
    },
    getImages: function () {
      return this.arrayValue("url", this.myGetter("item_images"))
    },
    /*
    setPagename: function() {
      console.log('debug nav obj')
      if(this.navObj) {
        let obj = this.navObj.find(element => element.pagename !== null)
        return this.pagename = obj.pagename  
      } else {
        return this.pagename = 'Dummy Pagename'
      }      
    }
    */
  },
}
</script>
