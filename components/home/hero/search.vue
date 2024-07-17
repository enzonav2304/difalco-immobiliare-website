<template>
<form class="form-group d-block">
    <div class="row g-0">
        <div class="col-md-10 d-sm-flex align-items-center">
            <div class="dropdown w-sm-50" data-bs-toggle="select">
                <button class="btn btn-lg btn-link dropdown-toggle ps-2 ps-sm-3" type="button" data-bs-toggle="dropdown">
                    <i class="fi-list me-2"></i><span class="dropdown-toggle-label">Tipologia</span>
                </button>
                <input type="hidden">
                <ul class="dropdown-menu">
                    <li v-for="(item, idx) in items_types" :key="idx">
                        <a class="dropdown-item" href="#" @click="search_types(item)"><span class="dropdown-item-label">{{item}}</span></a>
                    </li>
                </ul>
            </div>
            <hr class="d-sm-none my-2">
            <div class="dropdown w-sm-50 border-end-sm" data-bs-toggle="select">
                <button class="btn btn-lg btn-link dropdown-toggle ps-2 ps-sm-3" type="button" data-bs-toggle="dropdown">
                    <i class="fi-map-pin me-2"></i><span class="dropdown-toggle-label">Numero Stanze</span>
                </button>
                <input type="hidden">
                <ul class="dropdown-menu">
                    <li v-for="(item, idx) in items_rooms" :key="idx">
                        <a class="dropdown-item" href="#" @click="search_rooms(item)"><span class="dropdown-item-label">{{item}}</span></a>
                    </li>                    
                </ul>
            </div>
            <hr class="d-sm-none my-2">
            <div class="dropdown w-sm-50 border-end-sm" data-bs-toggle="select">
                <button class="btn btn-lg btn-link dropdown-toggle ps-2 ps-sm-3" type="button" data-bs-toggle="dropdown">
                    <i class="fi-home me-2"></i><span class="dropdown-toggle-label">Contratto</span>
                </button>
                <ul class="dropdown-menu">
                    <li v-for="(item, idx) in items_contracts" :key="idx">
                        <a class="dropdown-item" href="#" @click="search_contracts(item)"><span class="dropdown-item-label">{{item}}</span></a>                        
                    </li>
                </ul>
                <!--
                <ul class="dropdown-menu">
                    <li v-for="(item, idx) in myCities" :key="idx">
                        <a class="dropdown-item" href="#" @click="search_contracts(item)"><span class="dropdown-item-label">{{item}}</span></a>                        
                    </li>
                </ul>
                -->
            </div>
        </div>
        <hr class="d-md-none mt-2">
        <div class="col-md-2 d-sm-flex align-items-center pt-3 pt-md-0">
            <button class="btn btn-lg btn-icon btn-primary px-3 w-100" type="button" @click="goSearchPage()">Search</button>
        </div>
    </div>
</form>
    
</template>

<script>

import {mapGetters} from 'vuex'
/* init triggerObj method */
const file = 'search'

