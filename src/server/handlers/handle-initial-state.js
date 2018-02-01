import { createStore } from 'redux'
import { loadDate } from '../../redux/action-calendar'
import { loadReminders } from '../../redux/action-reminders'

import reducer from '../../redux/reducer'

export default async (ctx, next) => {
  const store = createStore(reducer)
  const { trace, error } = ctx

  trace('INITIAL_STATE_LOAD', 'loadStarted')
  try {
    store.dispatch(loadDate(new Date()))
    store.dispatch(loadReminders(require('../../../__data__/reminders.json')))

    ctx.reduxState = store.getState()
  } catch (e) {
    error(e)
    ctx.reduxState = {}
  }
  trace('INITIAL_STATE_LOAD', 'loadFinished')

  return next()
}
