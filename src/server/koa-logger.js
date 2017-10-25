export default async (ctx, next) => {
  const time = new Date()
  const { id } = ctx.state

  await next()

  const responseTime = new Date() - time
  const { length, status } = ctx.response
  const { method, path, ip: host } = ctx.request

  const res = { responseTime: +responseTime, length: +length, status: +status }
  const req = { method, path, time, host, upstream: false }

  let err = { count: 0 }
  if (ctx.errors) err = { count: ctx.errors.length, errors: ctx.errors }

  const message = process.env.NODE_ENV === 'production'
    ? JSON.stringify({ id, req, res, err })
    : `${host} ${method} ${path} ${status} ${length} - ${responseTime} ms${ctx.errors ? ['\n'].concat(ctx.errors).join('\n') : ''}`

  console.log(message)
}
