import logger from './common-logger'

export default (additionalKeys = []) => async (ctx, next) => {
  const time = new Date()
  const { id } = ctx.state

  await next()

  const responseTime = new Date() - time
  const { length, status } = ctx.response
  const { method, path, ip: host } = ctx.request

  const res = { responseTime: +responseTime, length: +length, status: +status, time: new Date() }
  const req = { method, path, time, host, upstream: false }

  const extras = additionalKeys.reduce((acc, key) => ctx[key] ? { ...acc, [key]: ctx[key] } : acc, {})

  process.env.NODE_ENV === 'production'
    ? logger.json({ id, req, res, ...extras })
    : logger.log(`${host} ${method} ${path} ${status} ${length} - ${responseTime}ms`)
}
