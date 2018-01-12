import { h } from 'preact'
import render from 'preact-render-to-string'

import App from '../../app'

export default async (ctx, next) => {
  ctx.markup = render(<App isServer initialState={ctx.reduxState} />)
  return next()
}
