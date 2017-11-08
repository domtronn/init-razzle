import Koa from 'koa'

/* Koa libraries */
import serve from 'koa-static'
import Router from 'koa-router'
import helmet from 'koa-helmet'
import cookie from 'koa-cookie'
import timeout from 'koa-timeout-v2'
import compose from 'koa-compose'
import requestId from 'koa-requestid'

/* Middlewares */
import template from './server/handle-template'
import assets from './server/handle-assets'
import markup from './server/handle-markup'
import state from './server/handle-initial-state'
import error from './server/handle-error'
import stop from './server/handle-timeout'

import logger, { eventAccess } from 'koa-logger'
import tracer, { eventTrace, eventError } from 'koa-tracer'
import Logger from './server/logger'

import { render } from 'ejs'

const app = new Koa()
const router = new Router()

router.get(['/status', '/metrics', '/favicon.ico'], ctx => (ctx.body = `Everything's fine`))

router.use(tracer())
router.use(logger([ 'id', 'errorsCount', 'errors', 'trace' ]))

router.get('/timeout', stop)
router.get('/timeout', ctx => new Promise(resolve => setTimeout(resolve, 3000)))

router.get('/*', template, assets, state, markup)
router.get('/*', ctx => {
  ctx.trace('RENDER', { msg: 'Begin Rendering' })
  const result = render(ctx.template, { ...ctx, process })
  ctx.trace('RENDER', { msg: 'Render Complete', size: result.length })

  ctx.body = render(result)
})

app.use(compose([error(), serve(process.env.RAZZLE_PUBLIC_DIR), helmet(), cookie(), requestId(), timeout(3000)]))

app.on(eventAccess, Logger.log)
app.on(eventTrace, Logger.trace)
app.on(eventError, Logger.error)

app.use(compose([router.routes(), router.allowedMethods()]))

export default app.callback()
