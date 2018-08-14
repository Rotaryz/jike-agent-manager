import * as TYPES from './mutation-types'

const mutations = {
  [TYPES.TYPE](state, argument) {
    state.argument = argument
  },
  [TYPES.SELEC_CUSTOM](state, custom) {
    state.customName = custom.title
    state.customCall = custom.call
  }
}

export default mutations
