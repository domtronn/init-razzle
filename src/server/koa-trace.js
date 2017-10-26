import { yellow, blue, red, bold, grey } from 'chalk'
const isProduction = process.env.NODE_ENV === 'production'

const logTrace = (ctx, key, { time, msg }) => console.log(`${grey(time.toISOString())} ${yellow('trace')} - ${blue(key)} - +${time - ctx.trace[key][0].time}ms ${msg}`)
const logError = ({ time, msg }) => console.log(`${grey(time.toISOString())} ${red('error')} - ${msg}`)

const toMessage = (obj) => {
  if (isProduction) return typeof obj === 'object' ? obj : { msg: obj }

  return typeof obj === 'object'
    ? { msg: Object.entries(obj).map(([ key, val ]) => `${bold(key)}:${val}`).join(' - ') }
    : { msg: obj }
}

export const trace = (ctx, key, trace) => {
  const result = { time: new Date(), ...toMessage(trace) }

  ctx.trace = { [key]: [], ...ctx.trace }
  ctx.trace[key] = ctx.trace[key].concat(result)

  !isProduction && logTrace(ctx, key, result)
}

export const traceError = (ctx, err) => {
  const result = { time: new Date(), ...toMessage(err) }

  ctx.errors = [ ...ctx.errors || [], result ]

  !isProduction && logError(result)
}

export default () => async (ctx, next) => {
  ctx = { ...ctx, trace: {}, errors: [] }
  await next()
  ctx.errors = { count: ctx.errors.length, errors: ctx.errors }
}
