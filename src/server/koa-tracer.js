import { bold } from 'chalk'
import logger from './common-logger'

const isProduction = process.env.NODE_ENV === 'production'

const path = (path, obj) => path.reduce((acc, it) => acc && acc[it], obj)
const toMessage = (obj) => {
  if (isProduction) return typeof obj === 'object' ? obj : { msg: obj }

  return typeof obj === 'object'
    ? { msg: Object.entries(obj).filter(([a, b]) => !!b).map(([ key, val ]) => `${bold(key)}:${val}`).join(' - ') }
    : { msg: obj }
}

export const trace = (ctx, key, trace) => {
  const result = {
    time: new Date(),
    timeDiff: new Date() - (path([ 'state', 'trace', key, 0, 'time' ], ctx) || new Date()),
    initDiff: new Date() - (ctx.state.traceStart || new Date()),
    ...toMessage(trace)
  }

  ctx.state.trace = { [key]: [], ...ctx.state.trace }
  ctx.state.trace[key] = ctx.state.trace[key].concat(result)

  !isProduction && logger.trace(ctx, key, result)
}

export const traceError = (ctx, err) => {
  const result = { time: new Date(), ...toMessage(err) }

  ctx.state.errors = [ ...ctx.state.errors || [], result ]
  ctx.state.errorsCount = ctx.state.errors.length

  !isProduction && logger.error(result)
}

export default () => async (ctx, next) => {
  ctx.state = { ...ctx.state, trace: {}, traceStart: new Date() }
  ctx.state = { ...ctx.state, errors: [], errorsCount: 0 }

  ctx.trace = trace.bind({}, ctx)
  ctx.error = traceError.bind({}, ctx)

  await next()
}
