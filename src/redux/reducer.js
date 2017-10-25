import { INIT_ACTION } from './action-init'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case INIT_ACTION: {
      return { ...payload }
    }

    default: return state
  }
}
