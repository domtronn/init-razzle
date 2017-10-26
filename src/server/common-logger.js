import { yellow, blue, red, bold, grey, pink, green } from 'chalk'

const levelMap = { trace: yellow, error: red, log: green, default: pink }
const separator = ' - '

const timestamp = (msg) => `${grey(new Date().toISOString())}${separator}${msg}`
const level = (level, msg) => `${levelMap[level](level) || levelMap.default('???')}${separator}${msg}`

const trace = (ctx, key, { time, msg }) => console.log(timestamp(level('trace', `${blue(key)}${blue(bold(`+${time - ctx.trace[key][0].time}ms`))}${separator}${msg}`)))
const error = ({ time, msg }) => console.log(timestamp(level('error', msg)))
const log = (msg) => console.log(timestamp(level('log', msg)))

const json = (it) => console.log(JSON.stringify(it))

export default { trace, log, error, json }
