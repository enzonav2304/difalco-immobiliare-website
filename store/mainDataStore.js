import Vue from 'vue'
var R = require('ramda') /** import ALL ramda functions **/

export const state = () => ({
  detail_item: null,
  estates: [],
  filtered_estates: [],
  estates_search_base: [],
  images: [],
  images_estate_array : [],
  item: null,
  item_images: [],
  last_inserted: [],
  price_item: null,
  special_offers: [],
  sub_item: null,
  tmp: []
})

export const getters = {
  getEstates: state => state.estates,
  getFilteredEstates: state => state.filtered_estates,
  fixedGetter: (state) => {
    const initialValue = state.value
    return () => initialValue
  },
  getImages: state => state.images,
  _getter: state => items => state[items]
}

export const mutations = {
  /* @@ generic commit @@ */
  commitMainDataState(state, { key, value }) {
    state[key] = value
  },
  /* usage  
  const payload = createPayload('search_options', newValue);
  this.$store.commit('commitSearchOption', payload);

  /* @@ all commits @@ */
  setEstates(state, payload) {
    state.estates = payload
  },
  setEstateImgArray(state, payload) {
    //console.log(payload)
    //console.log(state.estates)    
    const filterId = x => x['id'] == payload.id    
    const t = R.pipe(
      R.filter(filterId)
    )(state.estates)
    const obj = t[0]
    //console.log(t[0])
    let h = [...t]
    h = Object.assign(t[0], {'imgs': payload.array})
    //console.log(h)
    t[0] = h
    //console.log('exit mutation')
  },
  setFilteredItems(state, payload) {
    console.log('> control: vuex mutation setFilteredItems')
    state.filtered_estates = payload
  },
  setImages(state, payload) {
    state.images = payload
  },
  setItemsState(state, payload) {
    state[payload.property] = payload.with
  },sortItemsAsc(state, payload) { 
    //console.log(payload)     
    console.log('running asc sort mutation')
    let sortKey = payload.sortKey
    //let items = state.items
    let items = state[payload.state]
    console.log('controllo state')
    //console.log(items)
    items.sort((a, b) => {
      let compare = 0
      if (a[sortKey] > b[sortKey]) {
        compare = 1
      } else if (b[sortKey] > a[sortKey]) {
        compare = -1
      }
      return compare
    })
    console.log(items)
    state.items = items
  },
  setLastInserted(state, payload) {  /* payload */    
    console.log('running desc sort mutation')
    let items = state.estates
    let sortKey = payload.sortKey
    items.sort((a, b) => {
      let compare = 0
      if (a[sortKey] < b[sortKey]) {
        compare = 1
      } else if (b[sortKey] < a[sortKey]) {
        compare = -1
      }
      return compare
    })
    items = items.slice(0, 3)      
    state.last_inserted = items
  },
  sortItemsDesc(state, payload) {  /* payload */    
    console.log('running desc sort mutation')
    let items = state[payload.state]
    let sortKey = payload.sortKey
    items.sort((a, b) => {
      let compare = 0
      if (a[sortKey] < b[sortKey]) {
        compare = 1
      } else if (b[sortKey] < a[sortKey]) {
        compare = -1
      }
      return compare
    })      
    state.items = items
  },
  setSpecialOffers(state, payload) {
    console.log('vuex mutation add to result array')
    state.special_offers = payload
  },
  setZones(state, payload) {
    state.zones = payload
  }, 
  /* new mutation */
  sortBy(state, sortOption) {
    state.oggetto.sort((a, b) => {
      switch (sortOption) {
        case 'meno cari':
          return a.prezzo - b.prezzo;
        case 'più cari':
            return b.prezzo - a.prezzo;
        case 'più recenti':
            return new Date(b.data_pubblicazione) - new Date(a.data_pubblicazione);
        case 'meno recenti':
            return new Date(a.data_pubblicazione) - new Date(b.data_pubblicazione);
        case 'più grandi':
          return b.mq - a.mq;
        case 'più piccoli':
          return a.mq - b.mq;
        case 'più stanze':
          return b.stanze - a.stanze;
        case 'meno stanze':
          return a.stanze - b.stanze;
        default:
          return 0;
      }
    })
  }
}

