import { INIT_ACTION } from './action-init'
import { LOAD_MONTH, NEXT_MONTH, PREV_MONTH } from './action-calendar'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case INIT_ACTION:
      return { ...payload }

    case LOAD_MONTH: {
      return { ...payload }
    }

    case NEXT_MONTH: {
      const newMonth = (state.month % 12) + 1
      return { ...payload, month: newMonth }
    }

    case PREV_MONTH: {
      const newMonth = state.month === 1 ? 12 : state.month - 1
      return { ...payload, month: newMonth }
    }

    default: return state
  }
}
