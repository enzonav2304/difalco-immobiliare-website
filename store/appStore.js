import Vue from "vue"

export const state = () => ({
    data_obj: null,    
    lang: 'en',
    isMobile: false,
    nav_obj: [],
    saved_search: false,
    search_active: false,
    search_options: {},
    search_result_0: null,
    search_status: {        
        step: 0,
        data: 'filtered_estates',
        item: false
    },
    search_trigger: {
        file: null,
        item: null,
        function: null
    }
})

export const getters = {
    getActiveSearch: state => state.search_active,
    getDataObj: state => state.data_obj,
    getNavObj: state => state.nav_obj,    
    getSearchOptions: state => state.search_options,
    _getter: state => items => state[items]
}
  
export const mutations = {
    changeNavObj(state, payload) {
        console.log('mutation')
        let x =  state.nav_obj        
        let obj =  x.find(e => e.title === payload.search)        
        Object.assign(obj, {'title': payload.title, 'link': payload.link})
        console.log(obj)
        state.nav_obj = x        
    },
    setActiveSearch(state, payload) {
        state.search_active = payload        
    },
    setData(state, { storage, key, data }) {
        Vue.set(storage, key, data);
    },
    
    setDataObj(state, payload) {
        state.data_obj = payload
    },    
    setNavObj(state, payload) {
        state.nav_obj = payload
    },        
    setSearchOptions(state, payload) {
        state.search_options = payload
    },
    setSearchResult(state, payload) {
        state.search_result_0 = payload
    },
    setSearchStatus(state, payload) {
        state.search_status = payload
    },
    setSearchTrigger(state, payload) {
        console.log('>>>> debug: mutations params "' + payload.file + '" - "' + payload.item + '" - "' + payload.function + '"')
        state.search_trigger = payload
    },
    /* @@ generic commit @@ */
    commitAppState(state, { key, value }) {
        state[key] = value
    }
    /* usage 
    const payload = createPayload('search_options', newValue);
    this.$store.commit('commitSearchOption', payload);
    //this.$store.commit('commitSearchOption', { key: 'search_options', value: payload });
    */
}  
