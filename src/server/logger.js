import { grey, yellow, blue, red, magenta, green } from 'chalk'
import { DEFAULT_KEY } from 'koa-tracer'

const LEVEL_MAP = { trace: yellow, error: red, log: green, default: magenta }
const { LOG_SEPARATOR = ' - ' } = process.env

const isProduction = () => process.env.NODE_ENV === 'production'
const levelColour = (level) => LEVEL_MAP[level.toLowerCase()] || LEVEL_MAP.default

const stampId = (ctx) => grey.italic(ctx.state.id ? ctx.state.id : new Date())
const stampLevel = (level) => levelColour(level).call({}, level)

const print = (ctx, level, msg) => console.log(`${stampId(ctx)}${LOG_SEPARATOR}${stampLevel(level)}${LOG_SEPARATOR}${msg}`)

/* Logger to be used for formatting in production */
const json = (it) => console.log(JSON.stringify(it))
const log = (ctx, msg) => {
  const { req, res } = msg
  const msgString = `${req.host} ${req.method} ${req.path} ${res.status} ${res.length}${LOG_SEPARATOR}${res.responseTime}ms`

  !isProduction() ? print(ctx, 'log', msgString) : json(msg)
}

const error = ({ ctx, error: { time, msg } }) => !isProduction() && print(ctx, 'error', msg)
const trace = ({ ctx, key, trace: { time, timeDiff, initDiff, msg } }) => {
  if (isProduction()) return

  const _initDiff = magenta.bold(`+${initDiff}ms`.padStart(7))
  const _timeDiff = blue.bold(`+${timeDiff}ms`.padStart(7))

  const message = key === DEFAULT_KEY
    ? `${_initDiff}${LOG_SEPARATOR}${msg}`
    : `${_initDiff}${LOG_SEPARATOR}${blue(key)}${_timeDiff}${LOG_SEPARATOR}${msg}`

  print(ctx, 'trace', message)
}

export default { log, trace, error }