export const actions = {
  async getEstatesMain({commit}) {
    //console.log('running $axios store action')
    await this.$axios.get('/estates_main')
      .then((data) => {
        if(data.status === 200) {
          commit('setEstates', data.data)
        }
      }
    )
  },
  async getImagesList({commit}) {
    //console.log('running $axios store action')
    await this.$axios.get('/images_list')
      .then((data) => {
        if(data.status === 200) {
          commit('setImages', data.data)
        }
      }
    )
  },  
  async callImages({commit, dispatch}, id) {
    await this.$axios.get('/num_rows_imgs/' + id)
      .then(resp => {
        if(resp.data === 0) {
          commit('setItemsState', {'property': 'item_images', 'with': [{'id': id, 'url':'noimage'}]})
        } else {
          dispatch('getItemImages', id)
        }
      })
  },
  async getItemImages({commit}, id) {
    await this.$axios.get('/view_images/' + id)
      .then((data) => {
        if(data.status === 200) {          
          commit('setItemsState', {'property': 'item_images', 'with': data.data})
        }
      }
    )    
  },
  async getZones({commit}) {
    await this.$axios.get('/table_location')
      .then((data) => {
        if(data.status === 200) {
          commit('setZones', data.data)
        }
      }
    )
  },
  async postData({commit, dispatch}, payload) {
    //console.log('> payload', payload)
    console.log('> action send mail, payload ', payload)
    await this.$axios.post('/send_email', payload)
    /*await this.$axios.post(
      'https://www.difalcoimmobiliare.it/api/index.php/email_controller/send',
      payload
    )*/
      .then(response => {
        let message = response.data.message
        if(message === 'success') {
          console.log('successfully sent email')
        }
      })
      .catch(errors => {
        console.log(errors)
      })   
  },

  async getEstate({commit}, payload) {

    let api_main_table = '/view_estate_main/' + payload.id
    let api_sub_table = '/view_estate_sub/' + payload.id
    let api_price_table = '/estate_price/' + payload.id
    let api_detail_table = '/view_estate_detail/' + payload.id

    const request_main_table = this.$axios.get(api_main_table)
    const request_sub_table = this.$axios.get(api_sub_table)
    const request_price_table = this.$axios.get(api_price_table)
    const request_detail_table = this.$axios.get(api_detail_table)

    await request_main_table
      .then(response => {
        const data = response.data
        commit('setItemsState', {'property': 'item', 'with': data})
      })
      .catch(errors => {
        console.log(errors)
      })
    await request_sub_table
      .then(response => {
        const data = response.data
        commit('setItemsState', {'property': 'sub_item', 'with': data})          
      })
      .catch(errors => {
        console.log(errors)
      })
    await request_price_table
      .then(response => {
        const data = response.data
          commit('setItemsState', {'property': 'price_item', 'with': data})          
      })
      .catch(errors => {
        console.log(errors)
      })
    await request_detail_table
      .then(response => {
          const data = response.data
          commit('setItemsState', {'property': 'detail_item', 'with': data})          
      })
      .catch(errors => {
        console.log(errors)
      })    
  },
  /*
  storeItemAll({dispatch, commit}, payload) {
      //commit('mutate', funcs.mutObj('status', 'fetching'))
      let api_main_table = url + '/view_estate_main/' + payload.id
      let api_sub_table = url + '/view_estate_sub/' + payload.id
      let api_price_table = url + '/estate_price/' + payload.id
      let api_detail_table = url + '/view_estate_detail/' + payload.id
      //let api_detail_table_rel = url + '/view_estate_detail_rel/' + payload.id

      const request_main_table = http.get(api_main_table)
      const request_sub_table = http.get(api_sub_table)
      const request_price_table = http.get(api_price_table)
      const request_detail_table = http.get(api_detail_table)
      
      Axios.
        all([
          request_main_table,
          request_sub_table,
          request_price_table,
          request_detail_table            
        ])
        .then(
          Axios.spread((...data) => {
            commit('_setItemsState', funcs.mutObj('item', data[0]))
            commit('_setItemsState', funcs.mutObj('sub_item', data[1]))
            commit('_setItemsState', funcs.mutObj('prices', data[2]))
            commit('_setItemsState', funcs.mutObj('detail_item', data[3]))
            //commit('mutate', funcs.mutObj('loaded_item', true))
            //commit('mutate', funcs.mutObj('loaded_sub_item', true))
            //commit('mutate', funcs.mutObj('loaded_detail_item', true))
          })
        ).catch(errors => {
          console.log(errors)
        })
      //commit('mutate', funcs.mutObj('status', 'idle'))
    },
  */
}



