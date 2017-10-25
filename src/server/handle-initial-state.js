import { createStore } from 'redux'
import { initAction } from '../redux/action-init'
import reducer from '../redux/reducer'

export default async (ctx, next) => {
  const store = createStore(reducer)

  try {
    store.dispatch(initAction())

    ctx.reduxState = store.getState()
  } catch (e) { }

  await new Promise(resolve => setTimeout(resolve, 10))

  return next()
}
