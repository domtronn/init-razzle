import { INIT_DATE, SET_MONTH, SET_DATE, NEXT_MONTH, PREV_MONTH } from './action-calendar'
import { LOAD_REMINDERS } from './action-reminders'

import { DateTime } from 'luxon'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case INIT_DATE: {
      const date = DateTime.local().startOf('day').toObject()
      return { ...state, date, active: date }
    }

    case SET_MONTH: {
      const date = DateTime.fromObject(Object.assign({}, state.date, { day: 1 }, payload)).toObject()
      return { ...state, date }
    }

    case SET_DATE: {
      return { ...state, active: payload.date }
    }

    case NEXT_MONTH: {
      const date = DateTime.fromObject(state.date).startOf('month').plus({ month: 1 }).toObject()
      return { ...state, date }
    }

    case PREV_MONTH: {
      const date = DateTime.fromObject(state.date).startOf('month').minus({ months: 1 }).toObject()
      return { ...state, date }
    }

    case LOAD_REMINDERS: {
      return { ...state, ...payload }
    }

    default: return state
  }
}
