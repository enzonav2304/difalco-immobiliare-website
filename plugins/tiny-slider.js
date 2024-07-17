import Vue from "vue"
import vTinySlider from "vue-tiny-slider"

const VueTinySlider = {
  install(Vue, options) {
    Vue.component("vue-tiny-slider", vTinySlider);
  }
}

Vue.use(VueTinySlider);
export default VueTinySlider
/*
import VueSlider from 'vue-tiny-slider'
Vue.use(VueSlider)
*/


//import Vue from 'vue'
//import {tns} from '../static/vendor/tiny-slider/src/tiny-slider.js'



