import { createStore } from 'redux'
import { loadMonth } from '../../redux/action-calendar'

import reducer from '../../redux/reducer'

export default async (ctx, next) => {
  const store = createStore(reducer)
  const { trace, error } = ctx

  trace('INITIAL_STATE_LOAD', 'loadStarted')
  try {
    store.dispatch(loadMonth(8))

    ctx.reduxState = store.getState()
  } catch (e) {
    error(e)
    ctx.reduxState = {}
  }
  trace('INITIAL_STATE_LOAD', 'loadFinished')

  return next()
}
