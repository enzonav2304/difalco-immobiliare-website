<template>
<aside 
  class="col-lg-4 
    col-xl-3 
    border-top-lg 
    border-end-lg 
    shadow-sm 
    px-3 
    px-xl-4 
    px-xxl-5 
    pt-lg-2
    card mobile-offcanvas 
    bg-light" 
    id="card_mobile"
  >
    <div class="card-body">
      <div class="offcanvas-header">  
        <button class="btn-close float-end" @click="closeOffCanvas"></button>
      </div>
      <div class="d-block border-bottom pt-0 pt-lg-4 px-lg-0">
        <ul class="nav nav-tabs mb-0">
          <li class="nav-item"><a class="nav-link active" href="real-estate-catalog-rent.html"><i class="fi-rent fs-base me-2"></i>For rent</a></li>
          <li class="nav-item"><a class="nav-link" href="real-estate-catalog-sale.html"><i class="fi-home fs-base me-2"></i>For sale</a></li>
        </ul>
      </div>
      <div class="py-lg-4">
        <div class="pb-4 mb-2">
          <h3 class="h6">Località</h3>
          <select 
            class="form-select mb-2" 
            v-model="selectedCity"
            @change="changeCity"
          >
            <option v-for="(item, index) in citta" :key="index">{{item}}</option>
          </select>       
        </div>
        <div class="pb-4 mb-2">
          <h3 class="h6">Tipologia immobile</h3>
          <div class="overflow-auto" data-simplebar data-simplebar-auto-hide="false" style="height: 11rem;">
            <div v-for="(item, idx)  in items_types" :key="idx">
              <div class="form-check" v-if="edited_types.includes(item)">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="house"
                  :value="item"
                  checked
                >
                <label class="form-check-label fs-sm" for="house">{{item}}</label>
              </div>
              <div 
                class="form-check"
                v-else
              >
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="house"
                  :value="item"
                  @click="addItem(item, 'tipo')"
                >
                <label class="form-check-label fs-sm" for="house">{{item}}</label>
              </div>
            </div>
          </div>
        </div>      
        <div class="pb-4 mb-2">
          <h3 class="h6">Cerca per prezzo</h3>        
          <!--
          <input 
            id="customRange2"
            type="range" 
            class="form-range" 
            min="5000" 
            max="100000"
            step="5000"
            v-model="edited_price"
            @input="updateLabel"
          />
          -->
          <input 
            id="customRange2"
            type="range" 
            class="form-range" 
            min="5000" 
            max="100000"
            step="5000"
            v-model="slider_price"
            @mousedown="mouseDown = true"
            @mouseup="handleSlider('price')"
          />
          <label for="customRange2" class="form-label">{{ `Prezzo € ${slider_price}` }}</label>
        </div>
        <div class="pb-4 mb-2">
          <h3 class="h6 pt-1">Stanze</h3><!-- &amp; bagni</h3>-->
          <label class="d-block fs-sm mb-1">Numero Stanze</label>
          <div class="btn-group btn-group-sm" role="group" aria-label="Numero stanze">
            <div class="radio-button-group">
              <label
                v-for="(item, idx) in items_rooms"
                :key="idx"
                class="radio-button-group__label"
                :class="{ 'radio-button-group__label--selected': item === edited_rooms }"
              >
                <input
                  type="radio"
                  class="radio-button-group__input"
                  v-model="edited_rooms"
                  :value="item"
                />{{ item }}</label>
            </div>
          </div>
            <!--
            <label class="d-block fs-sm pt-2 my-1">Bathrooms</label>
            <div class="btn-group btn-group-sm" role="group" aria-label="Choose number of bathrooms">
              <input class="btn-check" type="radio" id="bathrooms-1" name="bathrooms">
              <label class="btn btn-outline-secondary fw-normal" for="bathrooms-1">1</label>
              <input class="btn-check" type="radio" id="bathrooms-2" name="bathrooms">
              <label class="btn btn-outline-secondary fw-normal" for="bathrooms-2">2</label>
              <input class="btn-check" type="radio" id="bathrooms-3" name="bathrooms">
              <label class="btn btn-outline-secondary fw-normal" for="bathrooms-3">3</label>
              <input class="btn-check" type="radio" id="bathrooms-4" name="bathrooms">
              <label class="btn btn-outline-secondary fw-normal" for="bathrooms-4">4</label>
            </div>
            -->
        </div>
        <div class="pb-4 mb-2">
          <h3 class="h6 pt-1">Metri quadrati</h3>
          <input 
            id="customRange1"
            type="range" 
            class="form-range" 
            v-model="slider_mq"
            min="10" 
            max="200"
            step="10"
            @mousedown="mouseDown = true"
            @mouseup="handleSlider('mq')"
          />
          <label for="customRange1" class="form-label">{{ `Sueprfice mq. ${slider_mq}` }}</label>
          <!--
          <div class="d-flex align-items-center">
            <input 
              class="form-control w-100" 
              type="number" 
              min="20" 
              max="500" 
              step="10" 
              placeholder="Min" 
              v-model="minValue" 
              @input="updateMeters" 
            />
            <div class="mx-2">&mdash;</div>
            <input 
              class="form-control w-100" 
              type="number" 
              min="20" 
              max="500" 
              step="10" 
              placeholder="Max" 
              v-model="maxValue" 
              @input="updateMeters" 
            />
          </div>
          -->
        </div>
        <div class="pb-4 mb-2">
          <h3 class="h6">Servizi</h3>
          <div class="overflow-auto" data-simplebar data-simplebar-auto-hide="false" style="height: 11rem;">
            <div v-for="(item, idx)  in items_amenities" :key="idx">
              <div class="form-check">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="house"
                  :value="item"
                  @click="addItem(item, 'servizi')"                  
                ><!-- @click="addItem(item, 'tipo')"-->
                <label class="form-check-label fs-sm" for="house">{{item}}</label>
              </div>
            </div>                
          </div>
        </div>        
        <div class="pb-4 mb-2">
          <h3 class="h6">Optioni Addizionali</h3>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="verified">
            <label class="form-check-label fs-sm" for="verified">Verificato</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="featured">
            <label class="form-check-label fs-sm" for="featured">In primo piano</label>
          </div>
        </div>
        <div class="border-top py-4">
          <button class="btn btn-outline-primary" type="button"><i class="fi-rotate-right me-2"></i>Reset filters</button>
        </div>
      </div>
    </div>
