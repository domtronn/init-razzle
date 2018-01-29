import Koa from 'koa'

/* Koa libraries */
import timeout from './server/koa/timeout'

import serve from 'koa-static'
import Router from 'koa-router'
import helmet from 'koa-helmet'
import cookie from 'koa-cookie'
import compose from 'koa-compose'
import requestId from 'koa-requestid'

/* Middlewares */
import template from './server/handlers/handle-template'
import assets from './server/handlers/handle-assets'
import markup from './server/handlers/handle-markup'
import state from './server/handlers/handle-initial-state'
import error from './server/handlers/handle-error'

import Logger from './server/koa/logger'
import logger, { eventAccess } from 'koa-logger'
import tracer, { eventTrace, eventError } from 'koa-tracer'

const app = new Koa()
const router = new Router()

router.get(['/status', '/favicon.ico'], ctx => (ctx.body = `Everything's fine`))

router.use(tracer())
router.use(logger([ 'id', 'errorsCount', 'errors', 'trace' ]))

router.get('/timeout')
router.get('/timeout', ctx => new Promise(resolve => setTimeout(resolve, 3000)))

router.get('/*', template, assets, state, markup)
router.get('/*', ctx => {
  ctx.trace('RENDER', { msg: 'Begin Rendering' })
  ctx.body = ctx.render({ ...ctx, process })
  ctx.trace('RENDER', { msg: 'Render Complete' })
})

app.use(serve(process.env.RAZZLE_PUBLIC_DIR))
app.use(compose([error(), timeout(1000), helmet(), cookie(), requestId()]))

app.on(eventAccess, Logger.log)
app.on(eventTrace, Logger.trace)
app.on(eventError, Logger.error)

app.use(compose([router.routes(), router.allowedMethods()]))

export default app.callback()
