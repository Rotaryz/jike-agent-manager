import * as TYPES from './mutation-types'

const mutations = {
  [TYPES.TYPE](state, argument) {
    state.argument = argument
  },
  [TYPES.SELEC_CUSTOM](state, custom) {
    state.customName = custom.name
    state.customMobile = custom.mobile
  },
  [TYPES.HOME_TAB](state, idx) {
    state.homeTab = idx
  }
}

export default mutations
