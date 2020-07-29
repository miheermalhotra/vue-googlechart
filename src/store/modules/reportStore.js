
const data = {
  reportData: {}
}

const getters = {
  // Compute derived state based on the current state
  reportData: state => state.reportData
}

const mutations = {
  // Mutate the current state
  SET_REPORTDATA: (state, reportData) => {
    state.reportData = reportData
  }
}

const actions = {
  // Get data from server and send that to mutations to mutate the current state
  setChartData ({ commit }, payload) {
    commit('SET_REPORTDATA', payload)
  }
}

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions
}
