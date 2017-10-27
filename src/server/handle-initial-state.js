import { createStore } from 'redux'
import { initAction } from '../redux/action-init'
import reducer from '../redux/reducer'

import { trace } from './koa-tracer'

export default async (ctx, next) => {
  const store = createStore(reducer)

  trace(ctx, 'INITIAL_STATE_LOAD', 'loadStarted')
  try {
    store.dispatch(initAction())

    ctx.reduxState = store.getState()
  } catch (e) { }

  await new Promise(resolve => setTimeout(resolve, 10))
  trace(ctx, 'INITIAL_STATE_LOAD', 'loadFinished')

  return next()
}