export default {
    data() {
        return {
            result_search: 0,
            /* checkboxes */
            checkbox: true,
            /* selects */
            contracts: '',
            rooms: '',
            types: '',
            zone: '',
            /* filters options */
            active_filters: [],
            my_search: {},
            items_contracts: [
                'Affitto',
                'Vendita',
                "Immobile all'Asta"
            ],
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
            items_rooms: [1,2,3,4,5]
        }
    },
    computed: {
        ...mapGetters({
            getMainData: 'mainDataStore/getEstates',
            getFilteredData : 'mainDataStore/getFilteredEstates',
            getActiveSearch: 'appStore/getActiveSearch',
            myGetter: 'mainDataStore/_getter'
        }),
        zones: function() {
            console.log('control: cities', this.myGetter('zones'))
            //await context.store.dispatch('mainDataStore/getZones')
            return this.myGetter('zones')
        },        
        myCities: function() {
            let cities = this.zones.map(item => item.citta)
            return [...new Set(cities)] //Set crea un array con valori univoci
        }
    },
    mounted: function() {
        console.log('mounted searchBar')
        if(this.getActiveSearch) {
            return this.numberItemsFound()
        } else {
            this.result_search = 0
            
        }
        this.$store.watch(
            (state, getters) => this.getFilteredData,
            (newValue, oldValue) => {
                //console.log(newValue)
                this.numberItemsFound()
            }
        )
        this.$store.watch(
            state => ({
                filteredData: this.getFilteredData,
                getActiveSearch: this.getActiveSearch
            }),
            (newValues, oldValues) => {
                // Callback per gestire le modifiche ai getter monitorati
                console.log(newValues.filteredData)
                console.log('> debug: mounted watch activeSearch: ', newValues.getActiveSearch)
                // Aggiungi qui la logica per gestire le modifiche ai getter monitorati
                this.numberItemsFound()
            }
        )        
    },
    watch: {
        active_filters: function(value) {
            let _array = this.active_filters
            let final_array = _array[0]
            console.log('>> debug active filters -> final array', _array)
            if(this.lengthObj(_array) <= 1) {
                this.setFilteredItems(this.flatArray(this.getArray(final_array)))        
            } else if (this.lengthObj(_array) > 1) {
                switch(this.lengthObj(_array)) {
                    case 2:
                        let a = this.getArray(_array[0])
                        let b = this.getArray(_array[1])
                        if(_array[0] !== '_global') {
                            //console.log('array 1')
                            //console.log(a)
                            //console.log('array 2')
                            //console.log(b)
                            let global_filter = this.returnSearchObj(a, b)
                            this.pushArrayItem('_global', global_filter)
                            for (let i = 0; i = this.lengthObj(_array); i++) {
                                _array.pop()
                            }
                            this.setFilteredItems(global_filter)
                            this.active_filters.unshift('_global')
                        } else {
                            //console.log('global array is set')
                            if(_array[1]) {
                                let global_filter = this.returnSearchObj(a, b)
                                this.deleteArray('_global')
                                this.pushArrayItem('_global', global_filter)
                                this.setFilteredItems(this.flatArray(global_filter))
                                _array.pop()                
                            }
                        }
                    break
                    case 3:
                        console.log('III')
                    break
                }
            }
        },
        active_filters_copia: function(value) {
            let _array = this.active_filters
            let final_array = _array[0]
            //console.log('> debug: final array', _array)      
            if(this.lengthObj(_array) <= 1) {
                //console.log('control: mutation set founded items')
                let data = this.flatArray(this.getArray(final_array))
                //console.log('> debug: filter by city with 1 active filter')
                let filter = this.filterItem('equal', data, 'citta', 'Agrigento')
                console.log('> debug: setting global search options')
                Object.assign(this.my_search, {'citta': 'Agrigento'})
                //console.log('>>> debug: new active filters ', this.active_filters)
                /*
                console.log('> debug: setting filtering items')
                console.log('> control: search setFilteredItems')
                */
                let obj = this.setTriggerObj(file, 'citta', 'global_watcher')
                this.setTriggerState(obj)
                this.setFilteredItems(filter)       
            } else if (this.lengthObj(_array) > 1) {
                switch(this.lengthObj(_array)) {
                    case 2:
                        let a = this.getArray(_array[0])
                        let b = this.getArray(_array[1])
                        if(_array[0] !== '_global') {
                            //console.log('array 1')
                            //console.log(a)
                            //console.log('array 2')
                            //console.log(b)
                            let global_filter = this.returnSearchObj(a, b)
                            this.pushArrayItem('_global', global_filter)
                            for (let i = 0; i = this.lengthObj(_array); i++) {
                                _array.pop()
                            }
                            //console.log('control: mutation set founded items')
                            /*
                            console.log('> debug: filter by city with more than 1 active filter')
                            */
                            let filter = this.filterItem('equal', global_filter, 'citta', 'Agrigento')
                            //console.log('> control: search setFilteredItems')
                            let obj = this.setTriggerObj(file, 'citta', 'global_watcher')
                            this.setTriggerState(obj)
                            this.setFilteredItems(filter)
                            console.log('> debug: setting global search options')
                            Object.assign(this.my_search, {'citta': 'Agrigento'})
                            /* add search array object to localstorage*/
                            this.pushLocalStorageArrayItem('global_search', global_filter)
                            this.active_filters.unshift('_global')
                        } else {
                            //console.log('global array is set')
                            if(_array[1]) {
                                let global_filter = this.returnSearchObj(a, b)
                                this.deleteArray('_global')
                                this.pushArrayItem('_global', global_filter)
                                console.log('control: mutation set founded items')
                                let data = this.flatArray(global_filter)
                                console.log('> debug: filter by city with at leeast 2 active filter')
                                let filter = this.filterItem('equal', data, 'citta', 'Agrigento')
                                //console.log('> control: header setFilteredItems')
                                let obj = this.setTriggerObj(file, 'citta', 'global_watcher')
                                this.setTriggerState(obj)
                                this.setFilteredItems(filter)                                
                                _array.pop()
                                console.log('> debug: _array.pop()', _array)
                            }
                        }
                    break
                    case 3:
                        console.log('III')
                    break
                }
            }
        },                
        contracts: function(value) {
            let data = this.check_active_search
            //console.log('> watch selected item: ' + value)            
            //console.log('> debug: ', this.contracts)
            let key = 'contratto'
            let filter = this.filterItem('equal', data(), key, this.contracts)
            if(!this.getActiveSearch) {
                this.$store.commit('appStore/setActiveSearch', true)
                //console.log('> debug: activate active_search', this.getActiveSearch)
                let obj = this.setTriggerObj(file, key, 'select option')
                this.setTriggerState(obj)
                //this.$store.commit('mainDataStore/setFilteredItems', filter)                
            }
            //console.log('> debug: ' + key + ':' + value, this.lengthObj(this.getFilteredData))           
            this.newFunction(key, value, filter)
        },        
        rooms: function(value) {
            let data = this.check_active_search
            //console.log('> control active search: ', data())
            //console.log('> watch selected item: ' + value)            
            //console.log('> debug:: ', this.contracts)
            let key = 'stanze'
            let filter = this.filterItem('greater', data(), key, this.rooms)
            if(!this.getActiveSearch) {
                this.$store.commit('appStore/setActiveSearch', true)
                //console.log('> debug: activate active_search', this.getActiveSearch)
                let obj = this.setTriggerObj(file, key, 'item_select')
                this.setTriggerState(obj)
                //this.$store.commit('mainDataStore/setFilteredItems', filter)
            }
            console.log('> debug: filtered items', this.lengthObj(this.getFilteredData))
            this.newFunction(key, value, filter)   
        },
        types: function(value) {
            let data = this.check_active_search
            //console.log('> watch selected item: ' + value)            
            //console.log('> debug:: ', this.types)
            let key = 'tipo'
            let filter = this.filterItem('equal', data(), 'tipo_immobile', this.types)
            console.log('> debug filter', filter)
            if(!this.getActiveSearch) {
                this.$store.commit('appStore/setActiveSearch', true)
                let obj = this.setTriggerObj(file, key, 'item_select')
                this.setTriggerState(obj)
                //console.log('> debug: activate active_search', this.getActiveSearch)
                //this.$store.commit('mainDataStore/setFilteredItems', filter)
            }
            //console.log('> debug: filtered items', this.lengthObj(this.getFilteredData))
            this.newFunction(key, value, filter)
        }
    },
    methods: {
        check_active_search: function() {
            if(this.getActiveSearch) {
                console.log('> control activate filtered data')
                return this.getFilteredData
            } else {
                console.log('> control activate default data')
                return this.getMainData
            }
        },
        goSearchPage: function() {
            console.log('> debug: setting city in global search options')
            //Object.assign(this.my_search, {'citta': 'Agrigento'})
            //console.log('> debug: get localstorage global_search')
            console.log('> debug: get data', this.getLocalStorageArray('global_search'))
            this.$store.commit('appStore/setActiveSearch', true)
            this.$eventBus.$emit('search-result', this.getLocalStorageArray('global_search'))
            this.$router.push('/estates/search')            
        },
        newFunction: function(key, value, filter) {  
            this.pushArrayItem(key, filter)            
            Object.assign(this.my_search, {[key]: value})
            this.active_filters.push(key)
            this.$store.commit('appStore/setSearchOptions', this.my_search)
            this.pushLocalStorageArrayItem('my_search', this.my_search)
            if(!this.isEmpty(this.getLocalStorageArray('global_search'))) {
                this.deleteLocalStorageArray('global_search')
            }
            this.pushLocalStorageArrayItem('global_search', filter)                    
        },
        newSaveSearch: function(key, filter) {
            console.log('>> control: into new save search function...')
            this.active_filters.push(key)
            this.$store.commit('appStore/setSearchOptions', this.my_search)
            this.pushLocalStorageArrayItem('my_search', this.my_search)
            if(!this.isEmpty(this.getLocalStorageArray('global_search'))) {
                this.deleteLocalStorageArray('global_search')
            }
            this.pushLocalStorageArrayItem('global_search', filter)  
        },
        newFunctionNew: function(key, value, filter) {
            console.log('>> control: new function...')
            this.pushArrayItem(key, filter)            
            Object.assign(this.my_search, {[key]: value})
            /*
            if(!this.my_search['citta']) {
                console.log('>> control: into set Citta...')
                key = 'citta'
                value = 'Agrigento'
                filter = this.filterItem('equal', this.check_active_search(), 'citta', 'Agrigento')
                Object.assign(this.my_search, {'citta': 'Agrigento'})
                console.log('>> control: citta esiste')
                this.newSaveSearch(key, filter)
                return false
            }
            */
            return this.newSaveSearch(key, filter)
            
        },
        newFunction_copia: function(key, value, filter) {  
            /*
            console.log('> debug: filtered items in main function', this.lengthObj(this.getFilteredData))
            console.log('> debug: pushing in locastorage array obj')
            */
            //console.log('> debug: key: ' + key)
            this.pushArrayItem(key, filter)
            //this.$store.commit('mainDataStore/setFilteredItems', filter)
            /*
            console.log('>>> debug: setting global search options', key, value)
            */
            Object.assign(this.my_search, {[key]: value})
            this.active_filters.push(key)
            /*
            console.log('>>> debug: active filters ', this.active_filters)
            */
            this.$store.commit('appStore/setSearchOptions', this.my_search)
            this.pushLocalStorageArrayItem('my_search', this.my_search)
            if(!this.isEmpty(this.getLocalStorageArray('global_search'))) {
                this.deleteLocalStorageArray('global_search')
            }
            this.pushLocalStorageArrayItem('global_search', filtered_obj)
            //this.saveSearch(filter)                      
        },
        
        numberItemsFound: function() {
            this.result_search = this.lengthObj(this.getFilteredData)
            return this.result_search
        },
        resetSearch: function() {
            this.clearStorage()
            $nuxt.$eventBus.$emit('active-search', false)
            this.$store.commit('appStore/setSearchOptions', {})
            this.$store.commit('appStore/setActiveSearch', false)
            console.log('> control: reset setFilteredItems')
            this.$store.commit('mainDataStore/setFilteredItems', {})
            this.clearLocalStorage()
            this.result_search = 0
        },
        saveSearch: function(filtered_obj) {
            /*
            console.log('> debug: filtered obj saving objects', this.lengthObj(filtered_obj))
            console.log('> function save search...')
            //console.log('>>> debug: localstorage my_search', this.getLocalStorageArray('my_search'))
            console.log('> push search option in localstorage array')
            */
            this.pushLocalStorageArrayItem('my_search', this.my_search)
            console.log('> try push search object localstorage array')
            if(!this.isEmpty(this.getLocalStorageArray('global_search'))) {
                this.deleteLocalStorageArray('global_search')
            }
            this.pushLocalStorageArrayItem('global_search', filtered_obj)
            console.log('> debug: saving results', filtered_obj)
            //this.$eventBus.$emit('test', filtered_obj)
            console.log('> done!')
        },
        search_contracts: function(item) {
            console.log(item)
            return this.contracts = item
        },
        search_types: function(item) {
            console.log(item)
            return this.types = item
        },
        search_rooms: function(item) {
            console.log(item)
            return this.rooms = item
        },
        setFilteredItems: function(payload) {
            this.$store.commit('mainDataStore/setFilteredItems', payload)
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
        }
        /*
        saveSearch: function() {
            console.log('debug local storage')
            console.log(this.getLocalStorageArray('my_search'))
            //this.deleteLocalStorageArray('my_search')
            this.pushLocalStorageArrayItem('my_search', this.my_search)
            //this.pushLocalStorageArrayItem('my_search', this.my_search)
        },
        */
    }
    
}

</script>