</aside>
    
</template>

<script>

import {mapGetters} from 'vuex'

const file = 'side_bar'

export default {
  data() {
    return {
      /* global filter */
      active_filters: [],
      checked_zones: [],
      edited_amenities: [],
      edited_cities: [],
      edited_contracts: '',
      edited_price: [],
      edited_mq: [],
      edited_rooms: null,
      edited_types: [],      
      edited_zones: null,
      mouseDown: false,
      my_search: {},
      my_zones: [],
      resultNull: false,
      rooms: '',
      //selectedCity: 'Agrigento',
      selectedCity: -1,
      slider_price: 5000,
      slider_mq: 80,
      temp: [],
      types: '',
      myF: this.main(),
      
      /* select items */
      items_types: [
        'Appartamento',
        'Attico/Mansarda',
        'Box/Garage',
        'Capannone Industriale',
        'Casa Indipendente',
        'Magazzino',
        'Negozio',
        'Rustico/Casale',
        'Terreno Agricolo',
        'Terreno Edificabile',
        'Villetta a Schiera',
        'Villino/Villa'
      ],
      items_rooms: ['mono',2,3,4,5],
      items_amenities: [
        'arredamento', //id_arred,
        'riscaldamento', //id_riscaldamento,
        'ascensore',
        'posto_auto',
        'box_auto',
        'giardino' 
      ]
    }
  },
  computed: {
    ...mapGetters({
      getFilteredEstates: 'mainDataStore/getFilteredEstates',
      getMainData: 'mainDataStore/getEstates',
      getSearchOptions: 'appStore/getSearchOptions',      
      getActiveSearch: 'appStore/getActiveSearch',
      myGetter: 'mainDataStore/_getter'      
    }),
    activeSearch() {
      return this.$store.state['appStore'].search_active
    },
    /* @@ in progress @@ */
    citta: function() {
      return this.filterCities(this.zone)            
    },
    filteredZones() {
      let  x = this.zone.filter(item => item.citta === "Agrigento")
      return x.map(item => item.zone)
    },
    getResultNull() {
      return this.resultNull = this.myAppGetter('search_result_0')
    },
    isChecked(array, value) {
      if(array.includes(value)) return true
    },
    searchOptions() {
      return this.$store.state['appStore'].search_options
    },
    zone: function () {
      return this.myGetter('zones')
    }    
  },
  mounted: function() {    
    console.log('test_: mounted side component')
    if(this.myF.getResult()) {
      if(this.activeSearch) {
        this.initSearch(this.searchOptions)
      }      
    }
  },
  watch: {
    active_filters: function(value){
      this.myF.print_msg('active filters watcher')
      
      /* @@ init vars @@ */
      let _f = this.myF
      let active_search = this.getActiveSearch
      let active_filters = this.active_filters
      let flatArray = this.flatArray
      let getArray = this.getArray
      let isEmpty = this.isEmpty
      let pushArrayItem = this.pushArrayItem
      let setFilteredItems = this.setFilteredItems
      /* @@ end init @@ */
      
      console.log('test_: active search -> ', active_search)
      _f.debugArray(this.active_filters, 'active_filters')
      //_f.print_msg('base search -> ' + this.base_search)

      let _array = [...active_filters]
      let item = _array.pop()
      console.log('test_: selected item is: ', item)
      let session_result = flatArray(getArray(item))
      let global_search = getArray('_global')

      if(isEmpty(active_filters)) {
        _f.print_msg('active filters is empty!')
      } else {
        if(this.lengthObj(active_filters) === 1) {
          _f.print_msg('active filters lenght = 1')
          pushArrayItem('_global', session_result)
          setFilteredItems(session_result)          
        } else if(this.lengthObj(active_filters) > 1) {
          _f.print_msg('active filters lenght > 1')
          if(getArray('_global')) {
            //setFilteredItems(global_search)
            _f.print_msg('_global is set, push _global')
            let a = global_search
            let b = session_result
            let c = this.joinArrays(a,b)            
            let d = this.removeDuplicates(c, 'id')
            /*
            let global_filter = this.returnSearchObj(a, b)
            _f.debugArray(a, '_global search')
            _f.debugArray(b, 'item search')
            */
            _f.debugArray(d, 'global result')
            this.deleteArray('_global')
            pushArrayItem('_global', d)
            setFilteredItems(d)           
          } else {
            _f.print_msg('_global is not set')
          }        
        }
      }        
    }, 
    edited_price: function(value) {
      this.myF.print_msg('hello price ' + this.edited_price)
    },
    edited_cities: function(value){
      this.myF.print_msg('function watch ' + value)
      let array_to_change = this.myF.notExistentItem(this.active_filters, 'citta')
      if(array_to_change) {
        this.active_filters.push('citta')
      } else {
        this.active_filters.push('citta')
      }
      //this.active_filters.push('citta')
      this.myF.doSomething('citta', value, this.active_filters)      
      if(!this.activeSearch) {
        this.$store.commit('appStore/setActiveSearch', true)
      }     
    },
    edited_mq: function(newValue) {
      this.myF.print_msg('watching edited_mq > ' + newValue)
      alert('hello')
      this.active_filters.push('superfice')
      this.myF.doSomething('superfice', newValue, this.active_filters)
    },
    edited_price: function(newValue) {
      this.myF.print_msg('watching edited_rooms > ' + newValue)
      alert('hello')
      this.active_filters.push('prezzo')
      this.myF.doSomething('prezzo', newValue, this.active_filters)
    },
    edited_rooms: function(newValue) {
      this.myF.print_msg('watching edited_rooms > ' + newValue)
      alert('hello')
      this.active_filters.push('stanze')
      this.myF.doSomething('stanze', newValue, this.active_filters)
    }, 
    edited_types: function(newValue) {
      this.myF.print_msg('watching edited_types > ' + newValue)
      //cerco elemento dell'array, se esiste lo rimuovo
      let array_to_change = this.myF.notExistentItem(this.active_filters, 'tipo')
      if(array_to_change) {
        this.active_filters.push('tipo')
      } else {
        this.active_filters.push('tipo')
      }      
      this.myF.doSomething('tipo', newValue, this.active_filters)
      if(!this.activeSearch) {
        this.$store.commit('appStore/setActiveSearch', true)
      }      
    },       
    /*
    selectedCity: function(newValue) {     
      this.myF.doSomething('citta', newValue)
      //this.active_filters.push('citta')
    },
    */
    edited_zones: function(value) {},
        
  },
  methods: {
    addItem: function(value, key) {
      alert('added item ' + key + ': ' + value)
      switch(key) {
        case 'tipo':
          this.edited_types.push(value)
        break
        case 'citta':
          this.edited_cities.push(value)
        break
        case 'prezzo':
          this.edited_price.push(value)
        break
        case 'servizi':
          this.edited_amenities.push(value)
        break
        case 'superfice':
          this.edited_mq.push(value)
        break        
      }
      //this.edited_types.push(value)     
    },           
    cleanResultArray: function(x, y) { 
      /* 
      need 2 objs to calculate difference to reduce
      reduce y 
      */
      let lenght = this.lengthObj
      let my_lenght = lenght(y) - lenght(x)
      for(let i=0; i < my_lenght; i++) {
        console.log('shift item')
        y.shift()                
      }
      console.log('done!')
    },
    changeCity: function() {
      //alert('test ' + this.selectedCity)
      this.addItem(this.selectedCity, 'citta')
      //return true
    },
    changeRoom: function(item) {
      alert('test' + item)// + this.edited_rooms)
      //this.addItem(this.selectedCity, 'citta')
      //return true
    },
    handleSlider(key) {      
      if(this.mouseDown) {        
        if(key === 'price') {
          this.addItem(this.slider_price, 'prezzo')
          //this.edited_price.push(this.slider_price)
        } else if (key === 'mq') {
          this.addItem(this.slider_mq, 'superfice')
        }
        this.mouseDown = false
      }
    },
    initSearch: function(obj, t) {// vueobj state searchOptions - true or false
      this.myF.print_msg('initSearch -> setting edited_items...')
      let y = Object.keys(obj)      
      this.active_filters = y
      //this.myF.debugArray(y, 'searchOptions -> keys')
      //this.myF.debugArray(this.active_filters, 'initSearch -> active_filters')

      /* effettua ciclo su array selectd_types */
      for(let i = 0; i < y.length; i++)  {
        let prop = y[i].toString()
        if(y[i] === 'tipo') {
          console.log('test_: setting side ', y[i])
          this.edited_types = []
          console.log('test_: prop?', obj[prop])
          this.edited_types.push(obj[prop])
          console.log('test_: edited_types ', this.edited_types)          
        } else if(y[i] === 'citta') {
          console.log('test_: setting side ', y[i])
          this.selectedCity = ''
          console.log('test_: prop?', obj[prop])
            this.selectedCity = obj[prop]
        } else if(y[i] === 'stanze') {
          console.log('test_: setting side ', y[i])
          this.edited_rooms = ''
          this.edited_rooms = obj[prop]
        } else if(y[i] === 'contratto') {
          console.log('test_: setting side ', y[i])
          this.edited_contracts = ''
          this.edited_contracts = obj[prop]
        }
      }
      this.myF.print_msg('initSearch -> exit')
    },    
    /* @@ testing function @@*/
    noResult: function(obj) {
      let _lenght = this.lengthObj(obj)
      if(_lenght === 0) {
        this.$eventBus.$emit('search-result', false)
        console.log('>>>> debug: lenght of object', _lenght)
        return false
      } else {
        return obj
      }
    },  
    onChange: function(event) {
      let optionText = event.target.value
      alert(optionText)
    },
    setTriggerObj: function(x,y,z) {
      let obj = {
        'file': x,
        'item': y,
        'function': z
      }
      return obj
    },
    setTriggerState: function(obj) {
      this.$store.commit('appStore/setSearchTrigger', obj)
    },
    
    setFilteredItems: function(payload) {
      this.$store.commit('mainDataStore/setFilteredItems', payload)
    },
    saveSearch: function() {},
    closeOffCanvas: function() {
      console.log('emit')
      this.$eventBus.$emit('off-canvas-close', this.getLocalStorageArray('global_search'))
    }
  }
}
</script>

