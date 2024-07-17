import { isEmpty } from "ramda"
import middleware from "./middleware"
//$nuxt.$eventBus.$emit('test-event', array)

export default async function(context) {
  
  const { route, store } = context
  const obj = {
    active: false,
    disable: null,
    link: null,
    name: null,
    object: null,
    pagename: null,
    title: null,
    type: null    
  }  
  const array = [{
    'active': true,
    'disable': false,
    'link': '/',    
    'name': 'root',
    'object': 'estates',
    'pagename': null,
    'title': 'Home',    
    'type': 'link'    
  }]
  const doStandardNavObj = function(_array, _active, _inactive) {
    //console.log('building nav object')
    _array.push(_active)
    if(!$nuxt.$isNull(_inactive)) {
      _array.push(_inactive)
      Object.assign(_array[0], {'active': false})
      Object.assign(_array[1], {'object': 'filtered_estates'})
    }
  }
  //console.log(route)
  //$nuxt.$eventBus.$emit('test-event', array)  
  /* @@ remove this in production @@ */
  if(store.state.auth.loggedIn) {    
    console.log('auth: is authenticated')
    if($nuxt._isMounted === true) {
      if(route.name === 'error') {
        console.log('error')
      }
      /* @@ index @@*/
      if(route.name === 'index') {
        /*@ init localStorage @*/
        if(isEmpty($nuxt.$getStorageArray('my_search'))) {
          console.log('index: search localStorage is empty')
          context.store.commit('appStore/setActiveSearch', false)
        } else {
          console.log('index: search localStorage is not empty')
          console.log('inject it to the component?')
          context.store.commit('appStore/setActiveSearch', true)
          /*
          $nuxt.$getStorageArray('my_search')
          $nuxt.$eventBus.$emit('saved-search')
          */          
        }
        /* building nav object */
        console.log('building nav object...')
        doStandardNavObj(array, $nuxt.next_disable('sub', 'Vetrina'), null)
        $nuxt.$setPagename(array, 'La nostra Vetrina')
        context.store.commit('appStore/setNavObj', array)      
        console.log('done!')
        /* fetching data */
        console.log('middleware fetch data....')
        await context.store.dispatch('mainDataStore/getEstatesMain')
        await context.store.dispatch('mainDataStore/getImagesList')
        await context.store.dispatch('mainDataStore/getZones')
        /* filter estate offers */
        console.log('set estate offers')      
        let payload = {}
        payload = $nuxt.$_filterItem('equal', store.getters['mainDataStore/getEstates'], 'special_offer', 1)
        //console.log('estate offers', payload)
        store.commit('mainDataStore/setSpecialOffers', payload)
        console.log('done!')
        /* HERE */ 
        console.log('set last inserted')     
        store.commit('mainDataStore/setLastInserted', 'data_pubblicazione')      
        console.log('set data obj')
        context.store.commit('appStore/setDataObj', 'estates')
        console.log('done!')
      } /* @@ search route @@ */
      else if(route.params.search) {
        /*@ init localStorage @*/
        if(isEmpty($nuxt.$getStorageArray('my_search'))) {
          console.log('control: search localStorage is empty!')
        } else {
          console.log('control: search localStorage is not empty!')
          console.log('>>> debug: inject it to the component?')
          /* old code 
          console.log('middleware event bus: saved-search')
          $nuxt.$eventBus.$emit('saved-search')
          context.store.commit('appStore/setSavedSearch', true)
          */
        }
        /* console.log('building search nav object') */
        console.log('building nav object...')
        doStandardNavObj(array, $nuxt.$next_active('main', 'ricerca'), $nuxt.$next_disable('sub', ' filtri:'))
        $nuxt.$setPagename(array, 'Risultato ricerca')
        //console.log('debug local storage')
        //console.log($nuxt.$getStorageArray('my_search'))
        context.store.commit('appStore/setNavObj', array)
        console.log('done!')
        /*
        console.log('set data obj')
        context.store.commit('appStore/setDataObj', 'filtered_estates')
        console.log('done!')
        */
      } /* @@ estates category list @@ */
      else if(route.params.cat) {
        /* console.log('fetching data') */
        await context.store.dispatch('mainDataStore/getEstatesMain')
        await context.store.dispatch('mainDataStore/getZones')
        let payload = {}
        await context.store.dispatch('mainDataStore/getImagesList')
        const estates = await store.getters['mainDataStore/getEstates'] 
        const images = await store.getters['mainDataStore/getImages']
        console.log('control: test extract images')
        $nuxt.$extractImages(images, estates)
        //this.extractsImages(this.getImages, this.estates)
        /*
        if($nuxt.$isEmpty(context.store.getters('mainDataStore/getImages'))) {
          console.log('middleware msg: array get images is empty')
        }
        */
        switch(route.params.cat){
          case 'search':
            //alert('search')
            if(isEmpty($nuxt.$getStorageArray('my_search'))) {
              console.log('control: search localStorage is empty!')
            } else {
              console.log('control: search localStorage is not empty!')
              //console.log($nuxt.$getStorageArray('globla_search'))
              console.log('>>> debug: middleware -> set new filtererd items...')
              let data = $nuxt.$getStorageArray('global_search')
              console.log('>>> control: middleware -> triggering setFilteredItems')
              let obj = new Object({'file': 'middleware', 'item': 'middleware guard', 'function': 'init'})
              store.commit('appStore/setSearchTrigger', obj)
              let flattenedArray = data.reduce((acc, innerArray) => acc.concat(innerArray), [])
              store.commit('mainDataStore/setFilteredItems', flattenedArray)
              console.log('done!')
            }
            /* console.log('building search nav object') */
            console.log('building nav object...')
            doStandardNavObj(array, $nuxt.$next_active('main', 'ricerca'), $nuxt.$next_disable('sub', ' filtri:'))
            $nuxt.$setPagename(array, 'Risultato ricerca')
            //console.log('debug local storage')
            //console.log($nuxt.$getStorageArray('my_search'))
            context.store.commit('appStore/setNavObj', array)
            console.log('done!')
          break
          case 'vendita':
            console.log('vendita')
            /* console.log('building nav object') */
            console.log('building nav object...')
            /* building nav object */
            doStandardNavObj(array, $nuxt.$next_active('main', route.params.cat), $nuxt.$next_disable('sub', 'Risultato'))
            $nuxt.$setPagename(array, 'Immobili in Vendita')
            store.commit('appStore/setNavObj', array)
            console.log('done!')
            /* filtering data */
            console.log('control: middleware set -> filteredItems....')
            payload = $nuxt.$_filterItem('equal', store.getters['mainDataStore/getEstates'], 'contratto', 'Vendita')
            console.log('control: done!')
            //console.log(payload)
            /* set filtered items */
            console.log('> control: middleaware setFilteredItems and tmp...')
            store.commit('mainDataStore/setFilteredItems', payload)
            let _payload = {'property': 'tmp', 'with': payload}
            store.commit('mainDataStore/setItemsState', _payload)
            /* set search data obj start */
            let _payload_ = $nuxt.createPayload('estates_search_base', payload)
            store.commit('mainDataStore/commitMainDataState', _payload_)
            console.log('control: done!')
            console.log('set data obj...')
            context.store.commit('appStore/setDataObj', 'filtered_estates')
            console.log('done!')
          break
          case 'affitto':
            //console.log('affitto')
            /* console.log('building nav object') */
            console.log('building nav object...')
            doStandardNavObj(array, $nuxt.$next_active('main', route.params.cat), $nuxt.$next_disable('sub', 'Risultato'))
            $nuxt.$setPagename(array, 'Immobili in Affitto')
            store.commit('appStore/setNavObj', array)
            console.log('done!')
            console.log('middleware filter data....')
            payload = $nuxt.$_filterItem('equal', store.getters['mainDataStore/getEstates'], 'contratto', 'Affitto')
            //console.log(payload)
            store.commit('mainDataStore/setFilteredItems', payload)
            console.log('done!')
            console.log('set data obj...')
            context.store.commit('appStore/setDataObj', 'filtered_estates')
            console.log('done!')
          break
          case 'all':
            //console.log('affitto')
            /* console.log('building nav object') */
            console.log('building nav object...')
            doStandardNavObj(array, $nuxt.$next_active('main', route.params.cat), $nuxt.$next_disable('sub', 'Risultato'))
            $nuxt.$setPagename(array, 'Tutti gli immobili')
            store.commit('appStore/setNavObj', array)
            console.log('done!')
            console.log('middleware filter data....')
            //payload = $nuxt.$_filterItem('equal', store.getters['mainDataStore/getEstates'], 'contratto', 'Affitto')
            //console.log(payload)
            store.commit('mainDataStore/setFilteredItems', store.getters['mainDataStore/getEstates'])
            console.log('done!')
            console.log('set data obj...')
            context.store.commit('appStore/setDataObj', 'filtered_estates')
            console.log('done!')
          break

          /* new sub estate routes */
          case 'appartamenti':
          case 'ville':
          case 'box':
          case 'commerciali':
          case 'terreni':
            console.log('building nav object...')
            doStandardNavObj(array, $nuxt.$next_active('main', route.params.cat), $nuxt.$next_disable('sub', 'Risultato'))
            $nuxt.$setPagename(array, 'Visualizza ' + $nuxt.$doUpCase(route.params.cat))
            store.commit('appStore/setNavObj', array)
            console.log('done!')
            //console.log('middleware handling object ....')
            //console.log('check route')
            //console.log(route.params.cat)
            //let _array = $nuxt.$arrayByType(route.params.cat)
            let _obj = context.store.getters['mainDataStore/getEstates']
            //$nuxt.$filterCollectionByArray(array)
            //console.log('done, check the log below!')
            console.log($nuxt.$filterCollectionByArray(_obj,route.params.cat))
            payload = $nuxt.$filterCollectionByArray(_obj,route.params.cat)
            //console.log(payload)
            console.log('> control: middleaware setFilteredItems')
            store.commit('mainDataStore/setFilteredItems', payload)
            //console.log('done!')
          break
          default: 
            console.log('error in route parameter')
            $nuxt.$router.push('/error')    
          break
        } 
      } /* @@ single estate details @@ */
      else if(route.params.id) {
        /* console.log('building nav object') */
        console.log('building nav object...')
        doStandardNavObj(array, $nuxt.$next_active('main', route.params.id), $nuxt.$next_disable('sub', 'Scheda immobile'))
        $nuxt.$setPagename(array, 'Carico appartamento')
        store.commit('appStore/setNavObj', array)
        console.log('done!')
        console.log('middleware: fetching data...')
        let payload = {}
        payload.id = route.params.id
        await context.store.dispatch('mainDataStore/getEstate', payload)
        /* this seems redundant.... to check..*/
        console.log('call item images...')
        await context.store.dispatch('mainDataStore/callImages', payload.id)      
        console.log('done!')
      }
    } else {
      console.log('middleware redirect')    
      let my_route = route.path
      $nuxt.$router.push('/loader')
        setTimeout(() => {
          $nuxt.$router.push(my_route)
        }, 500
      )
      //context.$foo()
    }
  } else {
    console.log('auth: no authentication')
    $nuxt.$router.push('/login/login') 
  }
}
  