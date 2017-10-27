import { yellow, blue, red, bold, grey, magenta, green } from 'chalk'

const levelMap = { trace: yellow, error: red, log: green, default: magenta }
const separator = ' - '

const idstamp = (ctx, msg) => ctx.state.id
  ? `${grey(bold(ctx.state.id))}${separator}${msg}`
  : timestamp(msg)

const timestamp = (msg) => `${grey(new Date().toISOString())}${separator}${msg}`
const level = (level, msg) => `${levelMap[level](level) || levelMap.default('???')}${separator}${msg}`

const error = (ctx, { time, msg }) => console.log(idstamp(ctx, level('error', msg)))
const log = (ctx, msg) => console.log(idstamp(ctx, level('log', msg)))

const trace = (ctx, key, { time, timeDiff, initDiff, msg }) => {
  const _initDiff = magenta(bold(`+${initDiff}ms`))
  const _timeDiff = blue(bold(`+${timeDiff}ms`))

  const message = `${_initDiff}${separator}${blue(key)}${_timeDiff}${separator}${msg}`

  console.log(idstamp(ctx, level('trace', message)))
}

const json = (it) => console.log(JSON.stringify(it))

export default { trace, log, error, json }
