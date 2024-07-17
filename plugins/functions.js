import { call, toUpper } from 'ramda';
import Vue from 'vue'
import { mapGetters } from 'vuex'
import da from '~/static/vendor/flatpickr/dist/esm/l10n/da';
import fi from '~/static/vendor/flatpickr/dist/esm/l10n/fi';

Vue.mixin({
    methods: {
        
        main: function() {

            console.log('control: main function: init -> main function')

            /* @@ init getters @@ */

            let appGetter =  this.$store.getters['appStore/_getter']
            let dataGetter =  this.$store.getters['mainDataStore/_getter']

            let data_obj = appGetter('data_obj')
            let saved_search = appGetter('saved_search')
            let search_active = appGetter('search_active')            
            let search_result_0 = appGetter('search_result_0')
            let search_options = appGetter('search_options')
            let search_status = appGetter('search_status')
            let search_trigger = appGetter('search_trigger')
            

            let estates = dataGetter('estates')
            let filtered_estates = dataGetter('filtered_estates')
            let search_base = dataGetter('estates_search_base')
            let tmp = dataGetter('tmp')

            /* new global vars */

            let getArray = ''
            let temp = []            

            let _debugArray = (_array, msg, deep) => {
                _print_msg('debug array -> ' + msg)
                if(deep) {
                    if(_lengthObj(_array) === 0) {
                        _print_msg('array lenght = 0')
                        _print_msg('lenght: ' + _lengthObj(_array))
                    } else {
                        _print_msg('array lenght > 0')
                        _print_msg('lenght: ' + _lengthObj(_array))
                    }
                }                
                //console.log('test_ 2: debug obj' , this.isEmpty(normal))
                if(_isEmpty(_array)) {
                    console.log('test_:  ' + msg + ' is empty? -> ', _isEmpty(_array))
                } else {
                    console.log('test_: ' + msg + ' is empty? -> ', _isEmpty(_array))
                    console.log('test_: array ' + msg + ' -> ', _array) 
                }
            }             
            let _deleteArray = (key) => {
                return this.deleteArray(key)
            }
            let _flatArray = (array) => {
                return this.flatArray(array)
            }
            let _getArray = (key) => {
                return this.getArray(key)
            }
            let _getDataObj = (obj) => {
                let data
                if(obj) {
                    data = filtered_estates
                    _print_msg('data object = filtered_estates')
                } else {
                    _print_msg('data object = estates')
                    data = estates
                }                
                return data                
            }                       
            let _getDataObjLegacy = () => {
                if(search_active) {
                    return filtered_estates
                } else return estates
            }
            let _getResult= () => {
                if(search_active) {
                    if(!search_result_0) {
                      return true
                    }      
                } else {
                    return false
                }
            }
            let _getVars = () => { 
                _print_msg('into getEnv')               
                console.log('env: debug env data_obj', data_obj)
                console.log('env: debug env saved_search', saved_search)
                console.log('env: debug env search_active', search_active)
                console.log('env: debug env search_result_0', search_result_0)
                console.log('env: debug env search_options', search_options)
                console.log('env: debug env search_trigger', search_trigger)
                console.log('env: debug env filterd_estates', this.lengthObj(filtered_estates))
                //return false
            }
            let _isEmpty = (object) => {
                return this.isEmpty(object)
            }
            let _lengthObj = (obj) => {
                return this.lengthObj(obj)
            }
            let _makeFilter = (action, data, key, value) => {
                let x                
                _print_msg('debug makeFilter -> key: ' + key)
                _print_msg('debug makeFilter -> value: ' + value)                
                if(Array.isArray(value)) {
                    //console.log('test_: items è un array:', value)
                    x = this.filterItem(action, data, key , [...value].pop())
                } else {
                    //console.log('test_: items non è un array:', value)
                    x = this.filterItem(action, data, key , value)
                } 
                console.log('test_: debug makeFilter -> result', this.lengthObj(x))
                return x
            }
            let _notExistentItem = (_array, _item) => {
                // Verifica se l'elemento 'tipo' esiste in _array
                const index = _array.indexOf(_item)              
                if (index !== -1) {
                  _print_msg('Rimuovo elemento ' + _item)
                  _array.splice(index, 1)
                  //_debugArray(_array, 'array modificato')
                  return _array
                } else {
                    _print_msg('nessuna ricorrenza dell elemento ' + _item)
                    return false
                }
            }
            let _pushArrayItem = (key, array) => {
                return this.pushArrayItem(key, array)
            }
            let _print_msg = (msg) => {
                console.log('test_: print_msg -> ', msg)
            }            
            let _setActiveSearch = () => {
                if(search_active) {
                    return true
                } else {
                    return this.$store.commit('appStore/setActiveSearch', true)
                }
            }

            /* @@ unused functions @@ */

            let _getLocalStorageArray = (name) => {
                return this.getLocalStorageArray(name)
            }
            let _debugObject = (_object, msg, deep) => {
                _print_msg('debug object -> ' + msg)
              
                if (deep) {
                    const keys = Object.keys(_object)
                    if (keys.length === 0) {
                        _print_msg('object is empty')
                    } else {
                        _print_msg('object has properties')
                        _print_msg('Number of properties: ' + keys.length)
                    }
                }
              
                if (_isEmpty(_object)) {
                    console.log('test_: ' + msg + ' is empty? -> ', _isEmpty(_object))
                } else {
                    console.log('test_: ' + msg + ' is empty? -> ', _isEmpty(_object))
                    console.log('test_: object ' + msg + ' -> ', _object)
                }
            }
            let _globalFilter = (array, filter) => {
                return this.returnSearchObj(array, filter)
            }
            let innerFunction = () => { 
                console.log('control: main function: test inner funcion ')
                return
            }
            let _mySequence = (_array) => {
                // Verifica la sequenza
                let _correct = JSON.stringify(_array) === JSON.stringify(_ordered_array)
                if (_correct) {
                    return true                    
                } else {
                    return false
                }
            }
            let _returnRouteParam = () => {
                return this.$route.params.cat
            }
            let _searchStorage = () => {
                return [...this.getLocalStorageArray('my_search')].pop()
            } 
            let _isEmptyType = (_array, _item) => {
                return _array.some(item => item === _item)
            }
            let _isEmptyTemp = (_array) => {
                if(_isEmpty(_array)) {
                    return true
                }
                else {
                    _debugArray(_flatArray(_array), 'debug temp', true) 
                    return false
                }
            }      
            /* @@ end of unused functions @@ */

            return {
                print_msg(msg) {
                    //innerFunction()
                    //_getVars()
                    return _print_msg(msg)
                },
                debugArray(_array, msg) {
                    return _debugArray(_array, msg)
                },
                doSomething(key, value, active_filters) {

                    _print_msg('into doSomething')

                    /* init local global vars */
                    let action, item, callback
                    let _result //is in test
                    let data = null
                    let x = active_filters[0]
                    let y = active_filters[1]
                    
                    getArray = _flatArray(_getArray(key))
                                        
                    switch(key) {
                        case 'tipo':
                            action = 'equal'
                            item = 'tipo_immobile'
                            callback = _makeFilter                            
                        break
                        case 'stanze':
                            action = 'greater'
                            item = 'stanze'
                            callback = _makeFilter
                        break
                        case 'citta':
                            action = 'equal'
                            item = 'citta' 
                            data = search_base
                            callback = _makeFilter
                        break
                        case 'prezzo':                            
                            action = 'p_between'
                            item = 'prezzo' 
                            data = estates
                            callback = _makeFilter// = (data, item, value)
                            //callback = _makeFilter// = (data, item, value)
                        break
                        case 'superfice':
                            action = 'mq_between'
                            item = 'mq' 
                            data = estates
                            callback = _makeFilter// = (data, item, value)
                        break
                    }

                    switch(_lengthObj(active_filters)) {                        
                        case 1:
                            _print_msg('case 1')
                            _print_msg()
                            data = filtered_estates
                            _result = callback(action, data, item, value)                            
                            //_print_msg('json: ' + JSON.stringify(_result))
                        break
                        case 2:
                            _print_msg('case 2')                            
                            if(!_isEmpty(_getArray(key))) {
                                _print_msg('tipo esiste, cosa faccio?')                                
                                _print_msg('prendo temp, e faccio push del risultato, con base dati -1')
                                data = filtered_estates
                                _result = _makeFilter(action, data, item, value)
                                temp.push(_result)
                            } else {
                                _print_msg('tipo non esiste, cosa faccio?')                                
                                _print_msg('inizializzo temp...')
                                temp = []
                                data = filtered_estates
                                _result = _makeFilter(action, data, item, value)
                                _print_msg('esguo puh in temp vuoto...')
                                temp.push(_result)
                            }                            
                        break
                    }                   
                    
                    temp = _flatArray(temp)
                    _debugArray(temp, 'debug temp')

                    if(!_isEmpty(temp)) {
                        _result = temp
                    }

                    if(!_isEmpty(getArray)) {
                        _print_msg('session array exists!')
                        _print_msg('delete session array and push new result')
                        _deleteArray(key)
                        _debugArray(_result, 'RESULT')
                        _pushArrayItem(key, _result)
                    } else {
                        _print_msg('session array not exists!')
                        _print_msg('push new result')
                        _debugArray(_result, 'RESULT')
                        _pushArrayItem(key, _result)
                    }
                },                
                setActiveFilters(array, new_value) {
                    return _setActiveFilters(array, new_value)
                },
                setActiveSearch() {
                    return _setActiveSearch
                },                

                /* @@ export utils @@ */

                getEnv() {
                    return _getVars
                },
                getDataObj() {
                   return _getDataObj             
                },
                getDataObjLegacy() {
                    return _getDataObjLegacy            
                },
                getResult() {
                    return _getResult
                },
                notExistentItem(_array, _item) {
                    return _notExistentItem(_array, _item)
                }                
            }
        },

        arrayType: function (val) {            
            let array = []
            let appartamenti = ['0', '1']
            let ville = ['4', '7', '10', '11']
            let box = ['2', '5']
            let commerciali = ['3', '6']
            let terreni = ['8', '9']
            switch(val) {
                case 'appartamenti':
                    array = appartamenti
                break
                case 'ville':
                    array = ville
                break
                case 'box':
                    array = box
                break
                case 'commerciali':
                    array = commerciali
                case 'terreni':
                    array = terreni
                break
            }
            return array
        },
        build_img_array: function(id) {
            //alert('test ' + id)
            console.log('store estate img array...')
            try{
                let estate = this.filterItem('equal', this.estates, 'id', id)
                this.$store.commit('mainDataStore/setItemsState', {'property': 'images_estate_array', 'with': estate[0]['imgs']})
                //console.log('filtered estate', estate[0]['imgs'])
                console.log('done!')
            } catch(e) {
                console.log('sob')                
            }
            
        },
        convertCurrency: function(price) {
            let euro = Intl.NumberFormat('en-IT', {
                style: 'currency',
                currency: 'EUR',
            })
            return euro.format(price)
        },
        createPayload: function(key, value) {
            return { 
                key,
                value
            }
        },          
        extractsImages: function(x, y) {//x = this.getImages , y = this.getEstate            
            /* group by id array of images */
            console.log('extracting images for estate items...')
            const groupBy = this.groupIds(x, 'id_immobile')            
            for(let i = 0; i < y.length; i++) {
                let payload = {}
                let id = y[i].id
                payload.id = id
                const arrayObjs = this.returnObj(groupBy, id)
                if(arrayObjs == undefined) {                    
                    payload.array = ['noimage']
                    this.$store.commit('mainDataStore/setEstateImgArray', payload)
                } else {                    
                    const extracted = this.arrayValue('url', arrayObjs)                    
                    payload.array = extracted
                    this.$store.commit('mainDataStore/setEstateImgArray', payload)                    
                }
            }
            console.log('done!')
        },
        forceArrayFlat: function(array) {
            const merged = [].concat(...array)
            return merged
        },
        getMatchedIds: function (array, key) {
            console.log('function return Objs with same id')
            const objsByHeader = {}
            for (const obj of array) {
                objsByHeader[obj[key]] ??= [];
                objsByHeader[obj[key]].push(obj)
            }
            return Object.values(objsByHeader)
                .filter(subarr => subarr.length >= 2)
                .flat()
        },
        removeDuplicates: function (myArr, prop) {
            console.log('test_: remove objs with same id')
            return myArr.filter((obj, pos, arr) => {
                return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
            })
        },
        returnObj: function(obj, x) { // obj = groupIds()            
            return obj[x]            
        },
        searchObj: function(obj, query) {
            for (let key in obj) {
                let value = obj[key]
                if (value === query) {
                    console.log('property=' + key + ' value=' + value);
                }        
            }        
        },

        /* @@ helpers obj @@*/

        arrStringsToNumbrs: function(arr) {
            arr.map((str) => {
                // using map() to convert array of strings to numbers
                return parseInt(str)
            })         
        }, 
        mutObj: function(prop, _value, _key) {
            return {
                property: prop,
                value: _value,
                key: _key
            }
        },
        f_map: function(a, f) {
            let b = Array()
            for (var j = 0; j < a.length; j++) {
                b[j] = f(a[j])
            }
            return b[j]
        },
        detectViewport: function() {            
            const viewportWidth = window.innerWidth
            let payload            
            const mobileBreakpoint = 768
            if(viewportWidth < mobileBreakpoint) {                
                console.log('window: viewport is mobile')
                payload = this.createPayload('isMobile', true);
                this.$store.commit('appStore/commitAppState', payload)
                //return true
            } else {                
                console.log('window: viewport is desktop')
                payload = this.createPayload('isMobile', false);
                this.$store.commit('appStore/commitAppState', payload)
                //return false
            }
        }
    }
})

