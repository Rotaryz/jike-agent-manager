import * as TYPES from './mutation-types'

const mutations = {
  [TYPES.TYPE](state, argument) {
    state.argument = argument
  },
  [TYPES.SELEC_CUSTOM](state, custom) {
    state.custom = custom // name,mobile,address,industry,id
  },
  [TYPES.HOME_TAB](state, idx) {
    state.homeTab = idx
  }
}

export default mutations
