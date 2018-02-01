import { h } from 'preact'
import render from 'preact-render-to-string'

import App from '../../app'

export default async (ctx, next) => {
  ctx.trace('RENDER', { msg: 'Begin rendering' })
  ctx.markup = render(<App isServer initialState={ctx.reduxState} />)
  ctx.trace('RENDER', { msg: 'Rendering complete' })
  return next()
}
