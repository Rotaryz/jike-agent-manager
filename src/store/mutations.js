import * as TYPES from './mutation-types'

const mutations = {
  [TYPES.TYPE](state, argument) {
    state.argument = argument
  },
  [TYPES.SELEC_CUSTOM](state, custom) {
    state.customName = custom.name
    state.customMobile = custom.mobile
    state.customAddress = custom.address
    state.customIndustry = custom.industry
    state.customId = custom.id
  },
  [TYPES.HOME_TAB](state, idx) {
    state.homeTab = idx
  }
}

export default mutations