<style scoped>

body.offcanvas-active{
	overflow:hidden;
}

.offcanvas-header{ display:none; }

.screen-darken{
	height: 100%;
	width:0%;
	z-index: 30;
	position: fixed;
	top: 0;
	right: 0;
	opacity:0;
	visibility:hidden;
	background-color: rgba(34, 34, 34, 0.6);
	transition:opacity .2s linear, visibility 0.2s, width 2s ease-in;
}

.screen-darken.active{
	z-index:10; 
	transition:opacity .3s ease, width 0s;
    opacity:1;
    width:100%;
    visibility:visible;
}

/* ============ mobile view ============ */
@media all and (max-width: 991px) {
	
	.offcanvas-header{ display:block; }

	.mobile-offcanvas{
		visibility: hidden;
		transform:translateX(-100%);
	    border-radius:0; 
		display:block;
	    position: fixed;
	    top: 0; left:0;
	    height: 100%;
	    z-index: 1200;
	    width:80%;
	    overflow-y: scroll;
	    overflow-x: hidden;
	    transition: visibility .3s ease-in-out, transform .3s ease-in-out;
	}

	.mobile-offcanvas.show{
		visibility: visible;
    	transform: translateX(0);
	}
	.mobile-offcanvas .container, .mobile-offcanvas .container-fluid{
		display: block;
	}

}	
/* ============ mobile view .end// ============ */

.radio-button-group {
    display: flex;

    /* Border */
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    height: 2rem;
}

.radio-button-group__label {
    /* Center the content */
    align-items: center;
    display: inline-flex;

    border-right: 1px solid #d1d5db;
    padding: 0.5rem;

    /* For not selected radio */
    background-color: transparent;
    color: #ccc;
}

.radio-button-group__label:last-child {
    /* Remove the right border from the last label */
    border-right-color: transparent;
}

.radio-button-group__label--selected {
    /* For selected radio */
    background-color: #3b82f6;
    color: #fff;

    margin-top: -1px;
    margin-bottom: -1px;
}

.radio-button-group__input {
    /* Hide it */
    display: none;
}

</style>