export default (context, inject) => {

    /* @@ export for middleware @@ */

    inject('cap', (x) => {
        const y = x.charAt(0).toUpperCase() + x.slice(1)
        return y
    }),
    inject('createPayload', (x, y) => {
        return {x, y}
    }),
    inject('doUpCase', (y) => {
        const x = y.charAt(0).toUpperCase() + y.slice(1)
        return x
    })
    inject('extractImages', (x, y) => {
        console.log('control: ', $nuxt)
        return $nuxt.extractsImages(x, y)
    }),
    inject('next_active', (name, title) => {
        const y = title.charAt(0).toUpperCase() + title.slice(1)
        let x = {
            'active': true,
            'disable': false,
            'name': name,
            'title': y,
            'link': '/estates/' + title,
            'type': 'link',            
            'pagename': 'default title',            
            'last_item': false
        }
        return x
    }),
    inject('next_disable', (name, title) => {
        let x = {
            'active': false,
            'disable': true,
            'name': name,
            'title': title,
            'link': null,
            'type': 'text',            
            'last_item': true
        }
        return x
    }),
    inject('search_key', (title) => {
        let x = {
            'name': 'search',
            'title': title,
            'link': null,
            'type': 'text',
            'active': false,
            'disable': false,
            'last_item': false
        }
        return x
    }),
    inject('setPagename', (obj, pagename) => {
        let record = obj.find(element => element.active === true)
        console.log('find obj')
        console.log(record)
        console.log('assign title')        
        Object.assign(record, {'pagename': pagename})
    })    
}