import Koa from 'koa'

import Router from 'koa-router'
import helmet from 'koa-helmet'
import cookie from 'koa-cookie'
import requestId from 'koa-requestid'

/* Middlewares */
import template from './server/handle-template'
import assets from './server/handle-assets'
import markup from './server/handle-markup'
import state from './server/handle-initial-state'

import logger from './server/koa-logger'
import tracer from './server/koa-tracer'

import { render } from 'ejs'

const app = new Koa()
const router = new Router()

app.use(helmet())
app.use(cookie())
app.use(requestId())

router.get(['/status', '/metrics'], ctx => (ctx.body = `Everything's fine`))

router.use(logger([ 'errors', 'trace' ]))
router.use(tracer())

router.get('/*', template, assets, state, markup)
router.get('/*', ctx => (ctx.body = render(ctx.template, { ...ctx, process })))

app.use(router.routes())
app.use(router.allowedMethods())

export default app.callback()
