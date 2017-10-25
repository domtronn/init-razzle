import React from 'react'
import { renderToString } from 'react-dom/server'

import App from '../app'

export default async (ctx, next) => {
  ctx.markup = renderToString(<App isServer initialState={ctx.reduxState} />)
  return next()
}
