import * as TYPES from './mutation-types'

export const test = function ({commit, state}, argument) {
  commit(TYPES.TYPE, argument)
}

export const updateHomeTab = ({commit, state}, idx) => {
  commit(TYPES.HOME_TAB, idx)
}
