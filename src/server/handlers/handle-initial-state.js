import { createStore } from 'redux'
import { initAction } from '../../redux/action-init'
import reducer from '../../redux/reducer'

export default async (ctx, next) => {
  const store = createStore(reducer)
  const { trace, error } = ctx

  trace('INITIAL_STATE_LOAD', 'loadStarted')
  try {
    store.dispatch(initAction())
    ctx.reduxState = store.getState()
  } catch (e) {
    error(e)
    ctx.reduxState = {}
  }
  trace('INITIAL_STATE_LOAD', 'loadFinished')

  return next()
}
