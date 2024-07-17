
export const state = () => ({
  anno: [],
  arredamento: [],
  classe_energetica: [],
  condizioni: [],
  contratti: [],
  riscaldamento: [],
  stato: [],
  tipo: [],
  zone: []
})

export const mutations = {
  setTable(state, payload) {
    state[payload.property] = payload.property
  }
}

export const actions = {
  async storeSubItemTables ({ commit, dispatch }) {

    let api_contratti = 'table_contracts'
    let api_stato = '/table_status'
    let api_tipo = '/table_typology'
    let api_zone = '/table_location'

    const request_contratti = await this.$axios.get(api_contratti)
    const request_stato = await this.$axios.get(api_stato)
    const request_tipo = await this.$axios.get(api_tipo)
    const request_location = await this.$axios.get(api_zone)

    this.$axios.
        all([
        request_contratti,
        request_stato,
        request_tipo,
        request_location
      ])
      .then(
        //console.log('fetch correctly executed')
        spread((...data) => {
          commit('setTable', {'property': 'contratti', 'with': data[0]})
          commit('setTable', {'property': 'stato', 'with': data[1]})
          commit('setTable', {'property': 'tipo', 'with': data[2]})
          commit('setTable', {'property': 'zone', 'with': data[3]})          
          //commit('mutate', funcs.mutObj('loaded_sub_tbl', true))
        })).catch(errors => {
          dispatch('setErrors', { errors })
          console.log(errors.stack)
          //dispatch('setActiveTablesError')
          //funcs.sendErrorNotification()
        })      
  }

}
  



  